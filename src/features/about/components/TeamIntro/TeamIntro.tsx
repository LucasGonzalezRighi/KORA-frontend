'use client';

import { Container } from '@/components/atoms/Container';
import { RevealText } from '@/components/atoms/RevealText';
import { Section } from '@/components/atoms/Section';
import { REVEAL_ITEM_CLASS, useScrollReveal } from '@/hooks/animations';
import type { Dictionary } from '@/i18n';

/** Bloque centrado "Nosotras" + bajada, que abre la mitad institucional. */
export function TeamIntro({ dict }: { dict: Dictionary['about']['intro'] }) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <Section tight>
      <Container>
        <div ref={ref} className="mx-auto flex max-w-[40rem] flex-col items-center gap-6 text-center">
          <RevealText
            as="h2"
            className="font-display text-fluid-section-lg font-bold leading-snug tracking-tight text-heading"
          >
            {dict.title}
          </RevealText>
          <p
            className={`${REVEAL_ITEM_CLASS} max-w-[34ch] font-display text-xl font-medium leading-relaxed tracking-tight text-body`}
          >
            {dict.subtitle}
          </p>
        </div>
      </Container>
    </Section>
  );
}
