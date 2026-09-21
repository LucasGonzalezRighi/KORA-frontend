import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

/**
 * Etiqueta en mayúsculas que corona las secciones centradas
 * ("TRES UNIDADES DE NEGOCIO", "TU PRÓXIMO PASO", "EL EQUIPO").
 *
 * 24px en peso bold: medido en el archivo de Figma, "TRES UNIDADES DE NEGOCIO"
 * ocupa 347px de ancho, que es lo que da Satoshi Bold a 24 — a 14px, como
 * estaba, quedaba como una etiqueta menor y no como el remate de un titular.
 */
export function Overline({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'font-display text-xl font-bold uppercase leading-relaxed tracking-tight text-heading',
        className,
      )}
    >
      {children}
    </p>
  );
}
