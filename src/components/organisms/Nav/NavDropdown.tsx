'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

import type { NavChild } from '@/constants/navigation';
import { cn } from '@/utils/cn';

import { SwapLabel, useLabelSwap } from './LabelSwap';
import { NAV_LINK_CLASSES } from './Nav.styles';

type NavDropdownProps = {
  label: string;
  /** Se llama `items` y no `children` a propósito: es data, no contenido JSX. */
  items: readonly NavChild[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: () => void;
};

/** Item del nav con submenú — el "Soluciones ⌄" del diseño. */
export function NavDropdown({ label, items, isOpen, onToggle, onSelect }: NavDropdownProps) {
  const { ref, handlers } = useLabelSwap<HTMLButtonElement>();

  return (
    <div className="relative">
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={onToggle}
        {...handlers}
        className={cn(NAV_LINK_CLASSES, 'inline-flex items-center gap-1')}
      >
        <SwapLabel label={label} />
        <ChevronDown
          aria-hidden
          className={cn(
            'size-4 transition-transform duration-200 ease-out',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen ? (
        <ul className="absolute left-0 top-full z-10 mt-3 min-w-56 rounded-card border border-subtle bg-surface p-2 shadow-card-rest">
          {items.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onSelect}
                className="block rounded-md px-3 py-2 font-display text-base font-medium text-body transition-colors duration-200 ease-out hover:bg-accent-wash hover:text-heading"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
