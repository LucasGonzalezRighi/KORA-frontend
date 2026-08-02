/**
 * Paleta de Kora 2.0.
 *
 * Capa 1 — primitivos: los valores crudos extraídos del archivo de Figma
 * (`SGHzsJS717mdR0z1P5MKEF`, página "Webiste"). Solo cambian si se redefine la marca.
 * Capa 2 — semánticos: qué significa cada color en uso. Es lo que consumen los componentes.
 *
 * Ningún componente debe importar `colorPrimitives` directamente.
 */

export const colorPrimitives = {
  /** Azul casi negro de la marca — titulares, botones sólidos, bloque de contacto. */
  ink: {
    900: '#081422',
    800: '#0d1a2b',
    700: '#222c39',
    600: '#3a3f45',
    500: '#4f5661',
  },
  /** Ámbar quemado: el acento de la marca. */
  amber: {
    700: '#a3551a',
    600: '#c46a1f',
    500: '#e08a3c',
    400: '#ffb882',
    300: '#fbd9bd',
    200: '#f8efe4',
    100: '#fff3e8',
  },
  /**
   * Lienzo. La base es un casi-blanco **frío** — es el color que rodea a la
   * tarjeta del hero en el diseño. Todo el calor viene de los glows, no del
   * color base: si se tiñe la base de durazno, la página entera queda naranja.
   */
  canvas: {
    base: '#f7f6f5',
    warm: '#fdf1e6',
    peach: '#fbe4d2',
  },
  /** Azul claro: único acento frío, usado sobre fondo oscuro. */
  sky: {
    300: '#afcbe3',
    200: '#c9dced',
  },
  neutral: {
    white: '#ffffff',
    300: '#cecece',
    200: '#e5e5e5',
  },
  /** Tintes de los círculos de icono de las cards de valor — alternan. */
  steel: {
    wash: 'rgba(48, 91, 126, 0.2)',
  },
  /** Crema casi blanco del círculo de icono par. */
  iconCream: '#fff9f6',
  /**
   * El borde de las cards en Figma es `#c46a1f` a 0.401px. A 1px de navegador
   * ese naranja se ve mucho más fuerte de lo que muestra el diseño, así que se
   * compensa con alfa en vez de con sub-píxeles (que cada navegador redondea
   * distinto).
   */
  cardHairline: 'rgba(196, 106, 31, 0.38)',
  /** Durazno translúcido del CTA "Hablemos" del hero. */
  peachWash: 'rgba(251, 217, 189, 0.6)',
} as const;

export const semanticColors = {
  bg: {
    /** Fondo base de las páginas. */
    canvas: colorPrimitives.canvas.base,
    /** Variante más cálida, para bandas que necesitan separarse del canvas. */
    canvasWarm: colorPrimitives.canvas.warm,
    /** Superficie de las cards. */
    surface: colorPrimitives.neutral.white,
    /** Bloques oscuros: contacto y newsletter. */
    surfaceInverse: colorPrimitives.ink[900],
    /** Inputs dentro de bloques oscuros. */
    inputInverse: colorPrimitives.ink[700],
    /** Relleno suave de acento (CTA "Hablemos", botón "HABLEMOS"). */
    accentWash: colorPrimitives.amber[200],
    /** Relleno durazno translúcido del hero. */
    accentSheer: colorPrimitives.peachWash,
    /** Acento sólido — flecha del newsletter. */
    accentSolid: colorPrimitives.amber[400],
    /**
     * Vidrio esmerilado del nav al scrollear.
     *
     * La opacidad es baja a propósito: el efecto de vidrio lo hace el
     * `backdrop-filter`, no el relleno. Si se sube la opacidad para "que se lea
     * mejor", deja de ser vidrio y vuelve a ser una barra blanca.
     */
    glass: 'rgba(250, 249, 248, 0.55)',
    /** Círculo de los iconos de las cards de valor — impares. */
    iconWash: colorPrimitives.steel.wash,
    /** Círculo de los iconos de las cards de valor — pares. */
    iconWashWarm: colorPrimitives.iconCream,
  },
  text: {
    heading: colorPrimitives.ink[900],
    body: colorPrimitives.ink[600],
    /** Eyebrows y marcas de acento. */
    accent: colorPrimitives.amber[600],
    onInverse: colorPrimitives.neutral.white,
    onInverseMuted: colorPrimitives.neutral[300],
    /** Palabra resaltada dentro de titulares sobre fondo oscuro ("juntos"). */
    onInverseAccent: colorPrimitives.sky[300],
    placeholder: colorPrimitives.ink[500],
  },
  accent: {
    primary: colorPrimitives.amber[600],
    soft: colorPrimitives.amber[400],
    wash: colorPrimitives.amber[200],
  },
  border: {
    /** Borde apenas visible sobre canvas — píldora de idioma del nav. */
    subtle: colorPrimitives.amber[100],
    /** Borde ámbar fino de las cards. */
    card: colorPrimitives.cardHairline,
    /** Contorno de botones outline. */
    ink: colorPrimitives.ink[900],
    /** Bordes dentro de bloques oscuros. */
    inverse: colorPrimitives.ink[500],
    /**
     * Filo inferior del nav de vidrio. Un vidrio sin borde se ve como una
     * mancha borrosa; el filo es lo que le da canto y lo separa del contenido.
     */
    glass: 'rgba(255, 255, 255, 0.55)',
    /** Línea divisoria de inputs y acordeones. */
    hairline: 'rgba(8, 20, 34, 0.18)',
    hairlineInverse: 'rgba(255, 255, 255, 0.35)',
  },
  /**
   * Gradientes cálidos de fondo — los "glows" del diseño.
   *
   * En Figma son elipses sueltas con blur, sembradas a lo largo del frame
   * (`glow de color Izq/Derecha`, `Glow end of page`). Acá se reconstruyen como
   * capas de un solo `background-image` sobre el body, más glows puntuales por
   * sección.
   */
  glow: {
    /**
     * Capas de ambiente que pinta el body de punta a punta. Las posiciones
     * verticales siguen a las elipses del frame de Figma (7983px de alto):
     * el hero termina al 12%, la banda cálida va del 12% al 32%, los glows
     * laterales entre 29% y 48%, y hay uno más antes de las FAQs.
     */
    page: [
      'radial-gradient(1200px 780px at 50% 21%, rgba(250, 196, 152, 0.42) 0%, rgba(247, 246, 245, 0) 62%)',
      'radial-gradient(900px 520px at 93% 1%, rgba(251, 217, 189, 0.40) 0%, rgba(247, 246, 245, 0) 58%)',
      'radial-gradient(560px 720px at -5% 34%, rgba(255, 184, 130, 0.30) 0%, rgba(247, 246, 245, 0) 62%)',
      'radial-gradient(560px 720px at 105% 37%, rgba(255, 184, 130, 0.26) 0%, rgba(247, 246, 245, 0) 62%)',
      'radial-gradient(560px 780px at -5% 47%, rgba(255, 184, 130, 0.24) 0%, rgba(247, 246, 245, 0) 62%)',
      'radial-gradient(1100px 460px at 45% 79%, rgba(251, 217, 189, 0.34) 0%, rgba(247, 246, 245, 0) 65%)',
    ].join(', '),
    sectionLeft:
      'radial-gradient(46% 58% at -6% 50%, rgba(255, 184, 130, 0.32) 0%, rgba(247, 246, 245, 0) 68%)',
    sectionRight:
      'radial-gradient(46% 58% at 106% 50%, rgba(255, 184, 130, 0.32) 0%, rgba(247, 246, 245, 0) 68%)',
    /**
     * Halo ámbar del bloque de contacto. El centro sale de dos CSS variables
     * que actualiza `usePointerGlow`; sin JS (o en touch) usa los valores por
     * defecto, que son la posición del diseño.
     */
    contactAmber:
      'radial-gradient(70% 90% at var(--kora-pointer-x, 72%) var(--kora-pointer-y, 100%), rgba(196, 106, 31, 0.85) 0%, rgba(8, 20, 34, 0) 70%)',
    contactSteel:
      'radial-gradient(55% 80% at 8% 100%, rgba(175, 203, 227, 0.35) 0%, rgba(8, 20, 34, 0) 70%)',
  },
} as const;

export type SemanticColors = typeof semanticColors;
