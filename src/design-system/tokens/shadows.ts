/**
 * Sombras. El diseño usa sombras muy suaves y ligeramente cálidas —
 * nada de negro puro, siempre con tinte del ámbar de la marca.
 */

export const shadows = {
  none: 'none',
  /** Estado de reposo de las cards. */
  cardRest: '0 1px 2px 0 rgba(8, 20, 34, 0.04), 0 8px 24px -12px rgba(163, 85, 26, 0.18)',
  /** Hover de las cards — se levanta y se entibia. */
  cardHover: '0 2px 4px 0 rgba(8, 20, 34, 0.05), 0 18px 40px -16px rgba(196, 106, 31, 0.32)',
  /** Bloques oscuros (newsletter, contacto). */
  panel: '0 24px 60px -28px rgba(8, 20, 34, 0.45)',
  /**
   * Nav de vidrio al scrollear. El `inset` de arriba simula el brillo del canto
   * superior del cristal; sin él, el vidrio se ve plano.
   */
  nav:
    'inset 0 1px 0 0 rgba(255, 255, 255, 0.6), 0 1px 0 0 rgba(8, 20, 34, 0.05), ' +
    '0 16px 40px -24px rgba(8, 20, 34, 0.28)',
  /** Halo del botón de acento. */
  accentGlow: '0 10px 28px -12px rgba(196, 106, 31, 0.55)',
  /** Anillo de foco accesible. */
  focusRing: '0 0 0 3px rgba(196, 106, 31, 0.35)',
} as const;
