'use client';

import type { ElementType, ReactNode } from 'react';

import { useTextReveal } from '@/hooks/animations';

type RevealTextProps = {
  /** Qué etiqueta renderiza. Es texto, así que casi siempre un titular. */
  as?: ElementType;
  /** Dónde entra el elemento para disparar el reveal. */
  start?: string;
  /** Retraso, para encadenar con el reveal de arriba. */
  delay?: number;
  /** Anima al montar en vez de esperar al scroll. Para texto sobre el fold. */
  immediate?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Titular que se revela línea por línea desde detrás de una máscara.
 *
 * Es el envoltorio reutilizable de `useTextReveal`: cualquier texto que quiera
 * ese tratamiento lo usa en vez de repetir el hook y el ref.
 *
 * Si el usuario pide menos movimiento, o si la fuente nunca carga, el texto
 * queda visible tal cual — el reveal nunca lo deja oculto.
 */
export function RevealText({
  as: Tag = 'span',
  start,
  delay,
  immediate,
  className,
  children,
}: RevealTextProps) {
  const ref = useTextReveal<HTMLElement>({ start, delay, immediate });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
