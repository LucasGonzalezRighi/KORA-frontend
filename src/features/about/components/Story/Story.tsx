'use client';

import { Container } from '@/components/atoms/Container';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { RevealText } from '@/components/atoms/RevealText';
import { Section } from '@/components/atoms/Section';
import { REVEAL_ITEM_CLASS, useScrollReveal } from '@/hooks/animations';
import type { Dictionary } from '@/i18n';

import { StoryTimeline } from './StoryTimeline';

/** "Sobre nosotras": eyebrow, "El equipo detrás de kora." y el recorrido. */
export function Story({ dict }: { dict: Dictionary['about']['story'] }) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <Section glow="left">
      <Container>
        <div className="flex flex-col gap-16 lg:gap-20">
          <div ref={ref} className="flex flex-col gap-heading-gap">
            <Eyebrow className={REVEAL_ITEM_CLASS}>{dict.eyebrow}</Eyebrow>
            <RevealText
              as="h2"
              className="max-w-[14ch] font-display text-fluid-section-lg font-bold leading-snug tracking-tight text-heading"
            >
              {dict.title} <span className="text-accent">{dict.titleHighlight}</span>
              <span className="text-accent">.</span>
            </RevealText>
          </div>

          <StoryTimeline paragraphs={dict.paragraphs} />
        </div>
      </Container>
    </Section>
  );
}
