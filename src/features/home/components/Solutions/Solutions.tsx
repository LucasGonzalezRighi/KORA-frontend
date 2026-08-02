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
 * Altura de scroll de la secuencia en desktop: una pantalla y media por unidad.
 * Más de `100vh` por paso da aire para que la fase de lectura se sienta como
 * lectura y no como una pausa apurada. Si se agrega una unidad, sumar `150vh`.
 */
const SEQUENCE_HEIGHT = 'lg:h-[450vh]';

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

      <div ref={containerRef} className={`relative mt-24 ${SEQUENCE_HEIGHT}`}>
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-16">
              <SequenceIndex items={indexItems} activeIndex={activeIndex} progress={progress} />

              {/* En desktop los pasos comparten lugar; en mobile van en columna. */}
              <div className="relative flex flex-col gap-24 lg:block lg:h-[24rem]">
                {BUSINESS_UNIT_IDS.map((id) => (
                  <div
                    key={id}
                    {...{ [STEP.root]: '' }}
                    className="lg:absolute lg:inset-x-0 lg:top-0"
                  >
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
