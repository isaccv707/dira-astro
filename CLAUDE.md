# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role

Public site of _Diagnóstico y Referencia Analítica_ (DYRA): services, study search, branches, blog, reviews and quoter (PDF). **Depends on** `../backend-dyra`, only `@Public()` routes and no auth. Nothing depends on it. System context: `../CLAUDE.md`.

## Stack

Astro 5 in SSR mode (`output: "server"`, `@astrojs/node` standalone) · React 19.1 islands · Tailwind CSS 4 (`@tailwindcss/vite`, configured in CSS) · nanostores · React Hook Form + Yup · framer-motion/motion · swiper · astro-icon · EmailJS · react-toastify. Node 22. Package manager: **pnpm**.

## Commands

```bash
pnpm install
pnpm dev        # http://localhost:4321 (host: true → also on the local network)
pnpm build      # → dist/ (client + server)
pnpm preview
pnpm start      # node ./dist/server/entry.mjs (after build)
pnpm lint       # ESLint (eslint.config.js), --max-warnings 50 (existing debt; lower the cap when fixing, never raise it) + UI guard
pnpm lint:ui    # UI guard only (scripts/check-ui.mjs)
pnpm check      # astro check: typecheck of .astro/.ts/.tsx
pnpm api:types  # regenerates src/api/generated/openapi.d.ts from ../backend-dyra/openapi.json
```

No tests or formatter. CI (`.github/workflows/ci.yml`): lint + check + build.

## Structure

```
src/pages/                 routes (.astro) + sitemap.xml.ts, robots.txt.ts
src/layouts/Layout.astro   shell: Header, Footer, ModalManager, DrawerManager, BranchSelectorSection,
                           FloatingActionsSection, ToastContainer
src/sections/{astro,react}/  page sections (static / interactive)
src/components/{astro,react}/ components (react/: form/, hk-form/, modal/, drawer/, cards/, ...)
src/api/<domain>Api/       fetch functions + *.interface.ts; apiGet.ts is the GET helper
src/stores/                nanostores: branchStore, modalStore, drawerStore, quoterStore
src/middleware.ts          branch by cookie + cache headers
src/server/branchContext.ts AsyncLocalStorage for branchId (server only)
src/constants/             apiUrl.ts, site.ts (SITE_URL, DEFAULT_BRANCH_ID), emailJs.ts
src/hooks/, src/utils/     shared logic (ttlCache, cart, quoterStudies, formattedDate)
src/schemas/               Yup schemas
src/routes/routes.ts       nav link groups
```

Routes: `/`, `/about`, `/blog`, `/blog/[slug]`, `/branches`, `/contact`, `/quoter`, `/service/[slug]`, `/study/[slug]`, `/404`, `/sitemap.xml`, `/robots.txt`.

## Patterns and conventions

- **Astro ↔ React:** Astro for layout, SEO and server-rendered data; React only for interactivity (`client:load` / `client:visible`).
- **Branch:** all content depends on the branch. The browser stores it in `localStorage` + cookie `dyra_branch_id` (`setSelectedBranch`/`switchBranch` in `branchStore.ts`). In SSR, `middleware.ts` reads the cookie (fallback `DEFAULT_BRANCH_ID`) and exposes it with `runWithBranchId`. `src/api/` functions call `resolveBranchId()`, which works on both sides. Switching branch clears the cart and quoter and reloads `/`.
- **HTML per branch:** the middleware forces `Cache-Control: private, no-cache` + `Vary: Cookie`; don't cache pages in a proxy.
- **Data:** `apiGet()` (fetch GET, query params, `404 → null`, other errors → `throw Error(message)`). In-memory cache with `createTtlCache` (5 min; `getStale` as fallback if the API fails). Example to mimic: `src/api/studiesApi/studiesApi.ts`.
- **UI state:** `openModal(view, payload)` / `closeModal()`; `ModalManager.tsx` and `DrawerManager.tsx` render by `view` key. `Drawer` is a modal dialog (Escape/backdrop close, focus trap).
- **Shell:** header search is `components/react/search/StudySearch.tsx` (ARIA combobox over `GET /studies?search=`, active branch); nav items and `isActivePath` (for `aria-current`) live in `src/routes/routes.ts`; `Dropdown.astro` is a click/keyboard disclosure menu. The footer shows the active branch's address, phone and hours (`getActiveBranchDetails`).
- **Forms:** RHF + Yup (`src/schemas/`); fields in `components/react/form/` (uncontrolled) and `components/react/hk-form/` (`RHF*`).
- **Amounts:** `formatMXN` / `Price` (`src/utils/currency.ts`, es-MX). Dates: the backend sends ISO; format only for display.
- **Icons:** `astro-icon` (`lucide`, `tabler`, `logos`, `simple-icons`) in .astro; `@iconify/react` / `lucide-react` in React.
- **Variants:** `class-variance-authority` + `clsx`. Global styles in `src/styles/global.css`.

## Design system (mandatory)

Tokens live in `src/styles/global.css` (`@theme`); class recipes in `src/styles/ui.ts`. Reference implementation: `src/sections/astro/StudyDetail.astro`. Its **specimen label** (`components/astro/study/SpecimenLabel.astro`: barcode from the study code, monospace code, `dl` of sample/technique) is the site's signature element; reuse it instead of inventing decorative motifs. Lab-grid background and targeting brackets stay hero-only (HeroHome, HeroAbout, ServiceHero) until the hero refactor.

**Typography**
- IBM Plex Sans (`font-sans`, weights 400/500/600/700) and IBM Plex Mono (`font-mono`, 400/500), self-hosted via `@fontsource`. Max weight is 700: use `font-bold`, never `font-black`/`font-extrabold`.
- Mono only for study codes, folios and technical identifiers (`StudyCode`, `SpecimenLabel`). Prices use `tabular-nums` (`Price`).
- Smallest size is `text-2xs` (11px, eyebrows/badges only); no `text-[Npx]` below it.

**Color: brand tones vs. text tones**
- Brand tones (`green-primary`, `green-secondary`, `green-light`, `yellow-*`) are for fills, dots, borders and tints (`bg-green-primary/8`). **As text they fail WCAG AA.**
- Text uses the "ink" tokens (same hues, darkened, AA on white/`ui-bg`):
  - `text-ink`: headings and strong text
  - `text-ink-muted`: paragraphs
  - `text-ink-subtle`: dates, counts, captions
  - `text-brand-ink`: links, eyebrows, accents; `bg-brand-ink` for primary buttons and dark brand surfaces, with `brand-ink-hover`
  - `text-yellow-ink`: warnings such as fasting
  - `text-yellow-mark`: non-text yellow marks such as stars
- White text only on `bg-brand-ink`, `bg-brand-ink-hover`, `bg-yellow-ink` or `bg-red-custom` (`text-white/90` minimum).
- Eyebrow/badge: `Eyebrow` (`components/astro/ui/Eyebrow.astro`, React twin `components/react/ui/Eyebrow.tsx`; `tone` brand|warn|neutral, `live` only for real live signals). Don't copy its classes by hand.
- **Forbidden:** raw Tailwind grays, invented colors (`bg-primary`, `text-neutral-*`), brand tones as text, gradient text, decorative blur/glass, `dark:` classes (there is no dark mode).

**Layout**
- Default card/section: `cardStyles()` from `src/styles/ui.ts` = `bg-white border border-ui-border rounded-clinical-md shadow-xs p-6`; hover (`interactive: true`) changes border and shadow only, never translate or scale.
- Buttons: `Buttonstyles` (`src/styles/buttonsStyles.ts`); `primary` is the single main action of a view.
- Brand/hero panels: may use `border-green-primary/10` or `/12`.
- Radii: `rounded-clinical-sm` (8px: chips, inputs), `rounded-clinical-md` (12px: card), `rounded-clinical-lg` (16px: highlighted panels, images). No `rounded-2xl/3xl/4xl` or arbitrary radii on cards. Overlays use one consistent large radius.
- Shadows: `shadow-xs` at rest, `shadow-sm` on hover; `shadow-md` and above only for overlays (Modal, Drawer, floating panels).
- Spacing: standard scale (`space-y-4`, `gap-6`, `p-8`); nothing arbitrary (`mt-[13px]`).
- Section header: `<SectionHeader title="…" lead="…" />` (`components/astro/ui/SectionHeader.astro`, optional `slot="aside"` for a count or chip). Amounts: `Price` / `formatMXN` (`src/utils/currency.ts`).
- Motion: transitions on specific properties (`transition-colors`, `transition-[border-color,box-shadow]`), never `transition-all`; entrance animations behind `motion-safe:`.

**UI guard:** `pnpm lint` also runs `scripts/check-ui.mjs`, which caps generic-UI and contrast patterns (gradient text, glass, hover scale/translate, `transition-all`, large radii, heavy shadows, emojis, brand tones as text…). Caps hold existing debt: when a refactor removes occurrences, lower the cap (the script prints the new value); never raise it.

## UI design (mandatory)

- Any new or restyled page, section, card, form, modal, drawer or quoter UI **must** follow the `ui-ux-designer` skill (`.claude/skills/ui-ux-designer/SKILL.md`) together with the design system above. Load it before writing UI code.
- No generic AI-looking UI: no gradient text, neon/purple gradients, glassmorphism, decorative blobs, generic metric heroes, identical icon-card grids or scattered animations.
- Mobile-first (360 px), WCAG AA contrast, visible focus, `motion-safe:` for animations.

## Environment variables (see `.env.example`)

| Variable | Use |
|---|---|
| `PUBLIC_API_URL` | Backend with `/api` (default `http://localhost:3000/api`) |
| `PORT` | Server port (default 4321) |
| `PUBLIC_SITE_URL` | Public origin for canonical/OG/sitemap (default `https://dyranalitica.com`) |
| `PUBLIC_DEFAULT_BRANCH_ID` | Branch without cookie. Locally: `a1b2c3d4-0001-4000-8000-000000000001` (backend dev seed) |
| `PUBLIC_URL_WHATSAPP` | WhatsApp link for appointments |
| `PUBLIC_SERVICE_EMAILJS`, `PUBLIC_TEMPLATEID_EMAILJS`, `PUBLIC_KEY_EMAILJS` | Contact form (EmailJS) |

All are `PUBLIC_*`: they end up in the client bundle. Never put secrets here.

## Integration

- **Client:** `src/api/apiGet.ts` (GET) and direct `fetch` for `POST /quotations/pdf` (`quotationsApi/quotationApi.ts`, returns a PDF) and `POST /reviews`. Base: `src/constants/apiUrl.ts`.
- **Auth:** none. If an endpoint stops being `@Public()` in the backend, the site breaks.
- **Endpoints used:** `/studies`, `/studies/by-slug/:slug?branchId=`, `/studies/:id/panel-tree`, `/services`, `/services/:idOrSlug`, `/branches`, `/branches/:id`, `/posts`, `/banners/active/:placement`, `/reviews/approved`.
- **Contract:** source of truth = backend DTOs → `../backend-dyra/openapi.json` → `src/api/generated/openapi.d.ts` (`pnpm api:types`, don't edit by hand; covers routes and input bodies). Responses remain hand-typed in `src/api/<domain>Api/*.interface.ts` and `src/interfaces/`. `/studies/:id` only accepts UUIDs: by slug use `/studies/by-slug`.

## Common mistakes / avoid

- Without `PUBLIC_DEFAULT_BRANCH_ID` locally, the fallback points to the production branch and pages come out empty.
- Don't import `src/server/*` (uses `node:async_hooks`) from code that reaches the browser; only from `middleware.ts`.
- Don't derive canonical URLs from `Astro.url` (behind the proxy it resolves to localhost): use `SITE_URL`.
- Don't use npm/yarn (lockfile `pnpm-lock.yaml`). pnpm 11: packages with a build script must be approved in `pnpm-workspace.yaml` (`allowBuilds`).
- Respect the design system: brand tones used as text (`text-green-light`, `text-grey-custom`), raw grays and arbitrary radii are the most frequent mistakes; `pnpm lint:ui` catches them.

## Definition of done

1. `pnpm lint`, `pnpm check` and `pnpm build` green.
2. Reviewed in `pnpm dev` against the local backend, on mobile and desktop, and with a branch switch if applicable.
3. Styles conform to the design system and the `ui-ux-designer` skill.
