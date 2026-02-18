import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('resolves Tailwind conflicts in favor of the last class', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('handles falsy values', () => {
    const isHidden = false;
    expect(cn('base', isHidden && 'hidden', 'extra')).toBe('base extra');
  });
});
