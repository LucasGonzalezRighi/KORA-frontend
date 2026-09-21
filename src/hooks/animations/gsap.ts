'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
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
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, MotionPathPlugin);
}

export { gsap, MotionPathPlugin, ScrollTrigger, SplitText, useGSAP };

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

/**
 * Si el sitio respeta o no la preferencia de movimiento reducido del sistema.
 *
 * **Está en `false` por decisión del producto.** El motivo práctico: en Windows
 * esa preferencia se activa sola con el ahorro de batería, así que buena parte
 * de quienes la tienen puesta nunca la eligieron, y el sitio se les veía
 * completamente estático sin que supieran por qué.
 *
 * La contrapartida hay que decirla: para quien sí la eligió —por vértigo o
 * migraña— el movimiento deja de ser opcional. Por eso el interruptor en la
 * interfaz deja de ser un lujo y pasa a ser la única salida que le queda a esa
 * persona.
 *
 * Este es el único lugar donde se decide. Ponerlo en `true` devuelve el
 * comportamiento respetuoso sin tocar ningún hook.
 */
export const RESPECT_OS_REDUCED_MOTION = false;

/**
 * Resuelve si hay que reducir el movimiento, aplicando la política de arriba.
 *
 * Los hooks preguntan por acá y no por la media query directamente, para que la
 * decisión viva en un solo lugar.
 */
export function motionIsReduced(fromConditions?: boolean): boolean {
  if (!RESPECT_OS_REDUCED_MOTION) return false;
  if (typeof fromConditions === 'boolean') return fromConditions;
  return typeof window !== 'undefined' && window.matchMedia(MOTION_MEDIA.reduced).matches;
}

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

/** Pesos de la fuente display que usan los titulares. Se esperan antes de partir líneas. */
const DISPLAY_FONT_FACES = ['500 1em Satoshi', '700 1em Satoshi', '900 1em Satoshi'] as const;

/** Tope de espera por la hoja de estilos del CDN; pasado esto se parte igual. */
const FONT_STYLESHEET_TIMEOUT_MS = 3000;

/**
 * La hoja de Fontshare que declara Satoshi. Hasta que no llega, el navegador
 * ni sabe que la familia existe.
 */
function fontStylesheetLoaded(): Promise<void> {
  const link = document.querySelector<HTMLLinkElement>('link[rel="stylesheet"][href*="fontshare"]');
  if (!link || link.sheet) return Promise.resolve();

  return new Promise((resolve) => {
    const done = () => resolve();
    link.addEventListener('load', done, { once: true });
    link.addEventListener('error', done, { once: true });
    window.setTimeout(done, FONT_STYLESHEET_TIMEOUT_MS);
  });
}

/**
 * SplitText mide el texto ya renderizado, así que partir antes de que cargue la
 * webfont da cortes de línea equivocados. Satoshi viene de un CDN, con lo cual
 * esto no es teórico.
 *
 * `document.fonts.ready` solo no alcanza: se resuelve apenas no hay cargas
 * *pendientes*, y si la hoja del CDN todavía no llegó, no hay nada pendiente —
 * el titular está en la fuente de fallback, más ancha, y las líneas quedan
 * partidas donde no corresponde ("El equipo / detrás de kora."). Por eso acá se
 * espera la hoja, se pide la carga explícita de cada peso y recién ahí se
 * vuelve a consultar `ready`.
 */
export function whenFontsReady(run: () => void): () => void {
  let cancelled = false;

  void fontStylesheetLoaded()
    .then(() => Promise.all(DISPLAY_FONT_FACES.map((face) => document.fonts.load(face))))
    .then(() => document.fonts.ready)
    .then(() => {
      if (!cancelled) run();
    });

  return () => {
    cancelled = true;
  };
}

/**
 * Aire que se le da a cada línea enmascarada para que no le corten la tinta.
 *
 * `mask: 'lines'` envuelve cada renglón en una caja con `overflow: clip` cuyo
 * alto es el de la **caja de línea**, o sea `font-size × line-height`. Pero la
 * tinta de una fuente no cabe necesariamente ahí: entre el ascendente y el
 * descendente, la mayoría de las tipografías ocupan ~1.25em. Con
 * `lineHeights.snug` en 1.15 —que es el del titular del hero, y viene del
 * diseño— la caja mide 1.15em y la tinta 1.25em, así que sobresale ~0.05em por
 * arriba y por abajo, y la máscara se lo come.
 *
 * Se nota en las colas de la `g`, la `y` y la `p`, y en los acentos de las
 * mayúsculas. En Figma no pasa porque ahí no hay recorte de ningún tipo.
 *
 * Medido con un caso forzado: la máscara comía tinta, y con esto vuelve entera.
 */
const MASK_ROOM = '0.12em';

type MaskedSplit = { lines: ArrayLike<Element>; masks?: ArrayLike<Element> };

/**
 * Le da aire a las líneas de un `SplitText` con máscara, sin mover el layout.
 *
 * El truco está en dónde va cada cosa. El `padding` va en la **línea**, que es
 * quien define el alto de la máscara: así la máscara crece y deja de recortar.
 * El margen negativo va en la **máscara**, no en la línea — si fuera en la
 * línea le volvería a bajar el alto a la máscara y estaríamos igual que antes.
 * Puesto en la máscara solo corrige el ritmo vertical hacia afuera, y el bloque
 * termina midiendo exactamente lo mismo que sin el arreglo.
 */
export function roomForDescenders(split: MaskedSplit): void {
  gsap.set(split.lines, { paddingTop: MASK_ROOM, paddingBottom: MASK_ROOM });

  if (split.masks && split.masks.length > 0) {
    gsap.set(split.masks, { marginTop: `-${MASK_ROOM}`, marginBottom: `-${MASK_ROOM}` });
  }
}
