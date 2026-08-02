/**
 * Texturas del design system.
 *
 * El grano se genera con `feTurbulence` en un SVG embebido en vez de usar una
 * imagen: pesa ~300 bytes en lugar de decenas de KB, no necesita otra petición
 * y se puede recolorear con `mix-blend-mode`.
 *
 * La intensidad sale de medir la capa `ruido` del diseño de Figma (nodo
 * `1:1369`): la desviación de luminancia ahí es de ~1.55 sobre 255, o sea
 * ~0.6%. Es textura de película, no ruido visible — si se llega a *notar* el
 * grano, está mal calibrado.
 */

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>" +
  "<filter id='g'>" +
  "<feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>" +
  '</filter>' +
  "<rect width='140' height='140' filter='url(%23g)'/>" +
  '</svg>';

export const textures = {
  /** Data URI listo para `background-image`. */
  grain: `url("data:image/svg+xml,${GRAIN_SVG}")`,
  /** Tamaño del mosaico. Chico y repetido, para que no se lea el patrón. */
  grainSize: '140px',
  /** Opacidad sobre superficies oscuras. */
  grainOpacityDark: 0.06,
} as const;
