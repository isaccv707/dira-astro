# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rol

Sitio público de _Diagnóstico y Referencia Analítica_ (DYRA): servicios, búsqueda de estudios, sucursales, blog, reseñas y cotizador (PDF). **Depende de** `../backend-dyra`, solo rutas `@Public()` y sin auth. Nadie depende de él. Contexto del sistema: `../CLAUDE.md`.

## Stack

Astro 5 en modo SSR (`output: "server"`, `@astrojs/node` standalone) · islas React 19.1 · Tailwind CSS 4 (`@tailwindcss/vite`, configuración en CSS) · nanostores · React Hook Form + Yup · framer-motion/motion · swiper · astro-icon · EmailJS · react-toastify. Node 22. Gestor: **pnpm**.

## Comandos

```bash
pnpm install
pnpm dev        # http://localhost:4321 (host: true → también en la red local)
pnpm build      # → dist/ (client + server)
pnpm preview
pnpm start      # node ./dist/server/entry.mjs (tras build)
pnpm lint       # ESLint (eslint.config.js), --max-warnings 53 (deuda previa; bajar el tope al arreglar, nunca subirlo)
pnpm check      # astro check: typecheck de .astro/.ts/.tsx
pnpm api:types  # regenera src/api/generated/openapi.d.ts desde ../backend-dyra/openapi.json
```

No hay tests ni formateador. CI (`.github/workflows/ci.yml`): lint + check + build.

## Estructura

```
src/pages/                 rutas (.astro) + sitemap.xml.ts, robots.txt.ts
src/layouts/Layout.astro   shell: Header, Footer, ModalManager, DrawerManager, BranchSelectorSection,
                           FloatingActionsSection, ToastContainer
src/sections/{astro,react}/  secciones de página (estáticas / interactivas)
src/components/{astro,react}/ componentes (react/: form/, hk-form/, modal/, drawer/, cards/, ...)
src/api/<dominio>Api/      funciones fetch + *.interface.ts; apiGet.ts es el helper GET
src/stores/                nanostores: branchStore, modalStore, drawerStore, quoterStore
src/middleware.ts          sucursal por cookie + headers de caché
src/server/branchContext.ts AsyncLocalStorage del branchId (solo servidor)
src/constants/             apiUrl.ts, site.ts (SITE_URL, DEFAULT_BRANCH_ID), emailJs.ts
src/hooks/, src/utils/     lógica compartida (ttlCache, cart, quoterStudies, formattedDate)
src/schemas/               esquemas Yup
src/routes/routes.ts       grupos de links del nav
```

Rutas: `/`, `/about`, `/blog`, `/blog/[slug]`, `/branches`, `/contact`, `/quoter`, `/service/[slug]`, `/study/[slug]`, `/404`, `/sitemap.xml`, `/robots.txt`.

## Patrones y convenciones

- **Astro ↔ React:** Astro para layout, SEO y datos renderizados en servidor; React solo para interactividad (`client:load` / `client:visible`).
- **Sucursal:** todo el contenido depende de la sucursal. El navegador la guarda en `localStorage` + cookie `dyra_branch_id` (`setSelectedBranch`/`switchBranch` en `branchStore.ts`). En SSR, `middleware.ts` lee la cookie (fallback `DEFAULT_BRANCH_ID`) y la expone con `runWithBranchId`. Las funciones de `src/api/` llaman `resolveBranchId()`, que funciona en ambos lados. Cambiar de sucursal limpia carrito y cotizador y recarga `/`.
- **HTML por sucursal:** el middleware fuerza `Cache-Control: private, no-cache` + `Vary: Cookie`; no cachear páginas en proxy.
- **Datos:** `apiGet()` (fetch GET, query params, `404 → null`, otros errores → `throw Error(message)`). Caché en memoria con `createTtlCache` (5 min; `getStale` como respaldo si falla la API). Ejemplo a imitar: `src/api/studiesApi/studiesApi.ts`.
- **Estado UI:** `openModal(view, payload)` / `closeModal()`; `ModalManager.tsx` y `DrawerManager.tsx` renderizan por clave `view`.
- **Formularios:** RHF + Yup (`src/schemas/`); campos en `components/react/form/` (no controlados) y `components/react/hk-form/` (`RHF*`).
- **Montos:** `toLocaleString("es-MX", …)`. Fechas: el backend manda ISO; formatear solo al mostrar.
- **Iconos:** `astro-icon` (`lucide`, `tabler`, `logos`, `simple-icons`) en .astro; `@iconify/react` / `lucide-react` en React.
- **Variantes:** `class-variance-authority` + `clsx`. Estilos globales en `src/styles/global.css`.

## Sistema de diseño (obligatorio)

Referencia canónica: `src/sections/astro/hero/HeroHome.astro`. Fondo lab-grid, esquinas tipo "targeting bracket" y badge pulsante son motivos **solo de hero** (HeroHome, HeroAbout, ServiceHero); el resto del sitio usa la misma paleta/tipografía/espaciado en forma sobria.

**Color**
- Títulos H1–H3: `text-green-light font-black tracking-tight`. Títulos de color (`text-green-primary` / `text-yellow-secondary`) solo en heros y momentos destacados, no en cards ni encabezados genéricos.
- Párrafos: `text-grey-custom leading-relaxed`; texto secundario (fechas, conteos) `text-grey-custom/70`.
- Acentos: `text-green-primary` / `bg-green-primary`. Badge/eyebrow canónico: `inline-flex items-center gap-2 rounded-full border border-green-primary/15 bg-green-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-green-primary` con punto `h-1.5 w-1.5 rounded-full bg-green-primary`. Animar el punto (`animate-pulse`/`animate-ping`) solo en señales "en vivo"/hero.
- **Prohibido:** grises crudos de Tailwind (`text-gray-*`, `border-gray-*`, `bg-gray-*`) y colores inventados (`bg-primary`, `text-neutral-*`) → usar `text-green-light`, `text-grey-custom`, `border-ui-border`, `bg-ui-bg`. Sin "blobs" de blur decorativos. Sin clases `dark:` (no hay modo oscuro).

**Layout**
- Card/sección por defecto: `bg-white border border-ui-border rounded-clinical-md shadow-xs p-6`, hover `hover:shadow-sm`.
- Paneles de marca/hero: pueden usar `border-green-primary/10` o `/12`.
- Radios: `rounded-clinical-sm` (8px: chips, inputs), `rounded-clinical-md` (12px: card), `rounded-clinical-lg` (16px: paneles destacados, imágenes). No `rounded-2xl/3xl/4xl` ni radios arbitrarios en cards. Overlays usan un radio grande consistente.
- Sombras: `shadow-xs` en reposo, `shadow-sm` en hover; `shadow-md` en adelante solo overlays (Modal, Drawer, paneles flotantes).
- Espaciado: escala estándar (`space-y-4`, `gap-6`, `p-8`); nada arbitrario (`mt-[13px]`).
- Encabezado de sección:
  ```astro
  <div class="motion-safe:animate-fade-up">
    <h2 class="text-2xl font-black tracking-tight text-green-light sm:text-3xl">Título</h2>
    <p class="mt-2 text-sm text-grey-custom sm:text-base">Descripción</p>
  </div>
  ```

## Variables de entorno (ver `.env.example`)

| Variable | Uso |
|---|---|
| `PUBLIC_API_URL` | Backend con `/api` (default `http://localhost:3000/api`) |
| `PORT` | Puerto del servidor (default 4321) |
| `PUBLIC_SITE_URL` | Origen público para canonical/OG/sitemap (default `https://dyranalitica.com`) |
| `PUBLIC_DEFAULT_BRANCH_ID` | Sucursal sin cookie. En local: `a1b2c3d4-0001-4000-8000-000000000001` (seed dev del backend) |
| `PUBLIC_URL_WHATSAPP` | Link de WhatsApp para citas |
| `PUBLIC_SERVICE_EMAILJS`, `PUBLIC_TEMPLATEID_EMAILJS`, `PUBLIC_KEY_EMAILJS` | Formulario de contacto (EmailJS) |

Todas son `PUBLIC_*`: terminan en el bundle del cliente. Nunca poner secretos aquí.

## Integración

- **Cliente:** `src/api/apiGet.ts` (GET) y `fetch` directo para `POST /quotations/pdf` (`quotationsApi/quotationApi.ts`, devuelve PDF) y `POST /reviews`. Base: `src/constants/apiUrl.ts`.
- **Auth:** ninguna. Si un endpoint deja de ser `@Public()` en el backend, el sitio se rompe.
- **Endpoints usados:** `/studies`, `/studies/by-slug/:slug?branchId=`, `/studies/:id/panel-tree`, `/services`, `/services/:idOrSlug`, `/branches`, `/branches/:id`, `/posts`, `/banners/active/:placement`, `/reviews/approved`.
- **Contrato:** fuente de verdad = DTOs del backend → `../backend-dyra/openapi.json` → `src/api/generated/openapi.d.ts` (`pnpm api:types`, no editar a mano; cubre rutas y bodies de entrada). Las respuestas siguen tipadas a mano en `src/api/<dominio>Api/*.interface.ts` y `src/interfaces/`. `/studies/:id` solo acepta UUID: por slug usar `/studies/by-slug`.

## Errores comunes / evitar

- Sin `PUBLIC_DEFAULT_BRANCH_ID` en local, el fallback apunta a la sucursal de producción y las páginas salen vacías.
- No importar `src/server/*` (usa `node:async_hooks`) desde código que llegue al navegador; solo desde `middleware.ts`.
- No derivar URLs canónicas de `Astro.url` (detrás del proxy resuelve a localhost): usar `SITE_URL`.
- No usar npm/yarn (lockfile `pnpm-lock.yaml`). pnpm 11: los paquetes con build script deben aprobarse en `pnpm-workspace.yaml` (`allowBuilds`).
- Respetar el sistema de diseño: los grises crudos y radios arbitrarios son los errores más frecuentes.

## Definición de terminado

1. `pnpm lint`, `pnpm check` y `pnpm build` en verde.
2. Revisado en `pnpm dev` contra el backend local, en móvil y escritorio, y con cambio de sucursal si aplica.
3. Estilos conforme al sistema de diseño.
