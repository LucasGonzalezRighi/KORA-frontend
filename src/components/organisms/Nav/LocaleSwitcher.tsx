'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

import { useLocaleTransition } from '@/features/locale-transition';
import { LOCALES, type Locale, localeShort } from '@/i18n/config';
import { cn } from '@/utils/cn';

type LocaleSwitcherProps = {
  current: Locale;
  label: string;
  /** Path equivalente en otro idioma — lo calcula el Nav, que ya lee el pathname. */
  hrefFor: (locale: Locale) => string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: () => void;
  className?: string;
};

/** Selector de idioma del nav: cambia de idioma sin perder la página actual. */
export function LocaleSwitcher({
  current,
  label,
  hrefFor,
  isOpen,
  onToggle,
  onSelect,
  className,
}: LocaleSwitcherProps) {
  const transition = useLocaleTransition();

  /**
   * `onNavigate` es la prop de `next/link` que corre justo antes de que Next
   * navegue: si el handler llama a `preventDefault()`, Next corta y no hace el
   * `push`. Eso nos deja animar la salida primero, sin perder el `<a href>`
   * real (prefetch, hreflang, abrir en pestaña nueva).
   */
  const handleNavigate = (href: string) => (event: { preventDefault: () => void }) => {
    if (!transition) return;
    event.preventDefault();
    transition.changeLocale(href);
  };

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={onToggle}
        className="inline-flex items-center gap-1 rounded-pill border border-subtle bg-surface/70 px-4 py-2 font-display text-base font-bold tracking-tight text-heading backdrop-blur-sm transition-colors duration-200 ease-out hover:bg-surface focus-visible:shadow-focus focus-visible:outline-none"
      >
        {localeShort(current)}
        <ChevronDown
          aria-hidden
          className={cn(
            'size-4 transition-transform duration-200 ease-out',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen ? (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute right-0 top-full z-10 mt-3 min-w-40 rounded-card border border-subtle bg-surface p-2 shadow-card-rest"
        >
          {LOCALES.map((locale) => (
            <li key={locale.code} role="option" aria-selected={locale.code === current}>
              <Link
                href={hrefFor(locale.code)}
                hrefLang={locale.code}
                onNavigate={handleNavigate(hrefFor(locale.code))}
                onClick={onSelect}
                className={cn(
                  'flex items-center justify-between gap-4 rounded-md px-3 py-2 font-display text-base transition-colors duration-200 ease-out hover:bg-accent-wash',
                  locale.code === current ? 'font-bold text-heading' : 'font-medium text-body',
                )}
              >
                {locale.label}
                <span className="font-mono text-sm text-accent">{locale.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
