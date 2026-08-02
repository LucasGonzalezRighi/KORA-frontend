'use client';

import { ChevronDown } from 'lucide-react';
import { useId, useRef } from 'react';

import { tokens } from '@/design-system';
import { gsap, useGSAP } from '@/hooks/animations/gsap';
import { cn } from '@/utils/cn';

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * Una pregunta del acordeón. Presentacional: no decide si está abierta, eso lo
 * maneja el `FaqAccordion` que lo envuelve.
 *
 * La apertura se anima con GSAP sobre `height: auto`, que GSAP resuelve
 * midiendo el contenido real — por eso funciona aunque la respuesta ocupe
 * distinta cantidad de líneas en cada idioma. El texto entra apenas después
 * que el alto, para que no se lo vea estirarse.
 */
export function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;
  const panelRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // En el primer render no se anima: el estado inicial no es una transición.
      if (isFirstRender.current || reduced) {
        isFirstRender.current = false;
        gsap.set(panel, { height: isOpen ? 'auto' : 0, autoAlpha: isOpen ? 1 : 0 });
        return;
      }

      const { durations, easings } = tokens.motion;

      if (isOpen) {
        gsap
          .timeline()
          .to(panel, {
            height: 'auto',
            duration: durations.base,
            ease: easings.outQuart,
          })
          .fromTo(
            panel.firstElementChild,
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: durations.fast, ease: easings.outQuart },
            '-=0.18',
          )
          .set(panel, { autoAlpha: 1 }, 0);
      } else {
        gsap.to(panel, {
          height: 0,
          autoAlpha: 0,
          duration: durations.fast,
          ease: easings.inOut,
        });
      }
    },
    { dependencies: [isOpen] },
  );

  return (
    <div className="border-b border-hairline">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 ease-out hover:text-accent focus-visible:shadow-focus focus-visible:outline-none"
        >
          <span className="font-display text-xl font-medium leading-relaxed tracking-tight text-heading">
            {question}
          </span>
          <ChevronDown
            aria-hidden
            className={cn(
              'size-6 shrink-0 text-heading transition-transform duration-300 ease-out',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </h3>

      {/*
        Sin `hidden`: el panel se colapsa por altura. `hidden` corta la
        animación de golpe. La accesibilidad la sostienen `aria-expanded` y
        `inert`, que además saca los links del orden de tabulación.
      */}
      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!isOpen}
        className="overflow-hidden"
      >
        <p className="pb-6 pr-12 font-display text-md leading-body tracking-tight text-body">
          {answer}
        </p>
      </div>
    </div>
  );
}
