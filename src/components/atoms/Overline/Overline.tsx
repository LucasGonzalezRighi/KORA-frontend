import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

/**
 * Etiqueta en mayúsculas que corona las secciones centradas
 * ("TRES UNIDADES DE NEGOCIO", "TU PRÓXIMO PASO").
 */
export function Overline({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'font-display text-sm font-bold uppercase tracking-wide text-heading',
        className,
      )}
    >
      {children}
    </p>
  );
}
