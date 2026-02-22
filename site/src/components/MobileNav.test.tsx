import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import MobileNav from './MobileNav';

describe('MobileNav (React)', () => {
  it('opens the sheet from the trigger and closes on backdrop click', async () => {
    const user = userEvent.setup();
    render(<MobileNav pathname="/" />);

    const trigger = screen.getByRole('button', { name: /open menu/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: /menu/i })).toBeInTheDocument();

    await user.click(screen.getByTestId('sheet-overlay'));
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  });

  it('closes when a nav link is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileNav pathname="/" />);

    const trigger = screen.getByRole('button', { name: /open menu/i });
    await user.click(trigger);

    const cvLink = screen.getByRole('link', { name: /cv/i });
    await user.click(cvLink);

    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  });
});
