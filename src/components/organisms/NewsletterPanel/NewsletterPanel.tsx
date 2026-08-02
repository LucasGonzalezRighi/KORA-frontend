'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/atoms/Button';
import { ROUTES_API } from '@/constants/routes.api';
import type { Dictionary } from '@/i18n';
import { apiClient } from '@/lib/axios';

/** Panel oscuro de suscripción al newsletter. */
export function NewsletterPanel({ dict }: { dict: Dictionary['newsletter'] }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await apiClient.post(ROUTES_API.newsletter, { email });
      toast.success(dict.success);
      setEmail('');
    } catch {
      toast.error(dict.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-panel bg-surface-inverse px-8 py-10 shadow-panel sm:px-11">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-3.5">
          <h2 className="font-display text-xl font-bold leading-snug tracking-tight text-on-inverse">
            {dict.title}
          </h2>
          <p className="max-w-[40ch] font-display text-md font-medium leading-snug text-on-inverse-muted">
            {dict.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <label htmlFor="newsletter-email" className="sr-only">
            {dict.placeholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={dict.placeholder}
            className="h-[61px] w-full min-w-0 rounded-input border-[3px] border-inverse bg-input-inverse px-8 font-display text-base font-light text-on-inverse placeholder:text-on-inverse-muted focus:border-accent-soft focus:outline-none sm:w-[311px]"
          />
          <Button
            type="submit"
            variant="icon"
            size="md"
            disabled={isSubmitting}
            aria-label={dict.submitLabel}
          >
            <ArrowRight aria-hidden className="size-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}
