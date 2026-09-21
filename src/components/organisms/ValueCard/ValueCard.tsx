'use client';

import type { LucideIcon } from 'lucide-react';

import { useTilt } from '@/hooks/animations';
import { cn } from '@/utils/cn';

/** El círculo del icono alterna entre azulado y crema a lo largo de la grilla. */
export type ValueCardTone = 'cool' | 'warm';

/**
 * Cada tono define el círculo **y** el color del ícono. En el diseño las cards
 * frías llevan el ícono en azul acero sobre el círculo azulado; las cálidas,
 * en ámbar claro sobre el círculo crema. Son colores propios (`icon-cool`,
 * `icon-warm`), no la tinta de los títulos ni el ámbar de los eyebrows: esos
 * son más oscuros que lo que muestra el diseño.
 */
const TONES: Record<ValueCardTone, { circle: string; icon: string }> = {
  cool: { circle: 'bg-icon-wash', icon: 'text-icon-cool' },
  warm: { circle: 'bg-icon-wash-warm', icon: 'text-icon-warm' },
};

/**
 * Card de "¿Por qué eligen Kora?": icono en círculo, título en peso black y
 * una bajada.
 *
 * La inclinación va en la card y el parallax en el `<li>` que la envuelve —
 * elementos distintos a propósito: los dos animan `y`, y en el mismo nodo se
 * pisarían.
 */
export function ValueCard({
  icon: Icon,
  title,
  description,
  tone = 'cool',
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: ValueCardTone;
}) {
  const ref = useTilt<HTMLElement>();

  /*
    `min-h-[200px]`: la altura de la card en Figma (361 × 200.18).

    Con el texto en dos renglones el contenido mide ~163px, y la card quedaba
    ajustada al contenido, más chata que en el diseño. Ahí la card tiene alto
    fijo y el contenido va arriba, con aire abajo — que es lo que da esta
    altura mínima con el `flex-col` de siempre. Es solo la caja: el icono, el
    título y la bajada no cambian.
  */
  return (
    <article
      ref={ref}
      className="flex h-full min-h-[200px] flex-col gap-4 rounded-card border border-card bg-surface p-card-padding shadow-card-rest transition-shadow duration-300 ease-out hover:shadow-card-hover"
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            'flex size-[49px] shrink-0 items-center justify-center rounded-avatar',
            TONES[tone].circle,
          )}
        >
          <Icon aria-hidden className={cn('size-6', TONES[tone].icon)} strokeWidth={1.75} />
        </span>
        <h3 className="font-display text-xl font-black leading-tight tracking-tighter text-heading">
          {title}
        </h3>
      </div>

      {/*
        Tamaño de la bajada, atado a que entre en dos renglones.

        Medido sobre el render: la bajada más larga ("Mapeamos tu diaria...")
        necesita ~16.1 veces el cuerpo de letra por renglón para partirse en
        dos, y el ancho de texto disponible en la card de escritorio es ~308px.
        A 20px (los de Figma) pide 322: no entra, se va a tres. A 16px pide
        258 y sobraba. A 17px pide 274: entra con 34px de margen, que es lo
        que hace falta para que las seis queden en dos renglones sin depender
        de dónde caiga cada corte de palabra. 18px (290) ya queda a 18px del
        borde, demasiado justo.

        Es una clase arbitraria (`text-[17px]`) porque la escala no tiene 17:
        `md` es 18 y `base` 16. Requiere que Tailwind regenere el CSS (borrar
        `.next`); si no, la clase no existe y el tamaño no cambia.

        Es solo `font-size`. No toca el contenedor ni la grilla.
      */}
      <p className="font-display text-[17px] leading-body tracking-tight text-body">
        {description}
      </p>
    </article>
  );
}
