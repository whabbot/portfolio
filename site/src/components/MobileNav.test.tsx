import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import MobileNav from './MobileNav';

describe('MobileNav (React)', () => {
  it('opens the sheet from the trigger', async () => {
    const user = userEvent.setup();
    render(<MobileNav pathname="/" />);

    const trigger = screen.getByRole('button', { name: /open menu/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: /menu/i })).toBeInTheDocument();
  });

  it('closes the sheet on backdrop click', async () => {
    const user = userEvent.setup();
    render(<MobileNav pathname="/" />);

    const trigger = screen.getByRole('button', { name: /open menu/i });
    await user.click(trigger);

    const overlay = screen.getByTestId('sheet-overlay');
    await user.click(overlay);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the sheet when a nav link is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileNav pathname="/" />);

    const trigger = screen.getByRole('button', { name: /open menu/i });
    await user.click(trigger);

    const cvLink = screen.getByRole('link', { name: /cv/i });
    await user.click(cvLink);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
