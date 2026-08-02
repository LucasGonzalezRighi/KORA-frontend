'use client';

import type { ReactNode } from 'react';

import { useMagnetic } from '@/hooks/animations';

/**
 * Envuelve cualquier elemento para darle atracción magnética hacia el cursor.
 *
 * Es un envoltorio y no una prop de `Button` porque los hooks no se pueden
 * llamar condicionalmente: con una prop habría que ejecutar el hook siempre,
 * incluso en los botones que no lo usan. Componiendo, el que no lo necesita no
 * paga nada.
 *
 * Reservado para los CTA principales. En todos los botones, cansa.
 */
export function Magnetic({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useMagnetic<HTMLSpanElement>();

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex' }}>
      {children}
    </span>
  );
}
