'use client';

import { cn } from '@/utils/cn';

export type SequenceIndexItem = {
  readonly id: string;
  readonly label: string;
};

type SequenceIndexProps = {
  items: readonly SequenceIndexItem[];
  activeIndex: number;
  /** 0→1 a lo largo de toda la secuencia. Alimenta la barra de progreso. */
  progress: number;
};

/**
 * Índice persistente de la secuencia de unidades.
 *
 * No se anima con las unidades: se queda fijo y solo se mueve el marcador. Es
 * lo que hace que la sección se lea como *un sistema con estado* y no como tres
 * diapositivas — la referencia queda quieta mientras el contenido cambia.
 *
 * La barra de progreso es la señal de "esto lo maneja tu scroll": sin ella, que
 * la sección quede fija se siente como si la página se hubiera trabado.
 *
 * Su transición es corta y lineal a propósito. El scroll ya viene suavizado por
 * el `scrub` de la secuencia; una transición larga acá se **suma** a esa demora
 * en vez de reemplazarla, y el riel termina llegando notoriamente después del
 * dedo. Los 75ms que quedan solo existen para que los saltos discretos del
 * estado de React no se vean escalonados.
 */
export function SequenceIndex({ items, activeIndex, progress }: SequenceIndexProps) {
  return (
    <div className="flex gap-5">
      {/* Riel de progreso — solo tiene sentido cuando hay secuencia (desktop). */}
      <div
        aria-hidden
        className="bg-hairline relative hidden w-px shrink-0 overflow-hidden lg:block"
      >
        <span
          className="absolute inset-x-0 top-0 block bg-accent transition-[height] duration-75 ease-linear"
          style={{ height: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/*
        En desktop el índice se centra en vez de quedar pegado al tope.

        El grid le da al índice el alto completo del escenario (24rem), así que
        alineado arriba las tres etiquetas quedaban apiladas en el borde
        superior con un vacío grande abajo, y desalineadas respecto del bloque
        de contenido, que sí está centrado. `justify-center` las pone a la misma
        altura que la unidad que están indicando.

        El `gap-10` es lo mismo mirado de otra forma: con `gap-6` las tres
        entradas se leían como un bloque de texto de tres renglones y no como
        tres destinos separados.
      */}
      <ol className="flex flex-row flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:justify-center lg:gap-10">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={item.id} className="flex items-center gap-4">
              <span
                aria-hidden
                className={cn(
                  'block size-[13px] shrink-0 transition-all duration-300 ease-out',
                  isActive ? 'scale-100 bg-accent' : 'bg-hairline scale-75',
                )}
              />
              <span
                className={cn(
                  'font-display text-base uppercase tracking-tight transition-colors duration-300 ease-out',
                  isActive ? 'font-bold text-heading' : 'font-medium text-body/60',
                )}
              >
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
