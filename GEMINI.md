# GEMINI.md - Dira Astro Project Context

This document provides a high-level overview and instructional context for the **dira-astro** project, a professional healthcare service platform for *Diagnóstico y Referencia Analítica* (DYRA).

## 🚀 Project Overview

**dira-astro** is a modern, high-performance web application built with **Astro** in SSR mode. It serves as the digital front-face for a clinical analysis laboratory, providing service information, branch locations, a blog, and a quotation tool.

### Core Technology Stack

- **Framework:** [Astro](https://astro.build/) (v5.13+)
- **UI Libraries:** [React](https://reactjs.org/) (v19) for interactive components.
- **State Management & API:** [Redux Toolkit](https://redux-toolkit.js.org/) and **RTK Query** for data fetching and caching.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4) with Vite integration.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) and [Motion](https://motion.dev/).
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup) for validation.
- **Server:** Node.js (Standalone adapter).

## 📁 Directory Structure

The project follows a modular organization within `src/`:

- `api/`: Redux Toolkit Query API definitions and endpoint injections.
- `assets/`: Static assets like images, icons, and SVG files.
- `components/`:
    - `astro/`: Pure Astro components (mostly UI and layout sections).
    - `react/`: Interactive React components (cards, carousels, forms, etc.).
- `constants/`: Configuration constants like `API_URL`, social links, etc.
- `contexts/`: React Context providers for global UI state (modals, drawers, quoter).
- `data/`: Local static data (benefits, services list, branch info).
- `hooks/`: Custom React hooks for shared logic.
- `interfaces/`: TypeScript definitions and interfaces.
- `layouts/`: Base Astro layouts.
- `pages/`: Application routes (mix of `.astro` and dynamic `[slug].astro` pages).
- `routes/`: Routing configuration and navigation links.
- `schemas/`: Validation schemas (Yup) for forms.
- `sections/`: High-level page sections (Header, Footer, Hero, etc.).
- `store/`: Redux store configuration.
- `styles/`: Global CSS and shared component styles.
- `utils/`: Utility functions.

## 🛠️ Building and Running

Commands are standard for an Astro project:

- **Development:** `npm run dev` (starts the local dev server at `localhost:4321`).
- **Build:** `npm run build` (generates a production-ready server build in `./dist/`).
- **Preview:** `npm run preview` (runs the production build locally).
- **Production Start:** `npm run start` (starts the standalone Node.js server).

## 📋 Development Conventions

### Coding Style

- **Component Separation:** Use Astro for static layout and SEO-heavy parts. Use React for client-side interactivity (`client:load`, `client:visible`).
- **Styling:** Prefer Tailwind CSS utility classes. Avoid complex custom CSS unless necessary (stored in `src/styles/`).
- **State Management:** 
    - Use **RTK Query** for all server-side data fetching.
    - Use **React Context** for lightweight UI state (e.g., opening/closing drawers).
    - Use **Redux** for global application state if needed (currently primary for API).
- **TypeScript:** Strict typing is encouraged across the codebase. Define interfaces in `src/interfaces/`.
- **Forms:** Always use `React Hook Form` combined with `Yup` schemas from `src/schemas/`.

### API Integration

- Base API configuration is in `src/api/api.ts`.
- Specific modules should inject endpoints into the main API using `api.injectEndpoints`.
- Access the `PUBLIC_API_URL` via `import.meta.env.PUBLIC_API_URL` (configured in `src/constants/apiUrl.ts`).

### UI Components

- Reusable React components are located in `src/components/react/`.
- Large sections of pages are organized in `src/sections/astro/` or `src/sections/react/`.
- Animations should use `framer-motion` for complex transitions and `motion` for simpler ones.

## 🔗 Key Links and Resources

- **Main Entry Point:** `src/pages/index.astro`
- **Global Layout:** `src/layouts/Layout.astro`
- **Routes Config:** `src/routes/routes.ts`
- **API URL:** `src/constants/apiUrl.ts`
