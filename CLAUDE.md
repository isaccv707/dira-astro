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

`src/sections/astro/hero/HeroHome.astro` is the canonical reference for this system — when in doubt, match its patterns. The lab-grid backdrop, targeting-bracket corners, and pulsing live-status badge are **hero-tier motifs only** (HeroHome, HeroAbout, ServiceHero-style moments) — the rest of the site uses the same palette/type/spacing in a sober, consistent form without those signature flourishes.

### 1. Color Semantics

- **Headings (H1, H2, H3):** Default to `text-green-light` combined with `font-black tracking-tight`. Colored headings (`text-green-primary` / `text-green-light` / `text-yellow-secondary`) are reserved for hero-tier sections and true featured moments — not for card titles or generic section headers.
- **Paragraphs:** Always use `text-grey-custom leading-relaxed`. For secondary/meta text (dates, counts) use `text-grey-custom/70` rather than a different gray.
- **Accents:** Use `text-green-primary` or `bg-green-primary`. For badges/eyebrow labels, use the canonical recipe: `inline-flex items-center gap-2 rounded-full border border-green-primary/15 bg-green-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-green-primary` with a dot `h-1.5 w-1.5 rounded-full bg-green-primary`. Only animate the dot (`animate-pulse`/`animate-ping`) for genuinely live/hero-tier signals — decorative eyebrow badges elsewhere use a static dot.
- **Never use raw Tailwind grays** (`text-gray-400..900`, `border-gray-100/200/300`, `bg-gray-50/100/200`) or invented colors (`bg-primary`, `text-neutral-*`). Use `text-green-light` / `text-grey-custom` / `border-ui-border` / `bg-ui-bg` instead.
- **No decorative blur "blobs"** — they contradict the lab-grid aesthetic. No orphaned `dark:` classes — the site has no dark mode.

### 2. Layout & Containers

- **Cards / Sections (sober, default):** `bg-white border border-ui-border rounded-clinical-md shadow-xs p-6`, hover elevation `hover:shadow-sm`.
- **Hero-tier / brand-forward panels:** may use `border-green-primary/10` or `/12` instead of `border-ui-border`, as in HeroHome's stat panel and nav pills.
- **Radius scale:** `rounded-clinical-sm` (8px, chips/inputs/small badges), `rounded-clinical-md` (12px, default card — same value as HeroHome's `rounded-xl`), `rounded-clinical-lg` (16px, showcase panels/larger imagery). Don't use `rounded-2xl/3xl/4xl` or arbitrary bracket radii (`rounded-[2.5rem]`) on cards/panels. Overlays (Modal, Drawer, floating panels) pick one consistent large radius.
- **Shadow scale:** `shadow-xs` resting for cards, `shadow-sm` on hover. Reserve `shadow-md/lg/xl/2xl` for true overlays (Modal, Drawer, floating panel), not in-flow cards.
- **Spacings:** Do not use arbitrary tailwind spacing (`mt-[13px]`). Use standard scale (`space-y-4`, `space-y-8`, `gap-6`, `p-8`).
- **Section Headers:** Use a consistent wrapper:
  ```astro
  <div class="motion-safe:animate-fade-up">
    <h2 class="text-2xl font-black tracking-tight text-green-light sm:text-3xl">Title</h2>
    <p class="mt-2 text-sm text-grey-custom sm:text-base">Description</p>
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
