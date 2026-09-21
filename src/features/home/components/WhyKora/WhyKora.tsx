'use client';

import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { ValueCard } from '@/components/organisms/ValueCard';
import { SECTION_IDS } from '@/constants/routes.app';
import { VALUE_CARD_ICONS, VALUE_CARD_IDS } from '@/features/home/data/values';
import type { Dictionary } from '@/i18n';
import { REVEAL_ITEM_CLASS, useScrollReveal } from '@/hooks/animations';

/** "¿Por qué las empresas eligen Kora Advisory?" + las seis cards de valor. */
export function WhyKora({ dict }: { dict: Dictionary['whyKora'] }) {
  const containerRef = useScrollReveal<HTMLDivElement>();

  /*
    `-mb-[8px]`: le come 8px al aire que separa las cards de "Nuestras
    soluciones" (fueron 3 primero y 5 más después). Va como margen negativo y no tocando `py-section-y`, que es
    el ritmo vertical de toda la landing: así el ajuste queda en esta sección
    y no mueve ninguna otra.
  */
  return (
    <Section id={SECTION_IDS.porQueKora} glow="right" className="-mb-[8px]">
      <Container>
        <div ref={containerRef} className="flex flex-col gap-16">
          <SectionHeading
            eyebrowPlain={dict.eyebrow}
            title={dict.title}
            titleHighlight={dict.titleHighlight}
            titleSuffix={dict.titleSuffix}
            size="md"
            titleMaxWidth="max-w-[34ch]"
            className={REVEAL_ITEM_CLASS}
          />

          {/*
            Gaps del diseño: 21px entre columnas, 49px entre filas.

            Sin parallax por columna a propósito: desfasar las cards de una
            grilla no se lee como profundidad, se lee como desalineación. La
            grilla tiene que leerse como grilla; el movimiento vive en el hover.
          */}
          <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_CARD_IDS.map((id, index) => (
              <li key={id} className={REVEAL_ITEM_CLASS}>
                <ValueCard
                  icon={VALUE_CARD_ICONS[id]}
                  title={dict.cards[id].title}
                  description={dict.cards[id].description}
                  tone={index % 2 === 0 ? 'cool' : 'warm'}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
