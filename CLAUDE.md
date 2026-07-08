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

## UI & Design System Rules

To maintain strict visual consistency across the entire site, adhere to these guidelines:

### 1. Color Semantics

- **Headings (H1, H2, H3):** Always use `text-ui-dark` combined with `font-black tracking-tight`.
- **Paragraphs:** Always use `text-ui-body leading-relaxed`.
- **Accents:** Use `text-green-primary` or `bg-green-primary`. For badges, use `bg-green-primary/8 text-green-primary border border-green-primary/15`.

### 2. Layout & Containers

- **Cards / Sections:** Standard layouts must use `bg-white border border-ui-border rounded-clinical-md shadow-xs p-6`.
- **Spacings:** Do not use arbitrary tailwind spacing (`mt-[13px]`). Use standard scale (`space-y-4`, `space-y-8`, `gap-6`, `p-8`).
- **Section Headers:** Use a consistent wrapper:
  ```astro
  <div class="motion-safe:animate-fade-up">
    <h2 class="text-2xl font-black tracking-tight text-ui-dark sm:text-3xl">Title</h2>
    <p class="mt-2 text-sm text-ui-body sm:text-base">Description</p>
  </div>
  ```

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
  quotationsApi/
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

### Environment variables

| Variable              | Purpose                                  |
| --------------------- | ---------------------------------------- |
| `PUBLIC_API_URL`      | Backend REST API base URL                |
| `PUBLIC_URL_WHATSAPP` | WhatsApp link for appointment scheduling |
| EmailJS vars          | See `src/constants/emailJs.ts`           |
