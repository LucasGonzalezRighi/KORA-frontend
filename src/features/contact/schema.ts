import { z } from 'zod';

import type { Dictionary } from '@/i18n';

const NAME_MIN = 2;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;

/**
 * Esquema del formulario de contacto.
 *
 * Es una fábrica porque los mensajes de error dependen del idioma. La forma —
 * qué campos hay y qué límites tienen — es la misma en todos los idiomas y en
 * el servidor.
 */
export function createContactSchema(messages: Dictionary['contact']['validation']) {
  return z.object({
    name: z.string().trim().min(NAME_MIN, messages.name).max(80),
    company: z.string().trim().min(NAME_MIN, messages.company).max(120),
    email: z.string().trim().email(messages.email),
    message: z
      .string()
      .trim()
      .min(MESSAGE_MIN, messages.messageShort)
      .max(MESSAGE_MAX, messages.messageLong),
  });
}

/**
 * Versión sin mensajes traducidos, para el Route Handler. El BFF nunca devuelve
 * el texto de zod al cliente — devuelve un código — así que no necesita idioma.
 */
export const contactServerSchema = z.object({
  name: z.string().trim().min(NAME_MIN).max(80),
  company: z.string().trim().min(NAME_MIN).max(120),
  email: z.string().trim().email(),
  message: z.string().trim().min(MESSAGE_MIN).max(MESSAGE_MAX),
});

export type ContactInput = z.infer<typeof contactServerSchema>;
