import { CONTACT_INFO } from '@/constants/site';

/**
 * Las tres fundadoras, en el orden del diseño.
 *
 * Nombres, roles y universidades se traducen y viven en el diccionario. Acá
 * quedan la foto, su encuadre y el perfil.
 *
 * Los perfiles personales de LinkedIn todavía no están definidos: hasta que
 * lleguen, los tres apuntan al perfil de la empresa para no dejar links rotos.
 */
export const FOUNDER_IDS = ['clara', 'lucia', 'luciana'] as const;

export type FounderId = (typeof FOUNDER_IDS)[number];

/**
 * Cómo está encuadrada la foto dentro de la máscara, **medido en Figma**.
 *
 * En el diseño cada imagen es más grande que la máscara y está corrida a mano
 * (`Mask group` con la imagen desplazada): no es un "cover centrado". `scale`
 * es el ancho de la imagen respecto del de la máscara; `x` e `y`, el corrimiento
 * en fracción de la máscara. Las tres están ancladas arriba, que es donde
 * quedan las caras.
 */
export type PhotoFrame = {
  readonly scale: number;
  readonly x: number;
  readonly y: number;
};

export type Founder = {
  readonly photo: string;
  readonly width: number;
  readonly height: number;
  readonly frame: PhotoFrame;
  readonly linkedinUrl: string;
};

export const FOUNDERS: Record<FounderId, Founder> = {
  clara: {
    photo: '/images/team/clara.png',
    width: 726,
    height: 878,
    // Nodo 420:162: imagen de 367.6px sobre máscara de 280, corrida (-36.9, -42.8).
    frame: { scale: 367.6 / 280, x: -36.9 / 280, y: -42.8 / 298 },
    linkedinUrl: CONTACT_INFO.linkedinUrl,
  },
  lucia: {
    photo: '/images/team/lucia.png',
    width: 532,
    height: 806,
    // Nodo 415:141: imagen de 275px sobre máscara de 273, corrida (-2, -4).
    frame: { scale: 275 / 273, x: -2 / 273, y: -4 / 298 },
    linkedinUrl: CONTACT_INFO.linkedinUrl,
  },
  luciana: {
    photo: '/images/team/luciana.png',
    width: 518,
    height: 698,
    // Nodo 420:152: imagen de 309px sobre máscara de 273, corrida (-13, 0).
    frame: { scale: 309 / 273, x: -13 / 273, y: 0 },
    linkedinUrl: CONTACT_INFO.linkedinUrl,
  },
};

/** Proporción de la máscara de la foto en el diseño: 273 × 298. */
export const FOUNDER_PHOTO = { width: 273, height: 298 } as const;
