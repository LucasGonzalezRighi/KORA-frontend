'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { useParallax } from '@/hooks/animations';

import { AtmosphereShape } from './AtmosphereShape';
import { FOOTER_RESERVE, HERO_SHAPES, MARGIN_PATTERN } from './shapes';

/**
 * El fondo de toda la página: las formas difuminadas de Figma, como capas del
 * DOM detrás del contenido.
 *
 * Va **en el flujo del documento** (absoluta sobre el `body`, que es
 * `relative`), no fija: en el diseño cada forma está en un lugar concreto del
 * lienzo, y para que quede donde tiene que quedar el fondo tiene que medir lo
 * mismo que la página y scrollear con ella. Encima de eso, cada forma lleva un
 * parallax sutil — es lo que hace que el fondo se sienta a otra profundidad
 * que el contenido.
 *
 * El hero se pinta una vez. El patrón de márgenes se repite hasta el bloque de
 * contacto, así el ambiente cubre páginas de cualquier largo.
 */
export function Atmosphere() {
  const repeats = useMarginRepeats();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-50 overflow-hidden">
      <ParallaxGroup>
        {HERO_SHAPES.map((shape) => (
          <AtmosphereShape key={shape.id} shape={shape} />
        ))}
      </ParallaxGroup>

      {Array.from({ length: repeats }, (_, index) => (
        <ParallaxGroup key={index}>
          {MARGIN_PATTERN.shapes.map((shape) => (
            <AtmosphereShape
              key={shape.id}
              shape={shape}
              offsetY={MARGIN_PATTERN.top + index * MARGIN_PATTERN.height}
            />
          ))}
        </ParallaxGroup>
      ))}
    </div>
  );
}

/**
 * Cada grupo registra su propio parallax al montarse. Así, cuando la medición
 * agrega una repetición del patrón, las formas nuevas se animan solas sin
 * tener que rehacer las de los grupos que ya estaban.
 *
 * `display: contents` para que las formas sigan siendo absolutas respecto del
 * fondo completo, no de este wrapper.
 */
function ParallaxGroup({ children }: { children: ReactNode }) {
  const ref = useParallax<HTMLDivElement>({
    start: 'top bottom',
    end: 'bottom top',
    triggerSelf: true,
  });

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}

/**
 * Cuántas veces entra el patrón de márgenes entre su inicio y el contacto.
 *
 * Se mide el documento y no una constante porque el largo cambia por página
 * (home vs. Nosotras) y por idioma. Arranca en 1 para que servidor y cliente
 * rendericen lo mismo; el número real llega con la primera medición.
 */
function useMarginRepeats() {
  const [repeats, setRepeats] = useState(1);

  useEffect(() => {
    const measure = () => {
      const usable =
        document.documentElement.scrollHeight - MARGIN_PATTERN.top - FOOTER_RESERVE;
      setRepeats(Math.max(1, Math.ceil(usable / MARGIN_PATTERN.height)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

  return repeats;
}
