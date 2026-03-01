import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const PROJECT_ROOT = process.cwd();
const STATE_PATH = path.join(PROJECT_ROOT, '.cursor', 'hooks', 'tasks-md-state.json');

function defaultState() {
  return {
    taskContext: {
      referenced: false,
      taskIds: [],
    },
    edits: {
      seq: 0,
      tasksMdTouched: false,
    },
    verification: {
      testsPassedAtSeq: null,
      visualReviewConfirmedAtSeq: null,
      lastTestCommandSummary: null,
    },
  };
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function loadState() {
  try {
    const raw = fs.readFileSync(STATE_PATH, 'utf8');
    const parsed = safeJsonParse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch {
    // ignore
  }
  return defaultState();
}

function saveState(state) {
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n');
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function extractTaskIds(text) {
  // Matches e.g. "4.1", "10.2". Avoid matching versions like "v1.2.3" by requiring word boundaries.
  const matches = text.match(/\b\d+\.\d+\b/g) ?? [];
  return uniq(matches);
}

function promptMentionsTasksMd(prompt, attachments = []) {
  const p = (prompt ?? '').toLowerCase();
  if (p.includes('tasks.md')) return true;
  for (const a of attachments ?? []) {
    const fp = (a?.filePath ?? a?.filepath ?? '').toString();
    if (fp.endsWith('/tasks.md')) return true;
  }
  return false;
}

function looksLikeTestCommand(command) {
  const c = (command ?? '').toLowerCase();
  return (
    c.includes('npm run test') ||
    c.includes('vitest') ||
    c.includes('playwright test') ||
    c.includes('npm run test:e2e') ||
    c.includes('pnpm test') ||
    c.includes('pnpm run test') ||
    c.includes('yarn test')
  );
}

function summarizeTestCommand(command) {
  const c = (command ?? '').trim().replace(/\s+/g, ' ');
  if (!c) return null;
  if (c.length <= 160) return c;
  return `${c.slice(0, 157)}...`;
}

function gitDiffHasTasksMdChanges() {
  const res = spawnSync('git', ['diff', '--name-only'], {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
  });
  const out = (res.stdout ?? '').split('\n').map((s) => s.trim());
  return out.includes('tasks.md');
}

function shouldRequireTasksMdUpdate(state) {
  return state?.taskContext?.referenced === true;
}

function verificationSatisfied(state) {
  const seq = state?.edits?.seq ?? 0;
  const testsOk =
    typeof state?.verification?.testsPassedAtSeq === 'number' &&
    state.verification.testsPassedAtSeq === seq;
  const visualOk =
    typeof state?.verification?.visualReviewConfirmedAtSeq === 'number' &&
    state.verification.visualReviewConfirmedAtSeq === seq;
  return { ok: testsOk || visualOk, testsOk, visualOk };
}

function tasksMdUpdated(state) {
  return state?.edits?.tasksMdTouched === true || gitDiffHasTasksMdChanges();
}

function outputJson(obj) {
  process.stdout.write(JSON.stringify(obj ?? {}) + '\n');
}

function main() {
  const eventName = process.argv[2] ?? '';
  const inputText = readStdin();
  const input = safeJsonParse(inputText) ?? {};

  const state = loadState();

  if (eventName === 'sessionStart') {
    // Reset per-session state.
    saveState(defaultState());
    return outputJson({});
  }

  if (eventName === 'beforeSubmitPrompt') {
    const prompt = input?.prompt ?? '';
    const attachments = input?.attachments ?? [];

    const referenced = promptMentionsTasksMd(prompt, attachments) || extractTaskIds(prompt).length > 0;
    if (referenced) {
      state.taskContext.referenced = true;
      state.taskContext.taskIds = uniq([...state.taskContext.taskIds, ...extractTaskIds(prompt)]);
      saveState(state);
    }
    return outputJson({ continue: true });
  }

  if (eventName === 'afterAgentResponse') {
    const text = (input?.text ?? '').toString();
    if (/visual review\s*:\s*confirmed/i.test(text) || /\bvisual review confirmed\b/i.test(text)) {
      state.verification.visualReviewConfirmedAtSeq = state.edits.seq;
      saveState(state);
    }
    return outputJson({});
  }

  if (eventName === 'afterFileEdit') {
    const filePath = (input?.file_path ?? input?.filePath ?? '').toString();
    state.edits.seq += 1;

    if (filePath.endsWith('/tasks.md')) {
      state.edits.tasksMdTouched = true;
    }

    saveState(state);
    return outputJson({});
  }

  if (eventName === 'postToolUse') {
    const toolInput = safeJsonParse(input?.tool_input ?? '') ?? input?.tool_input ?? {};
    const command = toolInput?.command ?? '';

    if (looksLikeTestCommand(command)) {
      state.verification.testsPassedAtSeq = state.edits.seq;
      state.verification.lastTestCommandSummary = summarizeTestCommand(command);
      saveState(state);
    }
    return outputJson({});
  }

  if (eventName === 'postToolUseFailure') {
    // If a test command fails, ensure testsPassedAtSeq is cleared.
    const toolInput = safeJsonParse(input?.tool_input ?? '') ?? input?.tool_input ?? {};
    const command = toolInput?.command ?? '';

    if (looksLikeTestCommand(command)) {
      state.verification.testsPassedAtSeq = null;
      state.verification.lastTestCommandSummary = summarizeTestCommand(command);
      saveState(state);
    }
    return outputJson({});
  }

  if (eventName === 'stop') {
    const { ok, testsOk, visualOk } = verificationSatisfied(state);

    if (!shouldRequireTasksMdUpdate(state)) return outputJson({});
    if (tasksMdUpdated(state)) return outputJson({});

    // If we haven't verified, force a follow-up that asks for verification first.
    if (!ok) {
      const taskIds = state?.taskContext?.taskIds?.length ? state.taskContext.taskIds.join(', ') : 'the referenced task';
      const hint =
        state?.verification?.lastTestCommandSummary != null
          ? `Last test command seen: ${state.verification.lastTestCommandSummary}`
          : 'No test command detected yet.';

      return outputJson({
        followup_message:
          `Before marking ${taskIds} complete in tasks.md, we need verification.\n\n` +
          `- If this was behavior/logic: run the relevant tests and ensure they pass.\n` +
          `- If this was styling-only: reply with "Visual review: confirmed" after you (or I) have checked light/dark, responsive, and focus states.\n\n` +
          `${hint}`,
      });
    }

    // Verified but tasks.md not updated => force follow-up to update it.
    const taskIds = state?.taskContext?.taskIds?.length ? state.taskContext.taskIds.join(', ') : null;
    const verifiedVia = testsOk ? 'tests passed' : visualOk ? 'visual review confirmed' : 'verification';

    return outputJson({
      followup_message:
        `Verification complete (${verifiedVia}). Please update tasks.md to mark ` +
        `${taskIds ? taskIds : 'the task'} as completed (use the existing ~~strike~~ checklist style + a short "> Completed:" note).`,
    });
  }

  return outputJson({});
}

main();

