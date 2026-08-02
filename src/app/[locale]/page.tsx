import { notFound } from 'next/navigation';

import { Home } from '@/features/home';
import { getDictionary, isLocale } from '@/i18n';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <Home locale={locale} dict={getDictionary(locale)} />;
}
