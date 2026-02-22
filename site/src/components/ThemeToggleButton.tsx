import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toggleTheme } from '@/lib/client/theme';

export function ThemeToggleButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => toggleTheme()}
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  );
}
