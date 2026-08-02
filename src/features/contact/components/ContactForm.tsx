'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/atoms/Button';
import { Magnetic } from '@/components/atoms/Magnetic';
import { UnderlineInput, UnderlineTextarea } from '@/components/atoms/UnderlineField';
import type { Dictionary } from '@/i18n';

import { type ContactInput, createContactSchema } from '../schema';
import { sendContactMessage } from '../services/contact.service';

/** Formulario del bloque oscuro de contacto. */
export function ContactForm({ dict }: { dict: Dictionary['contact'] }) {
  const schema = useMemo(() => createContactSchema(dict.validation), [dict.validation]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await sendContactMessage(values);
      toast.success(dict.success);
      reset();
    } catch {
      toast.error(dict.error);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-12">
      <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-16">
        <UnderlineInput
          label={dict.fieldName}
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <UnderlineInput
          label={dict.fieldCompany}
          autoComplete="organization"
          error={errors.company?.message}
          {...register('company')}
        />
      </div>

      <UnderlineInput
        label={dict.fieldEmail}
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <UnderlineTextarea
        label={dict.fieldMessage}
        rows={3}
        error={errors.message?.message}
        {...register('message')}
      />

      <Magnetic className="self-start">
        <Button
          type="submit"
          variant="wash"
          size="md"
          disabled={isSubmitting}
          className="uppercase"
          trailingIcon={<ArrowUpRight aria-hidden className="size-5" />}
        >
          {isSubmitting ? dict.submitting : dict.submitLabel}
        </Button>
      </Magnetic>
    </form>
  );
}
