'use client';

import { Container } from '@/components/atoms/Container';
import { RevealText } from '@/components/atoms/RevealText';
import { REVEAL_ITEM_CLASS, useScrollReveal } from '@/hooks/animations';
import type { Dictionary } from '@/i18n';

/**
 * Apertura de Nosotras: titular centrado a 64px y bajada, sobre la atmósfera.
 *
 * A diferencia de la home no hay tarjeta con imagen — el hero es solo texto
 * apoyado en el fondo cálido. El padding superior deja lugar al nav, que en
 * reposo baja lo mismo que en la home.
 */
export function AboutHero({ dict }: { dict: Dictionary['about']['hero'] }) {
  const ref = useScrollReveal<HTMLDivElement>({ start: 'top 95%' });

  return (
    <section data-i18n-block className="pb-section-y-tight pt-page-hero">
      <Container>
        <div ref={ref} className="mx-auto flex max-w-[50rem] flex-col items-center gap-6 text-center">
          <RevealText
            as="h1"
            immediate
            className="max-w-[16ch] font-display text-fluid-page-title font-bold leading-snug tracking-tight text-heading"
          >
            {dict.title}
          </RevealText>

          <p
            className={`${REVEAL_ITEM_CLASS} font-display text-xl font-medium leading-loose tracking-tight text-body`}
          >
            {dict.subtitle}
          </p>
        </div>
      </Container>
    </section>
  );
}
