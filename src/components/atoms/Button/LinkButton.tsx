import Link from 'next/link';

import { buttonClasses } from './Button.styles';
import type { LinkButtonProps } from './Button.types';

export function LinkButton({
  variant = 'outline',
  size = 'md',
  trailingIcon,
  children,
  className,
  href,
  ...rest
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      {trailingIcon}
    </Link>
  );
}
