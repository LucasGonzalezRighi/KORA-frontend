/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    /*
      Habilita la View Transitions API en las navegaciones del App Router.
      Activarla hace que Next bundlee el canal *experimental* de React en lugar
      del estable (alias de `react`/`react-dom` a `next/dist/compiled/
      react-experimental`), que es el único que exporta `unstable_ViewTransition`.

      Verificado contra la versión instalada (Next 15.5.22): la flag no está en
      la lista de opciones bloqueadas fuera de canary, así que funciona en este
      build estable.

      Es una capa de mejora progresiva: donde el navegador no soporta View
      Transitions, la navegación simplemente no cruza, y la transición de idioma
      la sigue sosteniendo GSAP. Ver `src/features/locale-transition/`.
    */
    viewTransition: true,
  },
};

export default nextConfig;
