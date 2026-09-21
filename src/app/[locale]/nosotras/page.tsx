import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { About } from '@/features/about';
import { getDictionary, isLocale } from '@/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { meta } = getDictionary(locale).about;

  return { title: meta.title, description: meta.description };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <About locale={locale} dict={getDictionary(locale)} />;
}
