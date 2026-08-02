/**
 * Espaciado. La escala primitiva es la de Tailwind (no la redefinimos);
 * acá viven los valores semánticos y los anchos de contenedor del diseño.
 */

export const semanticSpacing = {
  /** Padding vertical de una sección de la landing. */
  sectionY: 'clamp(4rem, 2.5rem + 6vw, 7.5rem)',
  /** Padding vertical de una sección compacta. */
  sectionYTight: 'clamp(2.5rem, 1.75rem + 3.5vw, 4.5rem)',
  /** Padding horizontal del contenedor en mobile. */
  gutter: 'clamp(1.25rem, 0.5rem + 3vw, 3rem)',
  /** Separación entre el eyebrow y el título de una sección. */
  headingGap: '1.5rem',
  /** Separación entre cards de una grilla. */
  cardGap: '1.5rem',
  /** Padding interno de las cards. */
  cardPadding: '1.5rem',
  /** Margen superior de la tarjeta del hero respecto del borde de la página. */
  heroCardInset: '2.75rem',
  /**
   * Padding lateral **dentro** de la tarjeta del hero. Lo comparten el nav y el
   * texto del hero: es lo que hace que el logo quede a plomo con el `h1`.
   *
   * En Figma la tarjeta arranca en `x=44` y el nav en `x=116` → 72px adentro.
   * `5vw` da exactamente 72px a 1440.
   */
  cardGutter: 'clamp(1.5rem, 5vw, 4.5rem)',
  /**
   * Cuánto baja el nav en reposo para caer **dentro** de la tarjeta del hero.
   *
   * Se expresa como "borde de la tarjeta + N" en vez de un valor absoluto, así
   * el nav sigue cayendo adentro aunque cambie el margen de la tarjeta.
   * En Figma la tarjeta arranca en `y=45` y el nav en `y=109`: 64px adentro,
   * que es el tope de la parte variable.
   */
  navRestOffset: 'calc(2.75rem + clamp(1rem, 4.4vw, 4rem))',
} as const;

/**
 * Anchos máximos. El diseño de Figma está sobre un lienzo de 1440 con el
 * contenido a 1220 (nav) / 1235 (blog) — se normaliza a 1240.
 */
export const containers = {
  /** Ancho por defecto del contenido. */
  default: '77.5rem', // 1240
  /** Bloques de texto que no deberían pasar de ~800px. */
  narrow: '50rem', // 800
  /** Ancho del nav — igual al default para que el logo alinee con el contenido. */
  nav: '77.5rem',
  /** Ancho del bloque de contacto oscuro. */
  wide: '90rem', // 1440
} as const;
