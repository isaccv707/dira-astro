## Project

**dira-astro** is the public website for _Diagnóstico y Referencia Analítica_ (DYRA), a clinical analysis laboratory. It presents services, branch locations, a blog, study search, and a quotation tool.

## Commands

```sh
pnpm dev        # Dev server at localhost:4321
pnpm build      # Production build → ./dist/
pnpm preview    # Preview the production build
pnpm start      # Run standalone Node server (after build)
```

The project uses **pnpm**. There is no test runner or lint script configured.

## Architecture

Astro v5 runs in **SSR mode** with the Node standalone adapter. The pattern is: use Astro components for static/SEO content and React for anything interactive.

### Astro ↔ React boundary

- Astro components (`src/components/astro/`, `src/sections/astro/`) handle layout, static HTML, and server-rendered data fetching.
- React components (`src/components/react/`, `src/sections/react/`) handle interactivity and are mounted with `client:load` or `client:visible`.
- `src/layouts/Layout.astro` is the base shell. It renders Header, Footer, and mounts `ModalManager`, `DrawerManager`, `BranchSelectorSection`, `FloatingActionsSection`, and `ToastContainer` globally.

### State management

Global UI state uses **nanostores** (not Redux):

- `src/stores/modalStore.ts` — controls which modal is visible; `openModal(view, payload)` / `closeModal()`.
- `src/stores/drawerStore.ts` — controls drawer visibility.
- `src/components/react/modal/ModalManager.tsx` reads `modalStore` and renders the correct modal by `view` string key.
- `src/components/react/drawer/DrawerManager.tsx` does the same for drawers.

### Data fetching

All API calls are plain `fetch` functions (no Redux/RTK Query). They live in `src/api/` organized by domain:

```
src/api/
  bannersApi/   studiesApi/   servicesApi/
  postsApi/     reviewsApi/   branchesApi/
  quotationsApi/ priceSheetApi/
```

Base URL comes from `import.meta.env.PUBLIC_API_URL` (falls back to `http://localhost:3000/api`), centralised in `src/constants/apiUrl.ts`.

### Forms

All forms use **React Hook Form** with **Yup** schemas. Schemas live in `src/schemas/`. Form field components are in `src/components/react/form/` (uncontrolled) and `src/components/react/hk-form/` (RHF-integrated wrappers prefixed `RHF`).

### Routing and pages

| Path              | File                             |
| ----------------- | -------------------------------- |
| `/`               | `src/pages/index.astro`          |
| `/about`          | `src/pages/about.astro`          |
| `/blog`           | `src/pages/blog.astro`           |
| `/blog/[slug]`    | `src/pages/blog/[slug].astro`    |
| `/branches`       | `src/pages/branches.astro`       |
| `/contact`        | `src/pages/contact.astro`        |
| `/quoter`         | `src/pages/quoter.astro`         |
| `/service/[slug]` | `src/pages/service/[slug].astro` |
| `/study/[slug]`   | `src/pages/study/[slug].astro`   |

Nav link groups are defined in `src/routes/routes.ts`.

### Styling

Tailwind CSS v4 via `@tailwindcss/vite` — no `tailwind.config` file; configuration is in CSS. Global styles in `src/styles/global.css`. Utility variants for component variants are handled with `class-variance-authority` + `clsx`.

### Icons and animations

- Icons: `astro-icon` with `lucide`, `tabler`, and `logos` icon sets (used in Astro files via `<Icon name="..." />`), plus `@iconify/react` and `lucide-react` in React components.
- Animations: `framer-motion` for complex transitions; `motion` for simpler ones.

### Environment variables

| Variable              | Purpose                                  |
| --------------------- | ---------------------------------------- |
| `PUBLIC_API_URL`      | Backend REST API base URL                |
| `PUBLIC_URL_WHATSAPP` | WhatsApp link for appointment scheduling |
| EmailJS vars          | See `src/constants/emailJs.ts`           |
