import type { SVGProps } from 'react';

/**
 * El cohete de la card "Compromiso", con el trazo del diseño: cuerpo en
 * diagonal, ventanilla redonda y la estela abajo a la izquierda. El de lucide
 * tiene otra silueta (sin ventanilla, con aletas), por eso no se usa ahí.
 */
export function RocketIcon({ strokeWidth = 1.75, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M4 13a8 8 0 0 1 7 7 6 6 0 0 0 3-5 9 9 0 0 0 6-8 3 3 0 0 0-3-3 9 9 0 0 0-8 6 6 6 0 0 0-5 3" />
      <path d="M7 14a6 6 0 0 0-3 6 6 6 0 0 0 6-3" />
      <circle cx="15" cy="9" r="1" />
    </svg>
  );
}
