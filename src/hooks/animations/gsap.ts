'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/**
 * Punto único de entrada a GSAP.
 *
 * Todos los hooks de animación importan desde acá y no desde `gsap` directo,
 * para que el registro de plugins pase una sola vez y no se repita en cada
 * archivo. Registrar dos veces no rompe, pero dispersa la dependencia.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

/**
 * Condiciones de `gsap.matchMedia()`.
 *
 * `matchMedia` es lo que hace posible la regla "mobile reducido": GSAP crea y
 * revierte las animaciones solo mientras la condición se cumple, y limpia solo
 * al cambiar de breakpoint. Nada de `window.innerWidth` a mano.
 */
export const MOTION_MEDIA = {
  /** Coincide con el breakpoint `lg` de Tailwind. */
  desktop: '(min-width: 64rem)',
  mobile: '(max-width: 63.9375rem)',
  reduced: '(prefers-reduced-motion: reduce)',
  /**
   * Hay un puntero real disponible. Todo lo que reacciona al cursor se cuelga
   * de esto: en touch puro no hay hover, y forzarlo deja estados pegados.
   *
   * Usa `any-hover`/`any-pointer` y no `hover`/`pointer` a propósito. Los
   * segundos describen el dispositivo de entrada *primario*: en una notebook
   * con pantalla táctil, Windows suele reportar `pointer: coarse` aunque haya
   * un mouse conectado, y eso apagaba los efectos en máquinas que sí tenían
   * cursor. Los `any-*` responden por *cualquier* dispositivo disponible, que
   * es lo que realmente importa acá.
   */
  finePointer: '(any-hover: hover) and (any-pointer: fine)',
} as const;

export type MotionConditions = {
  isDesktop?: boolean;
  isMobile?: boolean;
  prefersReduced?: boolean;
  hasFinePointer?: boolean;
};

/** Las tres condiciones juntas, que es como las consumen casi todos los hooks. */
export const MOTION_CONDITIONS = {
  isDesktop: MOTION_MEDIA.desktop,
  isMobile: MOTION_MEDIA.mobile,
  prefersReduced: MOTION_MEDIA.reduced,
} as const;

/** Condiciones para lo que reacciona al cursor. */
export const POINTER_CONDITIONS = {
  hasFinePointer: MOTION_MEDIA.finePointer,
  prefersReduced: MOTION_MEDIA.reduced,
} as const;

/**
 * SplitText mide el texto ya renderizado, así que partir antes de que cargue la
 * webfont da cortes de línea equivocados. Satoshi viene de un CDN, con lo cual
 * esto no es teórico.
 */
export function whenFontsReady(run: () => void): () => void {
  let cancelled = false;

  void document.fonts.ready.then(() => {
    if (!cancelled) run();
  });

  return () => {
    cancelled = true;
  };
}
