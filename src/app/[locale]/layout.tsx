import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';

import { AmbientGlow } from '@/components/atoms/AmbientGlow';
import { Nav } from '@/components/organisms/Nav';
import { SITE } from '@/constants/site';
import { LocaleTransitionProvider } from '@/features/locale-transition';
import { HTML_LANG, LOCALE_CODES, getDictionary, isLocale } from '@/i18n';

import '../globals.css';

/** Auto-hospedada por Next en build. Expone la variable que consume el preset. */
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-plex-mono',
  display: 'swap',
});

/** Prerenderiza una versión estática por idioma. */
export function generateStaticParams() {
  return LOCALE_CODES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  return {
    title: {
      default: `${SITE.name} — ${dict.meta.tagline}`,
      template: `%s · ${SITE.name}`,
    },
    description: dict.meta.description,
    metadataBase: appUrl ? new URL(appUrl) : undefined,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALE_CODES.map((code) => [code, `/${code}`])),
    },
    openGraph: {
      title: SITE.name,
      description: dict.meta.description,
      locale: HTML_LANG[locale],
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <html lang={HTML_LANG[locale]} className={plexMono.variable}>
      <head>
        {/*
          Satoshi es de Fontshare y no está en Google Fonts, así que va por CDN.
          Para producción conviene bajarla a `public/fonts` y pasar a
          `next/font/local`, para no depender de un tercero en el render.
        */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,500,700,900&display=swap"
        />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-heading focus:px-6 focus:py-3 focus:text-on-inverse"
        >
          {dict.nav.skipToContent}
        </a>

        {/*
          El provider envuelve al nav y al contenido porque la transición tiene
          que poder animar la página desde un clic que ocurre en el nav.
        */}
        <LocaleTransitionProvider>
          <AmbientGlow />
          <Nav locale={locale} dict={dict} />
          <main id="contenido">{children}</main>
        </LocaleTransitionProvider>

        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
