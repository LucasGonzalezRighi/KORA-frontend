/**
 * Tipografía de Kora 2.0.
 *
 * Dos familias, tal como el diseño de Figma:
 * - **Satoshi** — titulares y cuerpo. Se sirve desde Fontshare (ver `app/layout.tsx`).
 * - **IBM Plex Mono** — eyebrows y etiquetas de sección. Se carga con
 *   `next/font/google`, que la auto-hospeda y expone `--font-plex-mono`.
 *   (Fontshare NO distribuye IBM Plex Mono: pedirla ahí devuelve 200 sin
 *   `@font-face`, y la tipografía cae silenciosamente a la del sistema.)
 */

export const fontFamilies = {
  display: ['Satoshi', 'Satoshi Variable', 'system-ui', 'sans-serif'],
  body: ['Satoshi', 'Satoshi Variable', 'system-ui', 'sans-serif'],
  mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
} as const;

export const fontWeights = {
  light: '300',
  medium: '500',
  bold: '700',
  black: '900',
} as const;

/** Escala fija en px, tomada de los nodos de Figma. */
export const fontSizes = {
  xs: '0.75rem', // 12
  sm: '0.875rem', // 14 — texto de botones
  smd: '0.9375rem', // 15 — "Resultado:" de las cards de proceso, universidad de fundadoras
  base: '1rem', // 16 — nav, inputs
  md: '1.125rem', // 18 — subheading del hero
  lg: '1.25rem', // 20 — cuerpo de cards, labels del form
  xl: '1.5rem', // 24 — títulos de card, newsletter
  '2xl': '1.75rem', // 28 — títulos de sección chicos
  '3xl': '2.25rem', // 36 — título del hero
  '4xl': '2.5rem', // 40 — "Empecemos a trabajar juntos"
  '5xl': '3rem', // 48 — títulos de unidad de negocio
} as const;

/**
 * Escala fluida para los titulares que tienen que respirar en mobile.
 * Los topes son los tamaños exactos del diseño a 1440px.
 */
export const fluidFontSizes = {
  /**
   * Hero: 36px como en Figma, pero encogiendo con la ventana.
   *
   * El titular tiene que cortar en tres renglones exactos —"…startups se" /
   * "…accesible y" / "consultoría inteligente."— y eso depende de que el primer
   * renglón entre entero. A 36px ese renglón mide 773px, y el ancho disponible
   * es aproximadamente `0.82 × ancho de ventana` después de los dos gutters. O
   * sea que por debajo de ~1000px de ventana no entra, y el corte se rompe por
   * más que se toque el `max-width`: el problema es el cuerpo, no la caja.
   *
   * `3.55vw` es el factor que mantiene el corte. Sale de dos condiciones: el
   * primer renglón tiene que entrar, y el segundo NO tiene que tener lugar para
   * "consultoría". Eso deja una ventana de factores válidos, y 3.55 cae adentro
   * tanto si carga Satoshi (donde el renglón mide 773px a 36) como si entra la
   * tipografía de sistema (que es más ancha y mide 818px).
   *
   * Arriba de ~1014px de ventana el `clamp` topa en 36px y el corte pasa a
   * sostenerlo el `max-w-[815px]` del `<h1>`. Abajo de ~660px topa en el mínimo
   * y el título vuelve a partirse solo, que es lo que corresponde en teléfono.
   */
  hero: 'clamp(1.5rem, 3.55vw, 2.25rem)',
  /** Titulares centrados de sección: 48px. */
  sectionTitle: 'clamp(1.875rem, 1.15rem + 3.1vw, 3.25rem)',
  /** Titular en línea tipo "¿Porque las empresas eligen Kora Advisory?": 36px. */
  sectionTitleSm: 'clamp(1.625rem, 1.15rem + 2vw, 2.25rem)',
  /** Títulos de unidad de negocio: 48px. */
  unitTitle: 'clamp(2rem, 1.4rem + 2.6vw, 3rem)',
  /** "Empecemos a trabajar juntos": 40px. */
  contactTitle: 'clamp(1.875rem, 1.3rem + 2.4vw, 2.5rem)',
  /** Eyebrow monoespaciado de sección: 24px. */
  eyebrow: 'clamp(1.125rem, 0.95rem + 0.75vw, 1.5rem)',
  /** Titular de página interior (Nosotras) — 64px en el diseño. */
  pageTitle: 'clamp(2.25rem, 1.4rem + 3.8vw, 4rem)',
  /** Títulos de sección de Nosotras — 52px en el diseño. */
  sectionTitleLg: 'clamp(2rem, 1.35rem + 3vw, 3.25rem)',
} as const;

export const lineHeights = {
  tight: '1.05',
  snug: '1.15',
  heading: '1.2',
  relaxed: '1.3',
  body: '1.45',
  /** Bajadas de hero (Nosotras): 40px sobre 24px en el diseño. */
  loose: '1.65',
} as const;

export const letterSpacings = {
  tighter: '-0.02em',
  tight: '-0.01em',
  normal: '0',
  wide: '0.08em',
} as const;

/**
 * Estilos compuestos. Los componentes deberían usar estos antes que armar
 * combinaciones sueltas de tamaño + peso + tracking.
 */
export const textStyles = {
  hero: {
    fontFamily: fontFamilies.display,
    fontSize: fluidFontSizes.hero,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacings.tight,
  },
  sectionTitle: {
    fontFamily: fontFamilies.display,
    fontSize: fluidFontSizes.sectionTitle,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacings.tight,
  },
  unitTitle: {
    fontFamily: fontFamilies.display,
    fontSize: fluidFontSizes.unitTitle,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tighter,
  },
  cardTitle: {
    fontFamily: fontFamilies.display,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.black,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tighter,
  },
  eyebrow: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacings.tight,
  },
  /** Etiqueta en mayúsculas centrada, tipo "TRES UNIDADES DE NEGOCIO". */
  overline: {
    fontFamily: fontFamilies.display,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacings.wide,
  },
  body: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.body,
    letterSpacing: letterSpacings.tight,
  },
  button: {
    fontFamily: fontFamilies.display,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacings.tight,
  },
} as const;
