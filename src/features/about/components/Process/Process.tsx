'use client';

import { LinkButton } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { Magnetic } from '@/components/atoms/Magnetic';
import { RevealText } from '@/components/atoms/RevealText';
import { Section } from '@/components/atoms/Section';
import { homeAnchor } from '@/constants/routes.app';
import { REVEAL_ITEM_CLASS, useScrollReveal } from '@/hooks/animations';
import type { Dictionary, Locale } from '@/i18n';

import { PROCESS_STEPS, PROCESS_STEP_IDS } from '../../data/process';
import { ProcessCard } from './ProcessCard';

/** "¿Cómo lo hacemos?": título centrado, tres cards y el CTA de diagnóstico. */
export function Process({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary['about']['process'];
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <Section tight>
      <Container>
        <div ref={ref} className="flex flex-col items-center gap-14">
          <RevealText
            as="h2"
            className="text-center font-display text-fluid-section-sm font-bold leading-snug tracking-tight text-heading"
          >
            {dict.title}
          </RevealText>

          {/* 22px entre cards en el diseño. */}
          <ul className="grid w-full max-w-[69rem] gap-[22px] md:grid-cols-3">
            {PROCESS_STEP_IDS.map((id, index) => (
              <li key={id} className={REVEAL_ITEM_CLASS}>
                <ProcessCard
                  icon={PROCESS_STEPS[id].icon}
                  tone={PROCESS_STEPS[id].tone}
                  number={String(index + 1).padStart(2, '0')}
                  title={dict.steps[id].title}
                  description={dict.steps[id].description}
                  resultLabel={dict.resultLabel}
                  result={dict.steps[id].result}
                />
              </li>
            ))}
          </ul>

          <Magnetic className={`${REVEAL_ITEM_CLASS} mt-6`}>
            <LinkButton href={homeAnchor(locale, 'contacto')} variant="solid" size="lg">
              {dict.cta}
            </LinkButton>
          </Magnetic>
        </div>
      </Container>
    </Section>
  );
}
