import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { DEFAULT_LOCALE, LOCALE_CODES } from '@/i18n/config';

/**
 * Redirige cualquier ruta sin prefijo de idioma al idioma que corresponda:
 * el que pide el navegador si lo tenemos, si no el default.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALE_CODES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  const locale = resolvePreferredLocale(request.headers.get('accept-language'));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(url);
}

/** Primera coincidencia del `Accept-Language` con un idioma soportado. */
function resolvePreferredLocale(header: string | null): string {
  if (!header) return DEFAULT_LOCALE;

  const requested = header
    .split(',')
    .map((part) => part.split(';')[0]?.trim().slice(0, 2).toLowerCase())
    .filter((code): code is string => Boolean(code));

  return (
    requested.find((code) => (LOCALE_CODES as readonly string[]).includes(code)) ?? DEFAULT_LOCALE
  );
}

export const config = {
  /** Todo menos assets, rutas internas de Next y el BFF. */
  matcher: ['/((?!api|_next|brand|images|favicon.ico|robots.txt|sitemap.xml).*)'],
};
