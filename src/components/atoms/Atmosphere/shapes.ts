import type { tokens } from '@/design-system';

/**
 * Geometría de las formas de la atmósfera, **copiada del archivo de Figma**
 * (`uJrCta0yOl50LIkAGaW5LQ`, página "Webiste", frames `Colores hero`,
 * `Colores`, `Rectangle 24969` y `glows margenes`).
 *
 * Todas las coordenadas están en el espacio del lienzo de Figma: 1440 de ancho,
 * origen en la esquina superior izquierda de la página. `Atmosphere` las
 * traduce al viewport centrando horizontalmente (`calc(50% + x - 720)`), así
 * las formas se quedan pegadas al contenido en cualquier ancho de pantalla.
 *
 * Los colores no van acá: se referencian por nombre y salen de
 * `tokens.color.atmosphere`. Lo mismo el blur, de `tokens.textures.atmosphereBlur`.
 */

/** Ancho del lienzo de Figma sobre el que están medidas las formas. */
export const CANVAS_WIDTH = 1440;

export type AtmosphereColor = keyof typeof tokens.color.atmosphere;
export type AtmosphereBlur = keyof typeof tokens.textures.atmosphereBlur;

/** Caja de una forma en el lienzo, en px. */
export type CanvasBox = {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
};

/**
 * Respecto de qué se posiciona la forma en horizontal.
 *
 * - `center`: relativa al centro del lienzo, como el contenido. Para las
 *   formas del hero, que acompañan a la tarjeta.
 * - `left` / `right`: relativa al borde del viewport. Para los glows de
 *   margen: en Figma están pegados a los costados del lienzo de 1440, y en una
 *   pantalla más angosta tienen que seguir asomando por los costados, no
 *   desaparecer fuera de la vista.
 */
export type ShapeAnchor = 'center' | 'left' | 'right';

type ShapeBase = {
  readonly id: string;
  readonly box: CanvasBox;
  readonly anchor?: ShapeAnchor;
  readonly color: AtmosphereColor;
  readonly blur: AtmosphereBlur;
  /** Figma aplica `luminosity` a los blobs durazno. */
  readonly blend?: 'luminosity';
};

export type AtmosphereShape =
  | (ShapeBase & { readonly kind: 'ellipse' })
  | (ShapeBase & { readonly kind: 'rect' })
  | (ShapeBase & {
      readonly kind: 'blob';
      /**
       * Path tal cual lo exporta Figma. Está en un sistema de coordenadas con
       * un margen de `2 × blur` alrededor de la caja (el área que necesita el
       * filtro), así que el `viewBox` se recorta con ese offset.
       */
      readonly path: string;
    });

/**
 * Formas del hero y de la primera pantalla. Se pintan una sola vez, ancladas
 * al tope de la página.
 *
 * Orden = orden de apilado (la primera queda más abajo).
 */
export const HERO_SHAPES: readonly AtmosphereShape[] = [
  // ── `Colores` (251:68) ────────────────────────────────────────────
  {
    id: 'colores-sand',
    kind: 'blob',
    box: { x: -630, y: -332, w: 1330.69, h: 762.15 },
    color: 'sand',
    blur: 'wide',
    path: 'M868.797 1162.15C873.469 1151.89 879.338 1140.7 886.37 1129.04C878.401 1132.91 868.127 1138.32 855.137 1145.56C739.883 1209.81 422.027 824.645 401.537 743.375C381.047 662.105 569.296 742.95 735.348 709.335C901.4 675.721 794.095 637.944 1082.66 485.617C1371.22 333.289 1364.39 407.751 1601.73 526.464C1791.6 621.435 1730.64 750.984 1676.43 803.887C1613.11 897.496 1436.87 1065.74 1238.46 989.829C1062.92 922.667 940.367 1039.53 886.37 1129.04C934.966 1105.45 897.891 1139 868.797 1162.15Z',
  },
  {
    id: 'colores-peach',
    kind: 'blob',
    box: { x: 572.63, y: 412.15, w: 1202.37, h: 690.88 },
    color: 'peach',
    blur: 'wide',
    blend: 'luminosity',
    path: 'M823.591 1090.88C827.813 1081.58 833.116 1071.43 839.47 1060.87C832.269 1064.37 822.986 1069.28 811.249 1075.84C707.108 1134.08 419.903 784.934 401.389 711.265C382.875 637.595 552.971 710.879 703.011 680.408C853.05 649.937 756.093 615.693 1016.83 477.61C1277.57 339.528 1271.4 407.026 1485.85 514.638C1657.41 600.728 1602.33 718.162 1553.35 766.118C1496.13 850.974 1336.89 1003.48 1157.61 934.672C998.992 873.79 888.26 979.723 839.47 1060.87C883.38 1039.48 849.88 1069.9 823.591 1090.88Z',
  },
  // ── `Colores hero` (251:74) ───────────────────────────────────────
  {
    id: 'hero-sand',
    kind: 'blob',
    box: { x: -881, y: -455, w: 1725, h: 988 },
    color: 'sand',
    blur: 'wide',
    path: 'M1007.71 1388C1013.77 1374.7 1021.38 1360.19 1030.49 1345.08C1020.16 1350.09 1006.84 1357.1 990.005 1366.49C840.598 1449.78 428.554 950.477 401.992 845.125C375.431 739.774 619.463 844.574 834.72 800.999C1049.98 757.424 910.875 708.453 1284.95 510.987C1659.02 313.521 1650.16 410.048 1957.83 563.939C2203.97 687.051 2124.95 854.989 2054.67 923.569C1972.59 1044.92 1744.12 1263.01 1486.92 1164.61C1259.35 1077.55 1100.49 1229.04 1030.49 1345.08C1093.49 1314.49 1045.43 1357.99 1007.71 1388Z',
  },
  {
    id: 'hero-peach',
    kind: 'blob',
    box: { x: 678, y: 517, w: 1558.66, h: 895.61 },
    color: 'peach',
    blur: 'wide',
    blend: 'luminosity',
    path: 'M949.112 1295.61C954.584 1283.55 961.459 1270.4 969.695 1256.7C960.361 1261.25 948.328 1267.6 933.112 1276.11C798.112 1351.61 425.8 899 401.8 803.5C377.8 708 598.3 803 792.8 763.5C987.3 724 861.612 679.608 1199.61 500.608C1537.61 321.608 1529.61 409.108 1807.61 548.608C2030.01 660.208 1958.61 812.441 1895.11 874.608C1820.95 984.608 1614.51 1182.31 1382.11 1093.11C1176.49 1014.19 1032.94 1151.51 969.695 1256.7C1026.62 1228.97 983.19 1268.4 949.112 1295.61Z',
  },
  {
    id: 'hero-amber',
    kind: 'ellipse',
    box: { x: 844, y: 397, w: 903, h: 664 },
    color: 'amberSoft',
    blur: 'wide',
  },
  // ── `Rectangle 24969` (273:433): banda detrás de la primera fila de cards ──
  {
    id: 'band',
    kind: 'rect',
    box: { x: -84, y: 868, w: 1639, h: 571 },
    color: 'band',
    blur: 'soft',
  },
];

/**
 * `glows margenes` (433:352): manchas alternadas en los costados, tibias y
 * frías. En Figma cubren del `y=1758` al `y=4297`; acá el patrón se repite
 * hacia abajo hasta llegar al bloque de contacto, para que la atmósfera
 * acompañe toda la página y no solo la primera mitad.
 *
 * Las `y` son relativas al inicio del patrón.
 */
export const MARGIN_PATTERN = {
  /** Dónde arranca la primera repetición, en px desde el tope. */
  top: 1758,
  /** Alto de una repetición. */
  height: 2539,
  shapes: [
    {
      id: 'margin-right-amber',
      kind: 'rect',
      anchor: 'right',
      box: { x: 1219, y: 0, w: 377, h: 781 },
      color: 'marginAmber',
      blur: 'soft',
    },
    {
      id: 'margin-left-steel',
      kind: 'rect',
      anchor: 'left',
      box: { x: -211, y: 394, w: 377, h: 673 },
      color: 'marginSteel',
      blur: 'medium',
    },
    {
      id: 'margin-right-steel',
      kind: 'rect',
      anchor: 'right',
      box: { x: 1208, y: 1600, w: 377, h: 939 },
      color: 'marginSteelSoft',
      blur: 'medium',
    },
    {
      id: 'margin-left-sheer-low',
      kind: 'rect',
      anchor: 'left',
      box: { x: -301, y: 1134, w: 377, h: 673 },
      color: 'marginSheer',
      blur: 'soft',
    },
    {
      id: 'margin-left-sheer-high',
      kind: 'rect',
      anchor: 'left',
      box: { x: -290, y: 744, w: 377, h: 738 },
      color: 'marginSheer',
      blur: 'soft',
    },
    {
      id: 'margin-right-sheer',
      kind: 'rect',
      anchor: 'right',
      box: { x: 1178, y: 509, w: 377, h: 673 },
      color: 'marginSheerSoft',
      blur: 'soft',
    },
  ] as readonly AtmosphereShape[],
} as const;

/**
 * Alto reservado al final de la página donde el patrón de márgenes ya no se
 * repite: es el bloque de contacto, que es oscuro y tiene sus propios glows.
 */
export const FOOTER_RESERVE = 720;
