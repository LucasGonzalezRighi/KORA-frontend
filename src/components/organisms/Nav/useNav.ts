'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/** A partir de cuántos px de scroll el nav deja de ser transparente. */
const SOLID_THRESHOLD = 32;

/** Qué panel del nav está abierto. Solo uno por vez. */
type OpenPanel = { kind: 'submenu'; id: string } | { kind: 'locale' } | null;

/**
 * Estado del nav: si ya se scrolleó (para pasar a fondo sólido), qué panel está
 * abierto y si el menú mobile está desplegado.
 */
export function useNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SOLID_THRESHOLD);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** El menú mobile bloquea el scroll del body mientras está abierto. */
  useEffect(() => {
    if (!isMobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileOpen]);

  /** Escape cierra lo que esté abierto. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenPanel(null);
      setIsMobileOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /** Navegar (por ejemplo, al cambiar de idioma) cierra todo. */
  useEffect(() => {
    setOpenPanel(null);
    setIsMobileOpen(false);
  }, [pathname]);

  const isSubmenuOpen = (id: string) => openPanel?.kind === 'submenu' && openPanel.id === id;

  const toggleSubmenu = (id: string) =>
    setOpenPanel((current) =>
      current?.kind === 'submenu' && current.id === id ? null : { kind: 'submenu', id },
    );

  const toggleLocale = () =>
    setOpenPanel((current) => (current?.kind === 'locale' ? null : { kind: 'locale' }));

  const closeAll = () => {
    setOpenPanel(null);
    setIsMobileOpen(false);
  };

  return {
    isScrolled,
    isMobileOpen,
    isSubmenuOpen,
    isLocaleOpen: openPanel?.kind === 'locale',
    toggleSubmenu,
    toggleLocale,
    toggleMobile: () => setIsMobileOpen((open) => !open),
    closeAll,
  };
}
