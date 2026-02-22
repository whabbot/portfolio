import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';

const links = [
  { href: '/cv', label: 'CV' },
  { href: '/projects', label: 'Projects' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/' || pathname === '';
  }
  return pathname === href || pathname === `${href}/`;
}

function MobileNavLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const active = isActive(pathname, href);
  const className = [
    'text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
  ].join(' ');

  return (
    <SheetClose asChild>
      <a href={href} className={className} aria-current={active ? 'page' : undefined}>
        {label}
      </a>
    </SheetClose>
  );
}

function MobileNavThemeRow() {
  return (
    <div className="mt-6 flex items-center justify-between border-t border-default pt-5">
      <span className="text-sm font-medium text-muted-foreground">Theme</span>
      <ThemeToggleButton />
    </div>
  );
}

export default function MobileNav({ pathname }: { pathname: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" aria-label="Mobile menu">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">Primary site navigation</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="px-6 py-5">
          <div className="flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <MobileNavLink key={href} href={href} label={label} pathname={pathname} />
            ))}
          </div>

          <MobileNavThemeRow />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
