import { cn } from '@/utils/cn';

import type { ButtonSize, ButtonVariant } from './Button.types';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-button font-display ' +
  'transition-[background-color,color,box-shadow,transform] duration-200 ease-out ' +
  'focus-visible:outline-none focus-visible:shadow-focus ' +
  'disabled:cursor-not-allowed disabled:opacity-55';

/**
 * El peso va por variante, como en el diseño: los CTA sólidos son Bold
 * ("Agendar consulta", "HABLEMOS"); los de contorno, Medium ("Qué hacemos").
 */
const VARIANTS: Record<ButtonVariant, string> = {
  outline:
    'border-[1.4px] border-ink bg-transparent font-medium text-body hover:bg-heading hover:text-on-inverse',
  soft: 'border-[1.4px] border-ink bg-accent-sheer font-medium text-heading hover:bg-accent-soft',
  solid: 'bg-heading font-bold text-on-inverse hover:shadow-accent-glow',
  wash: 'border border-accent-soft bg-accent-wash font-bold text-heading hover:bg-accent-soft',
  icon: 'bg-accent-solid font-medium text-heading hover:brightness-105',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2 text-sm',
  lg: 'px-8 py-3 text-base',
};

/** El variant `icon` es un círculo: ignora el padding de las sizes. */
const ICON_SIZES: Record<ButtonSize, string> = {
  sm: 'size-11 p-0',
  md: 'size-[62px] p-0',
  lg: 'size-[72px] p-0',
};

export function buttonClasses(
  variant: ButtonVariant = 'outline',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(
    BASE,
    VARIANTS[variant],
    variant === 'icon' ? ICON_SIZES[size] : SIZES[size],
    className,
  );
}
