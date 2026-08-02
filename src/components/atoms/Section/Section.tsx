import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

type SectionGlow = 'none' | 'left' | 'right';

const GLOWS: Record<SectionGlow, string> = {
  none: '',
  left: 'before:bg-glow-left',
  right: 'before:bg-glow-right',
};

type SectionProps = {
  id?: string;
  /** Halo ámbar difuso a un costado, como en el diseño. */
  glow?: SectionGlow;
  /** Padding vertical reducido. */
  tight?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Banda vertical de la landing: maneja el ritmo vertical y los glows de fondo.
 *
 * Lleva `data-i18n-block` para que la transición de idioma sepa qué animar sin
 * tener que enumerar componentes: al cambiar de idioma se animan los bloques
 * que estén visibles, y este atributo es lo que los identifica.
 */
export function Section({ id, glow = 'none', tight = false, className, children }: SectionProps) {
  return (
    <section
      id={id}
      data-i18n-block
      className={cn(
        'relative isolate scroll-mt-24',
        tight ? 'py-section-y-tight' : 'py-section-y',
        glow !== 'none' &&
          'before:pointer-events-none before:absolute before:inset-y-0 before:-z-10 before:w-1/2 before:content-[""]',
        glow === 'left' && 'before:left-0',
        glow === 'right' && 'before:right-0',
        GLOWS[glow],
        className,
      )}
    >
      {children}
    </section>
  );
}
