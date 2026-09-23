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
  md: 'text-md leading-relaxed',
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
 * Etiqueta que encabeza una sección ("Nuestras soluciones", "Sobre nosotras").
 *
 * En el archivo "Kora. Copy" va en Satoshi a 18px con la marca chica: medido
 * sobre el render, la marca mide lo que la altura de x del texto y el texto es
 * un tercio del titular de 52px. La caja de 31px de la metadata es la línea,
 * no el cuerpo.
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
        'flex items-center gap-3 font-display font-medium tracking-tight',
        SIZES[size],
        TONES[tone],
        className,
      )}
    >
      {withMark ? <SquareMark size="sm" /> : null}
      <span className="whitespace-pre-line">{children}</span>
    </p>
  );
}
