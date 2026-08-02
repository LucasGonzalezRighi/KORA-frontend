'use client';

import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

type SharedProps = {
  label: string;
  error?: string;
  className?: string;
};

type InputProps = SharedProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;
type TextareaProps = SharedProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>;

/**
 * La línea que se dibuja al enfocar es un pseudo-elemento con `scale-x`, no una
 * animación de GSAP: es una micro-interacción de 300 ms atada a `:focus-within`,
 * y para eso CSS es más liviano y más robusto que montar una timeline. GSAP se
 * reserva para lo que necesita coordinación o scroll.
 */
const FIELD_WRAPPER =
  'relative after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left ' +
  'after:scale-x-0 after:bg-accent-soft after:transition-transform after:duration-300 ' +
  'after:ease-out after:content-[""] focus-within:after:scale-x-100';

const FIELD_BASE =
  'w-full border-0 border-b border-hairline-inverse bg-transparent pb-3 pt-2 ' +
  'font-display text-lg text-on-inverse placeholder:text-on-inverse-muted/60 ' +
  'transition-colors duration-200 ease-out focus:outline-none';

const LABEL_BASE = 'font-display text-lg tracking-tight text-on-inverse';

/**
 * Campo del formulario de contacto: label arriba y una línea fina abajo,
 * sobre el bloque oscuro. No tiene caja — la línea es el input.
 */
export const UnderlineInput = forwardRef<HTMLInputElement, InputProps>(function UnderlineInput(
  { label, error, className, id, ...rest },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div className={cn('flex w-full flex-col gap-6', FIELD_WRAPPER, className)}>
      <label htmlFor={fieldId} className={LABEL_BASE}>
        {label}
      </label>
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(FIELD_BASE, error && 'border-accent-soft')}
        {...rest}
      />
      {error ? (
        <p id={errorId} className="-mt-4 font-display text-sm text-accent-soft">
          {error}
        </p>
      ) : null}
    </div>
  );
});

export const UnderlineTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function UnderlineTextarea({ label, error, className, id, rows = 3, ...rest }, ref) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const errorId = `${fieldId}-error`;

    return (
      <div className={cn('flex w-full flex-col gap-6', FIELD_WRAPPER, className)}>
        <label htmlFor={fieldId} className={LABEL_BASE}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(FIELD_BASE, 'resize-none', error && 'border-accent-soft')}
          {...rest}
        />
        {error ? (
          <p id={errorId} className="-mt-4 font-display text-sm text-accent-soft">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
