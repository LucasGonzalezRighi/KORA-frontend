'use client';

import { PARALLAX_ATTR, useParallax } from '@/hooks/animations';

/**
 * Los halos cálidos del fondo, como capas del DOM.
 *
 * Antes vivían en el `background-image` del `body`, y por eso no se podían
 * mover: un fondo no se anima con transformaciones. Sacarlos a capas propias es
 * lo que permite que se desplacen a distinta velocidad que el contenido, que es
 * de dónde sale la sensación de profundidad de toda la página.
 *
 * Van detrás de todo y sin eventos de puntero; en mobile no se mueven (el hook
 * de parallax solo corre en desktop) pero se siguen viendo.
 */
export function AmbientGlow() {
  const ref = useParallax<HTMLDivElement>({ start: 'top top', end: 'bottom bottom' });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div
        {...{ [PARALLAX_ATTR]: 'strong' }}
        className="absolute inset-x-0 -top-1/4 h-[150%] bg-glow-page"
      />
    </div>
  );
}
