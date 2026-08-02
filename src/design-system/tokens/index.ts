export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radii';
export * from './shadows';
export * from './motion';
export * from './textures';

import { colorPrimitives, semanticColors } from './colors';
import {
  choreography,
  choreographyEase,
  durations,
  easings,
  heroZoom,
  magnetic,
  parallaxDepth,
  reducedMotion,
  revealOffset,
  staggers,
} from './motion';
import { radii, semanticRadii } from './radii';
import { shadows } from './shadows';
import { containers, semanticSpacing } from './spacing';
import { textures } from './textures';
import {
  fluidFontSizes,
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  textStyles,
} from './typography';

/**
 * Objeto único de tokens, para estilos inline y lógica que necesita el valor
 * crudo. En JSX, preferir siempre las clases de Tailwind que expone el preset.
 */
export const tokens = {
  color: semanticColors,
  colorPrimitives,
  font: {
    families: fontFamilies,
    weights: fontWeights,
    sizes: fontSizes,
    fluid: fluidFontSizes,
    lineHeights,
    letterSpacings,
    styles: textStyles,
  },
  space: semanticSpacing,
  containers,
  radii: semanticRadii,
  radiiPrimitives: radii,
  shadows,
  textures,
  motion: {
    durations,
    easings,
    staggers,
    revealOffset,
    reducedMotion,
    parallaxDepth,
    heroZoom,
    magnetic,
    choreography,
    choreographyEase,
  },
} as const;

export type Tokens = typeof tokens;
