import { NextResponse } from 'next/server';
import { z } from 'zod';

import { ROUTES_BACKEND } from '@/constants/routes.backend';
import { createBackendClient } from '@/lib/axios';

const newsletterSchema = z.object({
  email: z.string().trim().email(),
});

/** BFF de la suscripción al newsletter. Mismo contrato que `/api/contact`. */
export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: 'VALIDATION_ERROR', message: 'El email no es válido.' },
      { status: 400 },
    );
  }

  if (!process.env.BACKEND_URL) {
    console.warn('[newsletter] BACKEND_URL no configurada — suscripción no reenviada.');
    return NextResponse.json({ ok: true, code: 'QUEUED_LOCALLY' }, { status: 202 });
  }

  try {
    await createBackendClient().post(ROUTES_BACKEND.newsletter, parsed.data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, code: 'BACKEND_ERROR', message: 'No pudimos registrar tu suscripción.' },
      { status: 502 },
    );
  }
}
