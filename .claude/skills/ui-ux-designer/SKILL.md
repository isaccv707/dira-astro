---
name: ui-ux-designer
description: UI/UX rules for the DYRA public website (Astro + React islands + Tailwind 4). Use whenever creating or restyling a page, section, hero, card, form, modal, drawer or the quoter in dira-astro, so the result follows the site's design system and avoids generic AI-looking UI.
---

# UI/UX Designer — dira-astro

Public site of a clinical laboratory. Patients come to find a study, its price/preparation, a branch, or to quote. The visual tone is **clinical, trustworthy and precise**: confidence comes from clarity and detail, not from effects.

## 1. Ground truth (never override)

- **Design system:** section "Design system (mandatory)" in `CLAUDE.md`; reference implementation `src/sections/astro/StudyDetail.astro`. Tokens in `src/styles/global.css` (`@theme`), recipes in `src/styles/ui.ts`.
- **Primitives first:** `Eyebrow`, `SectionHeader`, `SpecimenLabel` (Astro), `Eyebrow`, `Price`, `StudyCode` (React), `cardStyles`, `Buttonstyles`. Don't hand-copy their classes.
- **Text color = ink tokens** (`text-ink`, `-ink-muted`, `-ink-subtle`, `-brand-ink`, `-yellow-ink`). Brand tones (`green-*`, `yellow-*`) are for fills, dots, borders and tints only: as text they fail WCAG AA. No raw grays, invented colors or `dark:` classes (no dark mode).
- **Type:** IBM Plex Sans / Mono, max `font-bold`, min `text-2xs`. Mono only for codes and identifiers.
- **Radii:** `rounded-clinical-sm|md|lg` only. **Shadows:** `shadow-xs` rest, `shadow-sm` hover, `shadow-md`+ only overlays.
- **Signature:** the specimen label (barcode + monospace code). Lab-grid and targeting brackets are hero-only and due for review in the hero refactor; don't spread them.
- **Guard:** `pnpm lint:ui` must pass; lower a cap in `scripts/check-ui.mjs` when you remove occurrences.
- **Icons:** `astro-icon` (`lucide`, `tabler`, …) in `.astro`; `lucide-react` / `@iconify/react` in React. No emojis as icons.
- **Variants:** `class-variance-authority` + `clsx`; reuse `src/components/` before creating new ones.
- **Astro vs React:** static markup in Astro; React only for real interactivity (`client:visible` by default, `client:load` only above the fold and needed immediately).

## 2. Anti-generic rules (AI tells to avoid)

- No gradient text, neon/purple gradients, glow shadows, glassmorphism, decorative blur blobs or floating shapes.
- No generic "hero metrics" (big number + small label) unless they are real, verifiable lab facts.
- No uniform grids of identical icon + title + paragraph cards as the default answer; vary structure by content (list, table, steps, comparison).
- No `01 / 02 / 03` unless it is a real sequence (e.g. how to prepare for a study, how to quote).
- No stock-marketing copy ("Revolucionamos tu salud", "Experiencia sin igual"). Be specific: study names, delivery times, preparation, branch hours.
- No scattered animations. Allowed: `motion-safe:animate-fade-up` on section entrance and meaningful micro-interactions; one orchestrated moment per page at most.
- Flat elements still need definition: cards use `cardStyles()`, buttons have hover, focus and active states. Hover feedback is color/border/shadow, never scale or lift.

## 3. Layout and hierarchy

- Mobile-first: design at 360 px first, then `sm`/`md`/`lg`. Most visitors are on phones; test the quoter and study search on mobile.
- One primary CTA per section (quote, schedule via WhatsApp, view study); secondary actions as text/outline.
- Section header pattern from `CLAUDE.md`; content max-width consistent with existing pages; standard spacing scale only.
- Readable line length (`max-w-prose` / ~65–75 ch) for body copy and blog posts.
- Images: explicit `width`/`height` (or aspect ratio) to avoid layout shift, `loading="lazy"` below the fold, meaningful `alt`.

## 4. Data and formatting

- Study codes, sample types and technical data may use a monospace face (`font-mono`) for scanning; keep it to small labels.
- Prices: `Price` (React, renders statically in Astro) or `formatMXN` from `src/utils/currency.ts`; `tabular-nums`, never truncated. Show "precio no disponible" states explicitly.
- Delivery time in days, preparation and sample type are high-value info for patients: give them visual priority over decoration.

## 5. States

- **Loading** (React islands): skeletons that match the content shape.
- **Empty / not found:** say what is missing and what to do next (change branch, search another study, contact).
- **Error:** explain and offer retry or contact; never a blank area.
- **Branch context:** content depends on the selected branch; make the active branch visible where it changes the data (prices, availability).

## 6. Forms (contact, reviews, quoter)

- RHF + Yup (`src/schemas/`); visible labels, errors in Spanish below the field, correct `type`/`inputmode`/`autocomplete` for mobile keyboards.
- Submit shows loading, prevents double submit, and confirms success with a clear message.

## 7. Interaction, accessibility, performance

- Visible focus (`focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2`, as in `Buttonstyles`), keyboard-operable modals/drawers (focus trap, `Esc` closes), `aria-label` on icon-only buttons.
- Touch targets ≥ 44 px. Contrast ≥ WCAG AA (ink tokens are pre-checked; any brand tone as text, or white on `green-*`/`yellow-*` fills, fails).
- Transitions on specific properties (`transition-colors`, `transition-shadow`, `transition-transform`), not `transition-all`; wrap motion in `motion-safe:` / respect `prefers-reduced-motion`.
- Keep JS small: no new heavy UI/animation libraries; prefer CSS and existing `motion`/`swiper`.
- Semantic HTML (`header`, `nav`, `main`, `section`, one `h1` per page) for SEO and screen readers.

## 8. Copy

- Spanish, warm but precise, sentence case, active voice. Use patients' words ("análisis de sangre") alongside technical names when helpful.
- Same name for an action across button, modal title and toast.

## 9. Process

1. Before building, state in 2–3 lines: who the visitor is, the page/section's single job and its primary CTA.
2. Find the closest existing section and reuse its structure and tokens.
3. Build; self-review against sections 1–2 (raw grays and arbitrary radii are the most frequent mistakes), mobile and desktop, branch switch if relevant.
4. If browser tools are available, take screenshots at 360 px and desktop and fix what looks off before reporting done.
