'use client';

import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { FaqAccordion } from '@/components/organisms/FaqAccordion';
import { SECTION_IDS } from '@/constants/routes.app';
import { FAQ_IDS } from '@/features/home/data/faqs';
import type { Dictionary } from '@/i18n';
import { REVEAL_ITEM_CLASS, useScrollReveal } from '@/hooks/animations';

/** Preguntas frecuentes. */
export function Faqs({ dict }: { dict: Dictionary['faqs'] }) {
  const containerRef = useScrollReveal<HTMLDivElement>();

  const faqs = FAQ_IDS.map((id) => ({
    id,
    question: dict.items[id].question,
    answer: dict.items[id].answer,
  }));

  return (
    <Section id={SECTION_IDS.faqs} glow="left">
      <Container>
        <div ref={containerRef} className="flex flex-col gap-14">
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} className={REVEAL_ITEM_CLASS} />

          <div className={REVEAL_ITEM_CLASS}>
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
