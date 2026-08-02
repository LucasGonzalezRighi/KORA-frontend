import { CircleDot } from 'lucide-react';
import type { ReactNode } from 'react';

/** Bullet de las unidades de negocio: círculo relleno + texto. */
export function BulletItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <CircleDot aria-hidden className="mt-1 size-6 shrink-0 text-heading" />
      <span className="font-display text-lg leading-body tracking-tight text-heading">
        {children}
      </span>
    </li>
  );
}
