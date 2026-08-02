'use client';

import Link from 'next/link';

import { LinkButton } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import type { NavItem } from '@/constants/navigation';
import { ANCHORS } from '@/constants/routes.app';
import { useLocaleTransition } from '@/features/locale-transition';
import { LOCALES, type Locale } from '@/i18n/config';
import { cn } from '@/utils/cn';

import { NAV_LINK_CLASSES } from './Nav.styles';

type MobileMenuProps = {
  items: readonly NavItem[];
  ctaLabel: string;
  languageLabel: string;
  locale: Locale;
  localeHrefFor: (locale: Locale) => string;
  onNavigate: () => void;
};

/** Panel desplegable del nav en pantallas chicas. */
export function MobileMenu({
  items,
  ctaLabel,
  languageLabel,
  locale,
  localeHrefFor,
  onNavigate,
}: MobileMenuProps) {
  const transition = useLocaleTransition();

  /** Igual que en el selector de desktop: animar la salida antes de navegar. */
  const handleLocaleNavigate = (href: string) => (event: { preventDefault: () => void }) => {
    if (!transition) return;
    event.preventDefault();
    transition.changeLocale(href);
  };

  return (
    <div id="menu-mobile" className="border-t border-subtle bg-canvas lg:hidden">
      <Container className="flex flex-col gap-1 py-6">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col">
            <Link href={item.href} onClick={onNavigate} className={cn(NAV_LINK_CLASSES, 'py-3')}>
              {item.label}
            </Link>

            {item.children ? (
              <div className="flex flex-col border-l border-subtle pl-4">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onNavigate}
                    className="py-2 font-display text-base font-medium text-body"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        <div className="mt-6 flex flex-col gap-3">
          <p className="font-mono text-sm uppercase tracking-tight text-accent">{languageLabel}</p>
          <div className="flex gap-2">
            {LOCALES.map((candidate) => (
              <Link
                key={candidate.code}
                href={localeHrefFor(candidate.code)}
                hrefLang={candidate.code}
                onNavigate={handleLocaleNavigate(localeHrefFor(candidate.code))}
                onClick={onNavigate}
                className={cn(
                  'rounded-pill border px-4 py-2 font-display text-base transition-colors duration-200 ease-out',
                  candidate.code === locale
                    ? 'border-ink bg-heading font-bold text-on-inverse'
                    : 'border-subtle bg-surface/70 font-medium text-body',
                )}
              >
                {candidate.short}
              </Link>
            ))}
          </div>
        </div>

        <LinkButton
          href={ANCHORS.contacto}
          variant="solid"
          size="md"
          onClick={onNavigate}
          className="mt-6 self-start"
        >
          {ctaLabel}
        </LinkButton>
      </Container>
    </div>
  );
}
