'use client';

import { Container } from '@/components/atoms/Container';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { Section } from '@/components/atoms/Section';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { BusinessUnitBlock, SequenceIndex } from '@/components/organisms/BusinessUnitBlock';
import { ROUTES_APP, SECTION_IDS } from '@/constants/routes.app';
import { BUSINESS_UNIT_IDS } from '@/features/home/data/businessUnits';
import { REVEAL_ITEM_CLASS, useScrollReveal, useStickySequence } from '@/hooks/animations';
import { STEP } from '@/hooks/animations/sequenceParts';
import type { Dictionary, Locale } from '@/i18n';

type SolutionsProps = {
  locale: Locale;
  dict: Dictionary['solutions'];
};

/**
 * "Una sola mirada de ingeniería" + las tres unidades de negocio.
 *
 * En desktop las unidades se relevan coreografiadas mientras la sección queda
 * fija, con un índice persistente que marca dónde estás. En mobile quedan
 * apiladas y estáticas.
 */
export function Solutions({ locale, dict }: SolutionsProps) {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const { containerRef, activeIndex, progress } = useStickySequence<HTMLDivElement>();

  const indexItems = BUSINESS_UNIT_IDS.map((id) => ({ id, label: dict.units[id].tab }));

  return (
    <Section id={SECTION_IDS.soluciones} glow="left">
      <Container>
        <div ref={headerRef} className="flex flex-col gap-20">
          <Eyebrow className={REVEAL_ITEM_CLASS}>{dict.eyebrow}</Eyebrow>

          <SectionHeading
            overline={dict.overline}
            title={dict.title}
            titleHighlight={dict.titleHighlight}
            align="center"
          />
        </div>
      </Container>

      {/*
        Sin clases de superposición acá a propósito: por defecto los pasos van
        apilados en flujo normal, que es el estado legible. El layout de
        secuencia —alto del recorrido, `sticky`, pasos absolutos— lo aplica
        `useStickySequence` solo cuando la animación efectivamente corre. Si no
        corre, la sección se lee igual en vez de quedar los tres encimados.
      */}
      <div ref={containerRef} {...{ [STEP.track]: '' }} className="relative mt-24">
        <div {...{ [STEP.stage]: '' }}>
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-16">
              <SequenceIndex items={indexItems} activeIndex={activeIndex} progress={progress} />

              <div className="flex flex-col gap-24">
                {BUSINESS_UNIT_IDS.map((id) => (
                  <div key={id} {...{ [STEP.root]: '' }}>
                    <BusinessUnitBlock
                      title={dict.units[id].title}
                      description={dict.units[id].description}
                      bullets={dict.units[id].bullets}
                      href={ROUTES_APP.solution(locale, id)}
                      ctaLabel={dict.seeMore}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}
