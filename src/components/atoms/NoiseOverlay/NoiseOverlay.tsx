import { tokens } from '@/design-system';
import { cn } from '@/utils/cn';

/**
 * Capa de grano sobre una superficie.
 *
 * En el diseño existe como una capa aparte (`ruido`, nodo `1:1369`) que cubre
 * todo el bloque de contacto. Le saca lo plano al color sólido: sin ella, un
 * `#081422` a pantalla completa se ve digital y muerto.
 *
 * `mix-blend-mode: overlay` hace que el grano aclare y oscurezca alrededor del
 * color de base en vez de imponer un gris encima, que es lo que lo mantiene
 * imperceptible como textura y perceptible como material.
 */
export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 mix-blend-overlay', className)}
      style={{
        backgroundImage: tokens.textures.grain,
        backgroundSize: tokens.textures.grainSize,
        opacity: tokens.textures.grainOpacityDark,
      }}
    />
  );
}
