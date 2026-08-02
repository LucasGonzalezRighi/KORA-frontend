import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
  /** Contorno oscuro sobre canvas — "Qué hacemos", "Ver más". */
  | 'outline'
  /** Relleno durazno translúcido con contorno — "Hablemos" del hero. */
  | 'soft'
  /** Sólido oscuro — "Agendar consulta", "Contactanos". */
  | 'solid'
  /** Crema con borde durazno — "HABLEMOS" del bloque de contacto. */
  | 'wash'
  /** Circular de acento — flecha del newsletter. */
  | 'icon';

export type ButtonSize = 'sm' | 'md' | 'lg';

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icono a la derecha del label. */
  trailingIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

export type LinkButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };
