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

  /*
    `-mb-[85px] pb-0`: la sección cierra sin padding y además muerde 85px del
    aire que queda debajo (eran 80; los 5 de más acercan "Tu próximo paso").

    Entre el último paso y "Tu próximo paso" se sumaban tres cosas: los ~322px
    de aire que deja el escenario fijo por debajo del contenido, el padding de
    esta sección y el de la que sigue. Los dos paddings están en cero; lo que
    queda es el aire del escenario, que es estructural: sale de que el bloque
    va centrado dentro de una pantalla completa. Achicar el escenario lo
    resolvería, pero es lo que hace que al terminar el recorrido el contenido
    se despegue y se vea scrollear antes de la sección siguiente.
  */
  return (
    <Section id={SECTION_IDS.soluciones} glow="left" className="-mb-[85px] pb-0">
      <Container>
        {/* 117px entre "Nuestras soluciones" y "TRES UNIDADES DE NEGOCIO" en el diseño. */}
        <div ref={headerRef} className="flex flex-col gap-16 lg:gap-[7.3125rem]">
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
      {/*
        `-mt-[90px]`: 90px de margen **negativo** entre el titular y la secuencia.

        El escenario fijo deja ~322px de aire por encima del contenido, porque
        el bloque va centrado dentro de una pantalla completa. Ese aire no es
        padding y no se puede sacar sin tocar la mecánica del pin, así que la
        forma de recortarlo es morderlo desde afuera. Es seguro justamente
        porque ese espacio está vacío: no hay nada con qué superponerse.

        El recorrido de scroll no cambia — eso lo fija `VH_PER_STEP` en el hook.
      */}
      <div ref={containerRef} {...{ [STEP.track]: '' }} className="relative -mt-[90px]">
        <div {...{ [STEP.stage]: '' }}>
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-16">
              <SequenceIndex items={indexItems} activeIndex={activeIndex} progress={progress} />

              {/*
                Separación entre las tres unidades cuando van apiladas.

                Es la que se ve en mobile y también en desktop cada vez que la
                secuencia no llega a aplicarse: ahí los tres bloques quedan uno
                debajo del otro en flujo normal. Con `gap-24` (96px) se leían
                como tres secciones sueltas de la página en vez de como tres
                caras de lo mismo, que es como están en Figma.

                No afecta a la secuencia con scroll: cuando esa corre, el hook
                pasa los bloques a `position: absolute` y el `gap` deja de tener
                efecto.
              */}
              <div className="flex flex-col gap-12">
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
