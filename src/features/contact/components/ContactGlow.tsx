'use client';

import { usePointerGlow } from '@/hooks/animations';

/**
 * Capa de halos del bloque de contacto.
 *
 * Existe como componente cliente aparte para que `ContactSection` pueda seguir
 * siendo un Server Component: lo único que necesita el navegador es seguir al
 * cursor, no el bloque entero.
 */
export function ContactGlow() {
  const ref = usePointerGlow<HTMLDivElement>();

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-glow-contact" />
      <div className="absolute inset-0 bg-glow-contact-steel" />
    </div>
  );
}
