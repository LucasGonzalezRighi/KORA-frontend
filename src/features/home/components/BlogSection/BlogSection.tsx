'use client';

import { ArrowRight } from 'lucide-react';

import { LinkButton } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { BlogCard } from '@/components/organisms/BlogCard';
import { NewsletterPanel } from '@/components/organisms/NewsletterPanel';
import { ROUTES_APP, SECTION_IDS } from '@/constants/routes.app';
import { POST_META, POST_SLUGS } from '@/features/home/data/posts';
import type { Dictionary, Locale } from '@/i18n';
import { REVEAL_ITEM_CLASS, useParallax, useScrollReveal } from '@/hooks/animations';

type BlogSectionProps = {
  locale: Locale;
  dict: Dictionary['blog'];
  newsletterDict: Dictionary['newsletter'];
};

/** Últimos artículos + panel de newsletter. */
export function BlogSection({ locale, dict, newsletterDict }: BlogSectionProps) {
  const containerRef = useScrollReveal<HTMLDivElement>();
  // Cada portada se dispara con su propia posición, no con la de la grilla.
  const coversRef = useParallax<HTMLUListElement>({
    triggerSelf: true,
    start: 'top bottom',
    end: 'bottom top',
  });

  return (
    <Section id={SECTION_IDS.blog}>
      <Container>
        <div ref={containerRef} className="flex flex-col gap-16">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow={dict.eyebrow} title={dict.title} className={REVEAL_ITEM_CLASS} />
            <LinkButton
              href={ROUTES_APP.blog(locale)}
              variant="outline"
              size="lg"
              className={`${REVEAL_ITEM_CLASS} shrink-0`}
              trailingIcon={<ArrowRight aria-hidden className="size-5" />}
            >
              {dict.cta}
            </LinkButton>
          </div>

          <ul ref={coversRef} className="grid gap-card-gap md:grid-cols-2 lg:grid-cols-3">
            {POST_SLUGS.map((slug) => (
              <li key={slug} className={REVEAL_ITEM_CLASS}>
                <BlogCard
                  locale={locale}
                  href={ROUTES_APP.blogPost(locale, slug)}
                  cover={POST_META[slug].cover}
                  publishedAt={POST_META[slug].publishedAt}
                  category={dict.posts[slug].category}
                  title={dict.posts[slug].title}
                  excerpt={dict.posts[slug].excerpt}
                  readMoreLabel={dict.readMore}
                />
              </li>
            ))}
          </ul>

          <div className={REVEAL_ITEM_CLASS}>
            <NewsletterPanel dict={newsletterDict} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
