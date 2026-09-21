export const radii = {
  none: '0',
  sm: '0.25rem', // 4
  md: '0.75rem', // 12
  lg: '1rem', // 16 — cards de valor
  xl: '1.375rem', // 22 — bloque de newsletter
  '2xl': '1.75rem', // 28 — imagen del hero
  '3xl': '2.125rem', // 34 — input del newsletter
  '4xl': '3.0625rem', // 49 — cards de Nosotras
  full: '999px',
} as const;

/** Qué radio le toca a cada cosa. Los componentes usan estos, no los primitivos. */
export const semanticRadii = {
  button: radii.full,
  pill: radii.full,
  card: radii.lg,
  panel: radii.xl,
  media: radii['2xl'],
  input: radii['3xl'],
  avatar: radii.full,
  /** Cards grandes de Nosotras (proceso y fundadoras). */
  cardSoft: radii['4xl'],
  /** Tile cuadrado del icono dentro de esas cards. */
  tile: '0.875rem', // 14
} as const;
