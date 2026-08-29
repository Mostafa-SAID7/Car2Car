# Motor-Oil-EG Egyptian Marketplace – Full Production Prompt (Vue 3)

## 1. Project Goal

Build a modern, production-grade **mobile-first marketplace app** for selling motor oils,
lubricants, filters and related auto fluids specifically for the Egyptian market.
Location references must use **Cairo, Egypt**. All prices are in **EGP (Egyptian Pound)**.

The design inspiration is the Behance project "Motor Oil Store UX/UI" by Daria Bandurko:
dark theme, premium product photography, clean cards, strong hierarchy, automotive feel.

The app must feel premium, fast, and native-like on mobile while remaining fully responsive.

Primary users: Egyptian car owners who need the right oil by viscosity, brand, vehicle
make/model/year, or performance level (API, ACEA spec).

---

## 2. Tech Stack (strict)

| Layer           | Technology                                                         |
| --------------- | ------------------------------------------------------------------ |
| Framework       | Vue 3.5 + TypeScript (Composition API only, `<script setup>`)      |
| Build Tool      | Vite 7                                                             |
| Styling         | Tailwind CSS 3.4 + PostCSS/Autoprefixer (via `tailwind.config.js`) |
| Fonts           | Inter (body) + Space Grotesk (display headings) – Google Fonts     |
| UI Primitives   | Custom `Ui*.vue` components (UiButton, UiCard, UiBadge, etc.)      |
| Icons           | `lucide-vue-next`                                                  |
| State           | Pinia (with `pinia-plugin-persistedstate` for cart & preferences)  |
| Routing         | Vue Router 4                                                       |
| Forms           | VeeValidate + Zod                                                  |
| PWA             | `vite-plugin-pwa` (offline shell + install prompt)                 |
| Package Manager | **npm** (not pnpm)                                                 |
| Linting         | ESLint 9 + Prettier                                                |
| Type Checking   | TypeScript 5 strict + `vue-tsc`                                    |
| Testing         | Vitest + Vue Test Utils                                            |

**Do NOT use:** Options API, Vuex, Bootstrap, Material UI, pnpm, or TailwindCSS v4.

---

## 3. Design System & Visual Direction

### Color Palette (dark-first)

| Token          | Value                    | Usage                                 |
| -------------- | ------------------------ | ------------------------------------- |
| `--bg` / `ink` | `#0B0D10`                | App background                        |
| `--panel`      | `#14171C`                | Cards, modals, bottom sheets          |
| `--elevated`   | `#1B1F26`                | Elevated surfaces, inputs             |
| `--input`      | `#0F1216`                | Form inputs                           |
| `--orange`     | `#F5A710`                | Primary accent – CTAs, prices, active |
| `--cyan`       | `#58D5E6`                | Secondary accent – links, badges      |
| `--text`       | `#F4F5F7`                | Primary text                          |
| `--muted`      | `#8E96A3`                | Secondary/muted text                  |
| `--soft`       | `#A8AFBA`                | Tertiary text                         |
| `--line`       | `rgba(255,255,255,0.08)` | Borders                               |

Tailwind config extends with named colors: `ink`, `panel`, `elevated`, `orange`, `cyan`.

### Typography

- **Display / headings:** `Space Grotesk` – bold, tight tracking, class `display-font`
- **Body:** `Inter` / system-ui
- **Accent labels:** 9–11px, uppercase, letter-spacing `0.12–0.18em`, in orange/cyan
- Use Tailwind scale consistently; avoid arbitrary font sizes unless truly needed.

### Component Style Rules

- Cards: `rounded-2xl` or `rounded-xl`, `border border-white/[0.08]`, background `bg-[#14171C]`
- No `<style scoped>` blocks — all styling via Tailwind utility classes in the template
- No `!important` overrides — use CSS variables (`var(--bg)`) or Tailwind tokens
- Inputs: `h-[46px] border border-white/10 rounded-xl bg-[#0f1216] px-3.5 focus:border-[#f5a710]`
- Buttons primary: `bg-[#F5A710] text-[#0B0D10] font-bold rounded-xl hover:bg-[#FFC233]`
- Transitions: `transition` with `180ms ease` (no heavy spring libraries)

---

## 4. Route Map

| Path             | Name         | Component             | Notes                         |
| ---------------- | ------------ | --------------------- | ----------------------------- |
| `/`              | `home`       | `HomePage.vue`        | Landing / discover            |
| `/about`         | `about`      | `OnboardingPage.vue`  | Brand story / onboarding      |
| `/catalog`       | `catalog`    | `CatalogPage.vue`     | Main product catalog          |
| `/search`        | `search`     | `SearchPage.vue`      | Search results                |
| `/product/:slug` | `product`    | `ProductPage.vue`     | Product detail                |
| `/garage`        | `garage`     | `ProfilePage.vue`     | User profile + saved vehicles |
| `/garage/add`    | `garage-add` | `VehiclePage.vue`     | Add / select a vehicle        |
| `/cart`          | `cart`       | `CartPage.vue`        | Shopping bag                  |
| `/checkout`      | `checkout`   | `CheckoutPage.vue`    | Order + payment               |
| `/delivery`      | `delivery`   | `PlaceholderPage.vue` | Delivery info                 |
| `/partners`      | `partners`   | `PlaceholderPage.vue` | B2B partner program           |
| `/help`          | `help`       | `PlaceholderPage.vue` | Help center / contact         |
| `/error`         | `error`      | `ErrorPage.vue`       | Error display                 |

**Bottom navigation tabs (mobile):** Discover (`/`) · Shop (`/catalog`) · Bag (`/cart`) · Garage (`/garage`)

---

## 5. Actual Folder & File Structure

```
Car2Car/                          ← project root
├── index.html                   ← favicon, meta, PWA manifest link
├── vite.config.ts               ← Vite 7 + tailwindcss + VitePWA + vueDevTools
├── tailwind.config.js           ← Tailwind 3.4 with custom color tokens
├── tsconfig.json
├── package.json                 ← npm (not pnpm)
├── public/
│   ├── motor-oil-eg-favicon.svg ← SVG oil-drop favicon (modern browsers)
│   ├── motor-oil-eg-icon.svg   ← SVG oil-drop icon (PWA 192/512, iOS)
│   └── favicon.ico             ← Legacy ICO fallback
├── prompts/
│   └── start.md                ← This file
├── docker/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── compose.yaml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── container.yml
│       └── release.yml
└── src/
    ├── App.vue                  ← Root shell: sticky header, bottom nav, footer
    ├── main.ts                  ← App bootstrap + Pinia + Router
    ├── env.d.ts
    ├── assets/
    │   ├── main.css             ← @import tailwindcss, @config, @theme tokens
    │   └── base.css             ← CSS variables (--bg, --panel, etc.), scrollbars, transitions
    ├── components/
    │   ├── icons/               ← Default Vue starter icons (can be removed)
    │   ├── layout/
    │   │   ├── AppFooter.vue    ← Full footer with contact cards, newsletter, links
    │   │   ├── ErrorBoundary.vue
    │   │   └── PwaStatus.vue
    │   ├── product/
    │   │   └── ProductCard.vue
    │   └── ui/                  ← Custom UI primitives
    │       ├── UiAccordion.vue
    │       ├── UiBadge.vue
    │       ├── UiButton.vue
    │       ├── UiCard.vue
    │       └── index.ts
    ├── data/
    │   └── products.ts          ← 15 Egyptian-market mock products (EGP prices)
    ├── lib/
    │   ├── errors.ts
    │   ├── utils.ts             ← cn(), formatPrice()
    │   └── validators.ts        ← Zod schemas (checkoutSchema, etc.)
    ├── mocks/
    │   └── catalog.ts
    ├── pages/
    │   ├── CartPage.vue
    │   ├── CatalogPage.vue      ← Filters, grid/list toggle, sort, category chips
    │   ├── CheckoutPage.vue     ← Address + payment form, order confirmation
    │   ├── ErrorPage.vue
    │   ├── HomePage.vue         ← Hero, categories, bestsellers, vehicle CTA
    │   ├── OnboardingPage.vue   ← Brand story / about (/about route)
    │   ├── PlaceholderPage.vue  ← Stub for /delivery, /partners, /help
    │   ├── ProductPage.vue      ← Detail: gallery, specs, reviews, add-to-cart
    │   ├── ProfilePage.vue      ← Garage: saved vehicles, orders, sign out
    │   ├── SearchPage.vue
    │   └── VehiclePage.vue      ← Vehicle selector (Make→Model→Year)
    ├── router/
    │   └── index.ts             ← All routes (see Route Map above)
    ├── services/
    │   ├── api.ts
    │   ├── orders.ts
    │   └── products.ts
    ├── stores/
    │   ├── cart.ts              ← localStorage key: motor-oil-eg-cart
    │   ├── onboarding.ts        ← localStorage key: motor-oil-eg-onboarding
    │   ├── orders.ts            ← localStorage key: motor-oil-eg-orders
    │   ├── ui.ts                ← Theme, modals
    │   ├── user.ts              ← localStorage key: motor-oil-eg-user
    │   ├── vehicle.ts           ← localStorage key: motor-oil-eg-vehicle
    │   └── wishlist.ts          ← localStorage key: motor-oil-eg-wishlist
    └── types/
        ├── cart.ts              ← CartLine, OrderAddress
        ├── order.ts
        ├── product.ts           ← Product, ProductCategory, OilBase, Review
        ├── user.ts
        └── vehicle.ts
```

---

## 6. Core Domain Models (TypeScript – as implemented)

```ts
// src/types/product.ts
export type OilBase = 'Full Synthetic' | 'Synthetic Blend' | 'Mineral'
export type ProductCategory = 'Engine Oil' | 'Transmission' | 'Filters' | 'Coolants' | 'Grease'

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  body: string
  verified: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: ProductCategory
  viscosity: string // e.g. "5W-30"
  volume: string // e.g. "4L", "1L"
  base: OilBase
  price: number // EGP
  originalPrice?: number // EGP – for discount display
  rating: number // 0–5
  reviewCount: number
  images: string[] // array of image URLs
  image: string // primary image URL (shortcut)
  stock: number
  specs: Record<string, string>
  description: string
  reviews: Review[]
  compatibleMakes: string[] // e.g. ["Toyota","Hyundai","Kia"]
  tags: string[]
  isBestseller?: boolean
  isNew?: boolean
}

// src/types/cart.ts
export interface CartLine {
  product: Product
  quantity: number
}

export interface OrderAddress {
  name: string
  street: string
  city: string // default: Cairo
  postalCode: string
}
```

---

## 7. Key Features (implemented)

- **Product catalog** with category chips, grid/list toggle, sort, and advanced filters panel
  (Brand checkboxes, Viscosity SAE select, Base formula select, In-stock toggle)
- **Product detail** with specs accordion, reviews, compatible vehicles, add-to-cart
- **Vehicle Selector** — Make → Model → Year → Engine flow (`/garage/add`)
- **Vehicle-based compatibility check** on product pages
- **Persistent cart** via Pinia + `pinia-plugin-persistedstate` (`motor-oil-eg-cart`)
- **Wishlist** persisted to `motor-oil-eg-wishlist`
- **Checkout flow** with Zod-validated form (email, name, address, card mock)
- **Order confirmation** screen with Egyptian delivery estimate (1-3 business days)
- **Garage page** — saved vehicles, recent orders, sign out
- **Search page** — debounced search with query params
- **Footer** — contact cards (phone, social, email), newsletter subscribe, links grid
- **PWA** — offline shell, install prompt, manifest with oil-drop icon
- **Error boundary** — graceful crash handling
- **Fade page transitions** — `out-in` mode with `translateY` enter/leave

---

## 8. Logo & Favicon System

The brand identity uses a **consistent oil-drop SVG icon** across all surfaces:

| Surface                  | File                              | Size             |
| ------------------------ | --------------------------------- | ---------------- |
| Browser tab              | `public/motor-oil-eg-favicon.svg` | 64×64 viewBox    |
| PWA / iOS home screen    | `public/motor-oil-eg-icon.svg`    | 512×512 viewBox  |
| Header nav logo (inline) | `src/App.vue` (inline SVG)        | 28×28px rendered |
| Legacy browsers          | `public/favicon.ico`              | 32×32 ICO        |

**Icon design:** Amber oil-drop shape with a three-stop gradient (`#FFD659 → #F5A710 → #B87500`),
a dark inner shadow for depth, a radial white sheen for gloss, and a highlight curve stroke.
The wordmark beside it reads `MOTOR` (amber) + `OIL` (white) + `.EG` (amber) in Space Grotesk.

---

## 9. Styling Architecture

- **No `<style scoped>` blocks** in any component — all styles are Tailwind utility classes.
- **`src/assets/base.css`** — CSS variables only: colors, scrollbar, `::selection`, page transitions
- **`src/assets/main.css`** — `@import tailwindcss`, `@config`, `@theme` tokens, Google Fonts import
- **`tailwind.config.js`** — extends colors (`ink`, `panel`, `elevated`, `orange`, `cyan`) and shadows (`glow`)
- **No `!important` overrides** anywhere in the codebase

---

## 10. Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (Vite)
npm run build        # Type-check + production build
npm run preview      # Preview production build
npm run format       # Prettier --write src/
npm run lint         # ESLint
npm run type-check   # vue-tsc --build
npm run test:unit    # Vitest
```

---

## 11. Egyptian Market Content

- **Currency:** EGP (Egyptian Pound) — all prices formatted as `EGP X,XXX`
- **Phone:** `+20 2 1234 5678`
- **Email:** `info@motor-oil-eg.com`
- **Address:** Cairo, Egypt
- **Delivery:** 1–3 business days across Egypt
- **Product brands:** Castrol, Mobil 1, Shell, Total, Motul, Liqui Moly, Petromin
- **Social:** WhatsApp, Facebook, Instagram (Egyptian-market links)
- **Categories:** Engine Oil, Transmission, Filters, Coolants, Grease

---

## 12. Quality Bar

- Zero `any` / `unknown` in TypeScript (strict mode)
- No prop drilling — use Pinia stores or `provide`/`inject`
- Components ideally under 200 lines
- Consistent naming: `PascalCase` components, `camelCase` functions, `kebab-case` routes
- Every route has a meaningful URL (no `/page1`, `/view2`)
- Beautiful empty / loading / error states
- ARIA labels on all interactive elements
- Feels like a real App Store product
