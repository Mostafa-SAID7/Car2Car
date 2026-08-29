# Motor-Oil-EG — Egyptian Motor Oil Marketplace

Motor-Oil-EG is a mobile-first Egyptian marketplace for premium motor oils, lubricants, filters,
and vehicle fluids. It is designed around quick fitment discovery: search by brand or viscosity, or
save a vehicle and let the garage surface compatible products. All prices are in EGP (Egyptian
Pound). Location context defaults to Cairo, Egypt.

## Stack

- Vue 3.5 + TypeScript with `<script setup lang="ts">` (Composition API only)
- Vite 7
- Tailwind CSS 3.4 with PostCSS/Autoprefixer via `tailwind.config.js`
- Vue Router 4
- Pinia with `pinia-plugin-persistedstate` for cart, vehicle, wishlist, and preferences
- VeeValidate + Zod for checkout form validation
- Lucide Vue Next icons
- Vite PWA plugin with offline shell and install prompt
- Vitest + Vue Test Utils

## Run locally

```sh
npm install
npm run dev
```

The repository uses npm and `package-lock.json`. Production checks:

```sh
npm run type-check   # vue-tsc --build
npm run lint         # ESLint 9 --max-warnings=0
npm run test:unit -- --run
npm run build
```

## Routes

| Path             | Page                  | Notes                                                 |
| ---------------- | --------------------- | ----------------------------------------------------- |
| `/`              | `HomePage.vue`        | Hero, categories, bestsellers, vehicle CTA            |
| `/about`         | `OnboardingPage.vue`  | Brand story / onboarding                              |
| `/catalog`       | `CatalogPage.vue`     | Filterable catalog (brand, viscosity, base, category) |
| `/search`        | `SearchPage.vue`      | Debounced search with recent history                  |
| `/product/:slug` | `ProductPage.vue`     | Gallery, specs, reviews, add-to-cart                  |
| `/garage`        | `ProfilePage.vue`     | Saved vehicles, orders, sign out                      |
| `/garage/add`    | `VehiclePage.vue`     | Make → Model → Year → Engine selector                 |
| `/cart`          | `CartPage.vue`        | Persistent bag with quantities and totals             |
| `/checkout`      | `CheckoutPage.vue`    | Delivery/payment form and confirmation                |
| `/delivery`      | `PlaceholderPage.vue` | Delivery info                                         |
| `/partners`      | `PlaceholderPage.vue` | B2B partner program                                   |
| `/help`          | `PlaceholderPage.vue` | Help center / contact                                 |
| `/error`         | `ErrorPage.vue`       | Error display                                         |

**Bottom nav (mobile):** Discover (`/`) · Shop (`/catalog`) · Bag (`/cart`) · Garage (`/garage`)

## Architecture

- `src/pages` — route-level views
- `src/components/product` — reusable product presentation
- `src/components/ui` — custom UI primitives (`UiButton`, `UiCard`, `UiBadge`, `UiAccordion`)
- `src/components/layout` — `AppFooter`, `ErrorBoundary`, `PwaStatus`
- `src/data` — 15 realistic local catalog products with EGP prices for the MVP
- `src/stores` — Pinia stores: cart, vehicle, user, wishlist, onboarding, orders, ui
- `src/types` — domain models: `Product`, `CartLine`, `OrderAddress`, `Vehicle`
- `src/lib` — pure utilities: `cn()`, `formatPrice()`, `validators.ts`, `errors.ts`
- `src/router` — all route definitions and `onError` handler

## Design system

The visual system is defined in `src/assets/base.css` (CSS variables), `src/assets/main.css`
(Tailwind imports + Google Fonts), and `tailwind.config.js` (custom color tokens: `ink`, `panel`,
`elevated`, `orange`, `cyan`). Dark surfaces, amber/orange actions, cyan fitment states, rounded
cards, and compact Space Grotesk display typography are shared across all screens. No
`<style scoped>` blocks — all styling via Tailwind utility classes.
