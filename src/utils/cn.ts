import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * `tailwind-merge` no conoce las escalas custom del design system. Sin esto
 * clasifica `text-fluid-section` como *color* (su fallback para cualquier
 * `text-*` desconocido) y lo borra en cuanto aparece un `text-heading`
 * después — el titular queda sin tamaño y hereda el del padre.
 *
 * Registrar los grupos hace que `text-<size>` y `text-<color>` convivan y que
 * los conflictos se resuelvan dentro de cada grupo, como corresponde.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'md',
            'fluid-hero',
            'fluid-section',
            'fluid-section-sm',
            'fluid-unit',
            'fluid-contact',
            'fluid-eyebrow',
          ],
        },
      ],
      'text-color': [
        {
          text: [
            'heading',
            'body',
            'accent',
            'accent-soft',
            'on-inverse',
            'on-inverse-muted',
            'on-inverse-accent',
            'placeholder',
          ],
        },
      ],
    },
  },
});

/** Une clases condicionales resolviendo conflictos de Tailwind. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
