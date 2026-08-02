'use client';

import { useState } from 'react';

import { FaqItem } from '@/components/molecules/FaqItem';

export type FaqEntry = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
};

/** Acordeón de una sola pregunta abierta por vez. */
export function FaqAccordion({ faqs }: { faqs: readonly FaqEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {faqs.map((faq) => (
        <FaqItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          isOpen={openId === faq.id}
          onToggle={() => setOpenId((current) => (current === faq.id ? null : faq.id))}
        />
      ))}
    </div>
  );
}
