import type { ElementType, ReactNode } from 'react';

import { cn } from '@/utils/cn';

type ContainerWidth = 'default' | 'narrow' | 'nav' | 'wide';

const WIDTHS: Record<ContainerWidth, string> = {
  default: 'max-w-container',
  narrow: 'max-w-narrow',
  nav: 'max-w-nav',
  wide: 'max-w-wide',
};

type ContainerProps = {
  as?: ElementType;
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
};

/** Centra el contenido y aplica el gutter lateral del design system. */
export function Container({
  as: Tag = 'div',
  width = 'default',
  className,
  children,
}: ContainerProps) {
  return <Tag className={cn('mx-auto w-full px-gutter', WIDTHS[width], className)}>{children}</Tag>;
}
