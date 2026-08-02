import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

import { SquareMark } from '../SquareMark';

type EyebrowTone = 'ink' | 'accent';

const TONES: Record<EyebrowTone, string> = {
  ink: 'text-heading',
  accent: 'text-accent',
};

type EyebrowSize = 'sm' | 'md';

/** `sm` para etiquetas dentro de bloques (contacto); `md` es la de sección. */
const SIZES: Record<EyebrowSize, string> = {
  sm: 'text-base',
  md: 'text-fluid-eyebrow leading-relaxed',
};

type EyebrowProps = {
  /** Muestra el cuadradito ámbar a la izquierda. */
  withMark?: boolean;
  tone?: EyebrowTone;
  size?: EyebrowSize;
  className?: string;
  children: ReactNode;
};

/**
 * Etiqueta monoespaciada que encabeza una sección ("Nuestras soluciones").
 * En el diseño va a 24px, bastante más grande de lo que sugiere la palabra
 * "eyebrow" — de ahí que `md` sea el default.
 */
export function Eyebrow({
  withMark = true,
  tone = 'ink',
  size = 'md',
  className,
  children,
}: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-start gap-4 font-mono font-medium tracking-tight',
        SIZES[size],
        TONES[tone],
        className,
      )}
    >
      {withMark ? <SquareMark className="mt-1.5" /> : null}
      <span className="whitespace-pre-line">{children}</span>
    </p>
  );
}
