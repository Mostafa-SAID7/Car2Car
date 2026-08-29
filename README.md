# Torque — Motor Oil Marketplace

Torque is a mobile-first marketplace for premium motor oils, lubricants, filters, and vehicle fluids. It is designed around quick fitment discovery: search by brand or viscosity, or save a vehicle and let the garage surface compatible products.

## Stack

- Vue 3 + TypeScript with `<script setup lang="ts">`
- Vite 7
- Tailwind CSS 4 with `@tailwindcss/vite`
- Vue Router 4
- Pinia with localStorage persistence for cart, vehicle, and preferences
- Vue Query provider for API-ready data fetching
- VueUse Motion provider and CSS view transitions
- Lucide Vue icons
- VeeValidate-compatible Zod validation foundation
- Vite PWA with an offline shell and auto-updating service worker
- Vitest + Vue Test Utils

## Run locally

```sh
npm install
npm run dev
```

The repository currently uses npm and `package-lock.json` so the setup is reproducible in the existing project environment. Production checks:

```sh
npm run type-check
npm run lint
npm run test:unit -- --run
npm run build
```

## Routes

- `/` — Discover home with hero, categories, featured products, and vehicle matching CTA
- `/onboarding` — Three-step first-use introduction
- `/shop` — Searchable catalog with viscosity/base filters and grid/list views
- `/search` — Recent searches and product suggestions
- `/product/:slug` — Product gallery, specs, compatibility status, and add-to-bag flow
- `/vehicle` — Make, model, year, and engine selector
- `/cart` — Persistent bag with quantities, totals, and empty state
- `/checkout` — Validated delivery/payment form and confirmation state
- `/profile` — Garage, account snapshot, orders, saved products, and settings entry points

## Architecture

- `src/pages` contains route-level views.
- `src/components/product` contains reusable product presentation.
- `src/data` contains realistic local catalog data for the MVP.
- `src/stores` owns persistent cart, vehicle, and user preference state.
- `src/types` contains domain models.
- `src/lib` contains pure formatting and validation utilities.
- `src/router` owns route definitions and navigation.

The visual system is defined in `src/assets/base.css`, `src/assets/main.css`, and `tailwind.config.js`. Dark surfaces, orange actions, cyan fitment states, rounded cards, and compact display typography are shared across all screens.
