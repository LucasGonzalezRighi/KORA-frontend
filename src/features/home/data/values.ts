import { LayoutDashboard, PencilRuler, createLucideIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Las seis cards de "¿Por qué eligen Kora?".
 *
 * Acá vive solo lo que **no** se traduce: el orden y el icono. Los textos salen
 * del diccionario del idioma activo, indexados por estos mismos ids.
 */
export const VALUE_CARD_IDS = [
  'entendemos',
  'ordenamos',
  'digital',
  'automatizamos',
  'visibilidad',
  'autonomia',
] as const;

export type ValueCardId = (typeof VALUE_CARD_IDS)[number];

/*
  Cuatro de los seis íconos del diseño no existen en lucide, así que se dibujan
  acá con `createLucideIcon`: misma grilla de 24, mismo tipo. Para `ValueCard`
  son un `LucideIcon` más — no hace falta un caso aparte.
*/

/**
 * Globo con meridiano y paralelos curvos, en trazo grueso.
 *
 * El trazo va fijado acá (2.25) y no en la card, porque es el único de los
 * seis que en el diseño se ve más pesado que el resto. Los demás toman el
 * `strokeWidth` que les pasa `ValueCard`.
 */
const GLOBE_STROKE = '2.25';

const GlobeBold = createLucideIcon('GlobeBold', [
  ['circle', { cx: '12', cy: '12', r: '10', strokeWidth: GLOBE_STROKE, key: 'esfera' }],
  ['ellipse', { cx: '12', cy: '12', rx: '4.5', ry: '10', strokeWidth: GLOBE_STROKE, key: 'meridiano' }],
  ['path', { d: 'M3.34 7Q12 9.4 20.66 7', strokeWidth: GLOBE_STROKE, key: 'paralelo-norte' }],
  ['path', { d: 'M3.34 17Q12 14.6 20.66 17', strokeWidth: GLOBE_STROKE, key: 'paralelo-sur' }],
]);

/** Reloj con un tilde abajo a la derecha: el tiempo, ordenado. */
const ClockCheck = createLucideIcon('ClockCheck', [
  ['path', { d: 'M12 6v6l3.5 2', key: 'manecillas' }],
  ['path', { d: 'M12.338 21.994A10 10 0 1 1 21.925 13.12', key: 'esfera' }],
  ['path', { d: 'm16 19 2 2 4-4', key: 'tilde' }],
]);

/** Tres personas: dos atrás y una adelante. */
const UsersThree = createLucideIcon('UsersThree', [
  ['circle', { cx: '7', cy: '6', r: '2.5', key: 'cabeza-izq' }],
  ['circle', { cx: '17', cy: '6', r: '2.5', key: 'cabeza-der' }],
  ['circle', { cx: '12', cy: '12', r: '3', key: 'cabeza-centro' }],
  ['path', { d: 'M3 16a4 4 0 0 1 3.5-4', key: 'cuerpo-izq' }],
  ['path', { d: 'M21 16a4 4 0 0 0-3.5-4', key: 'cuerpo-der' }],
  ['path', { d: 'M6 21v-1a6 6 0 0 1 12 0v1', key: 'cuerpo-centro' }],
]);

/** Globo con un pin abajo a la derecha: visibilidad de todo, en cualquier lado. */
const GlobePin = createLucideIcon('GlobePin', [
  ['path', { d: 'M20.972 11.291a9 9 0 1 0-8.322 9.686', key: 'globo' }],
  ['path', { d: 'M3.6 9h16.8', key: 'paralelo-norte' }],
  ['path', { d: 'M3.6 15h8.9', key: 'paralelo-sur' }],
  ['path', { d: 'M11.5 3a17 17 0 0 0 0 18', key: 'meridiano-izq' }],
  ['path', { d: 'M12.5 3a17 17 0 0 1 4.283 9', key: 'meridiano-der' }],
  [
    'path',
    {
      d: 'M21.121 20.121a3 3 0 1 0-4.242 0c.418.419 1.125 1.045 2.121 1.879 1.051-.89 1.759-1.516 2.121-1.879z',
      key: 'pin',
    },
  ],
  ['path', { d: 'M19 18v.01', key: 'pin-centro' }],
]);

export const VALUE_CARD_ICONS: Record<ValueCardId, LucideIcon> = {
  entendemos: GlobeBold,
  ordenamos: ClockCheck,
  digital: UsersThree,
  automatizamos: PencilRuler,
  visibilidad: GlobePin,
  autonomia: LayoutDashboard,
};
