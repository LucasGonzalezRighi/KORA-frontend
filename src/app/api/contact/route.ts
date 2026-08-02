import { NextResponse } from 'next/server';

import { ROUTES_BACKEND } from '@/constants/routes.backend';
import { contactServerSchema } from '@/features/contact/schema';
import { createBackendClient } from '@/lib/axios';

/**
 * BFF del formulario de contacto.
 *
 * Valida del lado del servidor (no confía en el navegador) y reenvía al backend
 * NestJS. Si todavía no hay backend configurado, responde 202 y deja el mensaje
 * en el log — así el formulario es usable antes de que exista `kora_api`.
 */
export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const parsed = contactServerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: 'VALIDATION_ERROR', message: 'Los datos del formulario no son válidos.' },
      { status: 400 },
    );
  }

  if (!process.env.BACKEND_URL) {
    console.warn('[contact] BACKEND_URL no configurada — mensaje recibido pero no reenviado.');
    return NextResponse.json({ ok: true, code: 'QUEUED_LOCALLY' }, { status: 202 });
  }

  try {
    await createBackendClient().post(ROUTES_BACKEND.contact, parsed.data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, code: 'BACKEND_ERROR', message: 'No pudimos registrar tu mensaje.' },
      { status: 502 },
    );
  }
}
