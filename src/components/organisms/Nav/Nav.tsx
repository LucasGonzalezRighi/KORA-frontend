'use client';

import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { LinkButton } from '@/components/atoms/Button';
import { Logo } from '@/components/atoms/Logo';
import { Magnetic } from '@/components/atoms/Magnetic';
import { buildNavItems } from '@/constants/navigation';
import { ANCHORS } from '@/constants/routes.app';
import type { Dictionary, Locale } from '@/i18n';

import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileMenu } from './MobileMenu';
import { NavDropdown } from './NavDropdown';
import { NavLink } from './NavLink';
import { useNav } from './useNav';
import { cn } from '@/utils/cn';

type NavProps = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Nav fijo montado sobre la tarjeta del hero. Arranca transparente (la imagen
 * del hero es clara) y pasa a fondo sólido apenas se scrollea.
 *
 * Es un orquestador: la lógica vive en `useNav` y cada pieza (dropdown,
 * selector de idioma, menú mobile) es su propio componente.
 */
export function Nav({ locale, dict }: NavProps) {
  const {
    isScrolled,
    isMobileOpen,
    isSubmenuOpen,
    isLocaleOpen,
    toggleSubmenu,
    toggleLocale,
    toggleMobile,
    closeAll,
  } = useNav();

  const pathname = usePathname();
  const items = buildNavItems(locale, dict);

  /**
   * El nav se "pega" al borde cuando se scrollea, y también cuando se abre el
   * menú mobile — si no, el panel desplegado quedaría colgando desde el medio
   * de la tarjeta del hero.
   */
  const isPinned = isScrolled || isMobileOpen;

  const localeHrefFor = (target: Locale) => {
    const segments = pathname.split('/');
    segments[1] = target;
    return segments.join('/') || `/${target}`;
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,padding-top] duration-300 ease-out',
        /*
          En reposo el nav baja para quedar dentro de la tarjeta del hero, como
          en el diseño. Al scrollear sube al borde y se vuelve **vidrio**: el
          efecto lo hace el `backdrop-filter` (desenfoque + saturación), no el
          relleno. Por eso el fondo va a 55% y no a 85% — con más opacidad se
          pierde el vidrio y vuelve a ser una barra blanca. El `saturate` es lo
          que evita que lo que pasa por detrás se vea lavado.
        */
        isPinned
          ? 'border-b border-glass bg-glass pt-0 shadow-nav backdrop-blur-2xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent pt-nav-rest',
      )}
    >
      {/*
        Misma geometría que la tarjeta del hero: `px-gutter` lleva al borde de
        la tarjeta y `px-card-gutter` al interior. Así el logo cae a plomo con
        el título del hero en cualquier ancho.
      */}
      <div className="px-gutter">
        <div
          className={cn(
            'mx-auto flex w-full max-w-wide items-center justify-between gap-8 px-card-gutter transition-[height] duration-300 ease-out',
            isPinned ? 'h-20' : 'h-14',
          )}
        >
          <Logo locale={locale} />

          <nav aria-label={dict.nav.mainNavigation} className="hidden items-center gap-6 lg:flex">
            {items.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.id}
                  label={item.label}
                  items={item.children}
                  isOpen={isSubmenuOpen(item.id)}
                  onToggle={() => toggleSubmenu(item.id)}
                  onSelect={closeAll}
                />
              ) : (
                <NavLink key={item.id} href={item.href} label={item.label} />
              ),
            )}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <LocaleSwitcher
              current={locale}
              label={dict.nav.changeLanguage}
              hrefFor={localeHrefFor}
              isOpen={isLocaleOpen}
              onToggle={toggleLocale}
              onSelect={closeAll}
              className="hidden lg:block"
            />

            {/*
              El CTA se muestra en todos los tamaños: en mobile la barra tenía
              solo logo y hamburguesa, y la acción principal quedaba escondida
              detrás de un menú que hay que abrir. En pantallas chicas va con
              padding y tipografía reducidos para que entre sin apretar al logo.
            */}
            <Magnetic className="inline-flex">
              <LinkButton
                href={ANCHORS.contacto}
                variant="solid"
                size="sm"
                className="px-3 text-xs sm:px-4 sm:text-sm"
              >
                {dict.nav.cta}
              </LinkButton>
            </Magnetic>

            <button
              type="button"
              onClick={toggleMobile}
              aria-expanded={isMobileOpen}
              aria-controls="menu-mobile"
              aria-label={isMobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
              className="inline-flex size-11 items-center justify-center rounded-pill border border-ink text-heading lg:hidden"
            >
              {isMobileOpen ? (
                <X aria-hidden className="size-5" />
              ) : (
                <Menu aria-hidden className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileOpen ? (
        <MobileMenu
          items={items}
          languageLabel={dict.nav.changeLanguage}
          locale={locale}
          localeHrefFor={localeHrefFor}
          onNavigate={closeAll}
        />
      ) : null}
    </header>
  );
}
