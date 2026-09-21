'use client';

import type { LucideIcon } from 'lucide-react';

import { useTilt } from '@/hooks/animations';

/**
 * Mini card de valores: tile de icono centrado, título en ámbar y una bajada
 * corta. Son cinco en fila en desktop, así que todo va centrado y compacto.
 *
 * Mide 262px de alto en el diseño con el contenido arriba y aire abajo: el
 * `min-h` y el padding inferior reproducen esa proporción.
 */
export function ValueMiniCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  const ref = useTilt<HTMLElement>({ maxTilt: 6, lift: 4 });

  return (
    <article
      ref={ref}
      className="flex h-full min-h-[16.375rem] flex-col items-center gap-2.5 rounded-card-soft border border-peach bg-surface-warm px-5 pb-11 pt-6 text-center shadow-card-rest transition-shadow duration-300 ease-out hover:shadow-card-hover"
    >
      <span className="flex size-[42px] items-center justify-center rounded-tile border border-tile bg-tile">
        <Icon aria-hidden className="size-6 text-accent-bright" strokeWidth={1.75} />
      </span>
      <h3 className="px-2.5 py-2.5 font-display text-base font-bold leading-relaxed tracking-tight text-accent">
        {title}
      </h3>
      <p className="font-display text-sm font-medium leading-body tracking-tight text-body">
        {description}
      </p>
    </article>
  );
}
