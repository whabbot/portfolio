type MobileNavElements = {
  root: HTMLElement;
  toggle: HTMLButtonElement;
  panel: HTMLElement;
  closeButtons: HTMLButtonElement[];
  links: HTMLElement[];
};

function getElements(root: HTMLElement): MobileNavElements | null {
  const toggle = root.querySelector<HTMLButtonElement>('[data-mobile-nav-toggle]');
  const panel = root.querySelector<HTMLElement>('[data-mobile-nav-panel]');
  if (!toggle || !panel) {
    return null;
  }

  const closeButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-mobile-nav-close]'),
  );
  if (closeButtons.length === 0) {
    return null;
  }

  const links = Array.from(root.querySelectorAll<HTMLElement>('[data-mobile-nav-link]'));
  return { root, toggle, panel, closeButtons, links };
}

function portalPanelToBody(panel: HTMLElement): void {
  const doc = panel.ownerDocument;
  if (!doc?.body) {
    return;
  }
  if (panel.parentElement !== doc.body) {
    doc.body.appendChild(panel);
  }
}

function createSetOpen(els: MobileNavElements) {
  const doc = els.panel.ownerDocument;
  const previousBodyOverflow = doc?.body?.style.overflow ?? '';

  return (isOpen: boolean) => {
    els.toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    els.panel.hidden = !isOpen;

    if (!doc?.body) {
      return;
    }
    if (isOpen) {
      doc.body.style.overflow = 'hidden';
    } else {
      doc.body.style.overflow = previousBodyOverflow;
    }
  };
}

function wireHandlers(els: MobileNavElements, setOpen: (isOpen: boolean) => void): void {
  els.toggle.addEventListener('click', () => {
    const isOpen = els.toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  for (const button of els.closeButtons) {
    button.addEventListener('click', () => setOpen(false));
  }
  for (const link of els.links) {
    link.addEventListener('click', () => setOpen(false));
  }
}

function initMobileNavRoot(root: HTMLElement): void {
  if (root.dataset.mobileNavInit === 'true') {
    return;
  }
  root.dataset.mobileNavInit = 'true';

  const els = getElements(root);
  if (!els) {
    return;
  }

  portalPanelToBody(els.panel);

  const setOpen = createSetOpen(els);
  setOpen(els.toggle.getAttribute('aria-expanded') === 'true');
  wireHandlers(els, setOpen);
}

export function initMobileNav(scope: ParentNode = document): void {
  const roots = scope.querySelectorAll<HTMLElement>('[data-mobile-nav-root]');
  for (const root of roots) {
    initMobileNavRoot(root);
  }
}
