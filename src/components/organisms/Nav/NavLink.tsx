'use client';

import Link from 'next/link';

import { cn } from '@/utils/cn';

import { SwapLabel, useLabelSwap } from './LabelSwap';
import { NAV_LINK_CLASSES } from './Nav.styles';

type NavLinkProps = {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
};

/** Link del nav con intercambio de etiqueta al pasar el cursor. */
export function NavLink({ href, label, onClick, className }: NavLinkProps) {
  const { ref, handlers } = useLabelSwap<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      {...handlers}
      className={cn(NAV_LINK_CLASSES, 'inline-flex items-center', className)}
    >
      <SwapLabel label={label} />
    </Link>
  );
}
