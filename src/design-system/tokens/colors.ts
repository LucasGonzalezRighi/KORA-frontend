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
    /** Ámbar medio de las elipses de fondo. Solo se usa difuminado. */
    450: '#e79a4e',
    400: '#ffb882',
    /** Ámbar brillante de los numerales "01." de las cards de proceso. */
    350: '#f4973a',
    /** Naranja vivo de la palabra "kora" en "El equipo detrás de kora." (muestreado del diseño). */
    vivid: '#f07818',
    300: '#fbd9bd',
    200: '#f8efe4',
    100: '#fff3e8',
  },
  /** Arena: los blobs grandes del hero. Solo se usa difuminado. */
  sand: '#e9c39d',
  /** Duraznos de las cards de Nosotras: superficie, borde y tile de icono. */
  peach: {
    surface: '#fffdfa',
    border: '#f2dbc5',
    tile: '#fef1e6',
    tileBorder: '#fddfc7',
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
  /** Azul acero: tinte frío de los iconos de card y de los glows de margen. */
  steel: {
    /** Azul acero de los íconos de las cards impares. */
    ink: '#305b7e',
    wash: 'rgba(48, 91, 126, 0.2)',
    border: 'rgba(48, 91, 126, 0.6)',
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
    /**
     * Vidrio de los paneles que **contienen texto**, como el bloque del hero
     * en mobile.
     *
     * Más opaco que el del nav a propósito: el nav solo lleva etiquetas cortas
     * sobre una zona clara, mientras que acá hay un titular largo que se apoya
     * sobre el casco oscuro. Con 0.55 el texto pierde contraste; con 0.74 se
     * lee siempre y la figura se sigue viendo por detrás.
     */
    glassPanel: 'rgba(250, 249, 248, 0.74)',
    /** Círculo de los iconos de las cards de valor — impares. */
    iconWash: colorPrimitives.steel.wash,
    /** Círculo de los iconos de las cards de valor — pares. */
    iconWashWarm: colorPrimitives.iconCream,
    /** Cards de Nosotras: blanco apenas entibiado. */
    surfaceWarm: colorPrimitives.peach.surface,
    /** Tile cuadrado del icono en las cards de Nosotras. */
    tile: colorPrimitives.peach.tile,
    /** Tile frío — la card "Implementación" alterna a acero. */
    tileCool: colorPrimitives.steel.wash,
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
    /** Ícono de las cards de valor impares: azul acero sobre el círculo azulado. */
    iconCool: colorPrimitives.steel.ink,
    /** Ícono de las cards de valor pares: ámbar claro sobre el círculo crema. */
    iconWarm: colorPrimitives.amber[500],
    /** Numerales "01." de las cards de proceso. */
    accentBright: colorPrimitives.amber[350],
    /** Palabra resaltada en naranja vivo dentro de un titular ("kora"). */
    accentVivid: colorPrimitives.amber.vivid,
    /** Rol y universidad de las fundadoras, y el numeral de la card fría. */
    steel: colorPrimitives.steel.ink,
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
    /** Borde durazno de las cards de Nosotras (proceso, fundadoras, valores). */
    peach: colorPrimitives.peach.border,
    /** Borde del tile de icono. */
    tile: colorPrimitives.peach.tileBorder,
    /** Borde del tile frío. */
    tileCool: colorPrimitives.steel.border,
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
   * Colores de la **atmósfera**: las formas difuminadas que bañan el fondo de
   * toda la página en Figma (`Colores hero`, `Colores`, `glows margenes`).
   *
   * Cada entrada es el `fill` + opacidad exactos de una forma del diseño. Las
   * posiciones, tamaños y radios de blur no van acá — son geometría, y viven en
   * `components/atoms/Atmosphere/shapes.ts`.
   */
  atmosphere: {
    /** Blob arena grande, arriba a la izquierda del hero. */
    sand: 'rgba(233, 195, 157, 0.4)',
    /** Blob durazno que se funde con el arena. */
    peach: 'rgba(255, 184, 130, 0.5)',
    /** Elipse ámbar a la derecha del hero. */
    amberSoft: 'rgba(231, 154, 78, 0.2)',
    /** Banda ámbar detrás de la primera fila de cards. */
    band: 'rgba(196, 106, 31, 0.4)',
    /** Glows de margen — alternan tibio y frío a los costados. */
    marginAmber: 'rgba(196, 106, 31, 0.2)',
    marginSteel: 'rgba(48, 91, 126, 0.4)',
    marginSteelSoft: 'rgba(48, 91, 126, 0.3)',
    marginSheer: 'rgba(251, 217, 189, 0.5)',
    marginSheerSoft: 'rgba(251, 217, 189, 0.3)',
  },
  /**
   * Gradientes cálidos puntuales — los glows por sección y el del contacto.
   *
   * El ambiente general de la página **no** está acá: son las formas de
   * `atmosphere`, que se pintan como capas del DOM en `<Atmosphere>`.
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
    /**
     * Los colores cálidos que van **sobre** la foto del hero.
     *
     * Salen del grupo `Colores hero` del frame de Figma, con sus opacidades
     * tal cual: `E79A4E` al 20%, `E9C39D` al 40%, `FFB881` al 50%.
     *
     * Van acá y no en `page` porque la diferencia es de capa, no de color: los
     * de `page` viven detrás de todo, y la foto del hero es opaca, así que
     * nunca la alcanzan. En Figma este grupo está *encima* de la imagen, y es
     * lo que hace que ahí el hero se lea cálido y acá se leyera gris.
     *
     * La calidez se concentra abajo y a la derecha. Arriba a la izquierda
     * quedan limpios a propósito: es donde va el titular, y ahí cualquier velo
     * le come contraste.
     */
    hero: [
      'radial-gradient(120% 95% at 74% 112%, rgba(255, 184, 129, 0.50) 0%, rgba(255, 184, 129, 0) 60%)',
      'radial-gradient(95% 75% at 110% 22%, rgba(233, 195, 157, 0.40) 0%, rgba(233, 195, 157, 0) 58%)',
      'radial-gradient(105% 85% at 26% 122%, rgba(231, 154, 78, 0.20) 0%, rgba(231, 154, 78, 0) 56%)',
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
