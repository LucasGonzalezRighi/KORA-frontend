import type { Config } from 'tailwindcss';

import { koraPreset } from './src/design-system/tailwind.preset';

/**
 * La configuración visual NO vive acá — vive en el preset, que se alimenta de
 * los tokens de `src/design-system/tokens`. Este archivo solo declara qué
 * archivos escanear.
 */
const config: Config = {
  presets: [koraPreset],
  content: ['./src/**/*.{ts,tsx}'],
};

export default config;
