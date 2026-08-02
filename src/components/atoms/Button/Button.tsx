import { buttonClasses } from './Button.styles';
import type { ButtonProps } from './Button.types';

export function Button({
  variant = 'outline',
  size = 'md',
  trailingIcon,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      {trailingIcon}
    </button>
  );
}
