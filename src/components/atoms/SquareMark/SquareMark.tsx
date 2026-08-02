import { cn } from '@/utils/cn';

type SquareMarkSize = 'sm' | 'md';

const SIZES: Record<SquareMarkSize, string> = {
  sm: 'size-[13px]',
  md: 'size-[18px]',
};

/**
 * El cuadradito ámbar que marca eyebrows y items de la lista de contacto.
 * Es decorativo: no anuncia nada a lectores de pantalla.
 */
export function SquareMark({
  size = 'md',
  className,
}: {
  size?: SquareMarkSize;
  className?: string;
}) {
  return <span aria-hidden className={cn('block shrink-0 bg-accent', SIZES[size], className)} />;
}
