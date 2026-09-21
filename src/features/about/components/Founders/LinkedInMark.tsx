/**
 * El "in" de LinkedIn suelto, sin el cuadrado — así está en las cards de
 * fundadoras del diseño. Toma el color del texto del padre (`currentColor`).
 */
export function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 26" aria-hidden className={className} fill="currentColor">
      <circle cx="3.4" cy="3.4" r="3.4" />
      <rect x="0.4" y="9" width="6" height="17" rx="0.8" />
      <path d="M10.4 9h5.7v2.4c1-1.7 3-2.9 5.7-2.9 4.3 0 6.2 2.8 6.2 7.5V26h-6v-8.9c0-2.3-.8-3.7-2.9-3.7-2.2 0-3 1.6-3 3.9V26h-5.7z" />
    </svg>
  );
}
