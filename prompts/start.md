# Motor Oil Mobile Marketplace – Full Production Prompt (Vue 3)

## 1. Project Goal
Build a modern, production-grade **mobile-first marketplace app** for selling motor oils, lubricants, filters and related auto fluids.
The design inspiration is the Behance project “Motor Oil Store UX/UI” by Daria Bandurko (dark theme, premium product photography, clean cards, strong hierarchy, automotive feel).
The app must feel premium, fast, and native-like on mobile while remaining fully responsive.

Primary users: car owners who need the right oil by viscosity, brand, vehicle make/model/year, or performance level (API, ACEA, etc.).

## 2. Tech Stack (strict)
- **Framework**: Vue 3 + TypeScript (Composition API only, `<script setup lang="ts">`)
- **Build**: Vite 6+
- **Styling**: Tailwind CSS 4 + `@tailwindcss/vite`
- **UI Components**: `shadcn-vue` (latest) – use the full set of primitives (Button, Card, Dialog, Sheet, Select, Tabs, Badge, Skeleton, Toast, etc.)
- **Icons**: `lucide-vue-next`
- **Animations / Motion**: `@vueuse/motion` + Motion One / CSS view transitions where appropriate. Prefer declarative motion over heavy libraries.
- **State**: Pinia (with persisted state for cart & user preferences)
- **Routing**: Vue Router 4 (with typed routes if possible)
- **Data Fetching**: `@tanstack/vue-query` (or Vue Query)
- **Forms**: VeeValidate + Zod
- **HTTP**: ofetch / ky
- **Utilities**: VueUse, clsx, tailwind-merge, date-fns
- **PWA**: Vite PWA plugin (offline shell + install prompt)
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier + oxlint (or biome), TypeScript strict, Vue TSC
- **Testing** (optional but recommended): Vitest + Vue Test Utils + Playwright for critical flows

Do **not** use Options API, Vuex, Bootstrap, Material, or any heavy component library besides shadcn-vue.

## 3. Design System & Visual Direction
Extract and implement a cohesive design system from the Behance reference:

### Color Palette (dark-first)
- Background: near-black / deep charcoal (#0B0D10 – #12151A)
- Surface / Cards: #1A1D23 – #22262E
- Primary Accent: energetic orange / amber (e.g. #F97316 or #FF6B00) – used for CTAs, prices, active states
- Secondary: cool blue or cyan for secondary actions / links
- Success / Warning / Error: standard semantic colors
- Text: high-contrast white / soft gray hierarchy
- Borders: subtle white/10 – white/5

### Typography
- Headings: bold, tight tracking, modern sans (Inter or Geist)
- Body: Inter / system-ui
- Product names & prices: strong weight
- Use Tailwind typography scale consistently

### Components Style
- Rounded cards (rounded-2xl or rounded-xl)
- Soft elevation / subtle borders instead of heavy shadows
- Product cards: large product image (oil bottle), brand badge, viscosity badge (e.g. 5W-30), price, rating, “Add to cart” that turns into quantity stepper
- Bottom navigation bar (Home, Catalog, Cart, Profile) – floating or solid dark
- Large hero banners with car / engine / oil imagery
- Filter chips and bottom sheets for mobile filters
- Skeleton loaders everywhere
- Micro-interactions: scale on press, smooth page transitions, staggered list animations, success confetti or checkmark on add-to-cart

### Key Screens (must match the spirit of the Behance project)
1. Splash + Onboarding (3 slides)
2. Home
   - Search bar
   - Category horizontal scroll (Engine Oil, Transmission, Filters, Grease, Care…)
   - Promo / Hero carousel
   - Bestsellers / Featured
   - “Recommended for your vehicle” (if vehicle is selected)
3. Catalog / Shop
   - Sticky search + filter button
   - Advanced filters (bottom sheet): Brand, Viscosity (SAE), Base (Synthetic/Semi/Mineral), Vehicle type, Price range, API/ACEA spec, Availability
   - Grid / List toggle
   - Sort
4. Product Detail
   - Image gallery (swipeable)
   - Brand + viscosity + volume badges
   - Price + stock
   - “Compatible with your car?” checker
   - Specs table / accordion
   - Reviews
   - Sticky “Add to Cart” / Buy Now
5. Vehicle Selector (modal or dedicated flow) – Make → Model → Year → Engine
6. Cart (with quantity, remove, promo code, estimated total)
7. Checkout (address, payment method mock, order summary)
8. Profile / Orders / Wishlist / Settings
9. Search results with recent searches + suggestions
10. Empty states, error states, offline state

## 4. Folder & File Structure (strict SOLID / Clean Architecture inspired)
src/
├── app/                          # App-level (providers, router, main)
│   ├── App.vue
│   ├── main.ts
│   ├── router/
│   │   ├── index.ts
│   │   └── routes.ts
│   └── providers/
├── assets/
│   ├── images/
│   ├── fonts/
│   └── styles/
│       ├── main.css              # Tailwind + custom properties
│       └── themes.css
├── components/
│   ├── ui/                       # shadcn-vue components (auto-generated + customized)
│   ├── common/                   # Button variants, Loading, EmptyState, ErrorBoundary…
│   ├── layout/                   # AppHeader, BottomNav, PageContainer, SafeArea
│   ├── product/                  # ProductCard, ProductGrid, ProductGallery, SpecsTable
│   ├── catalog/                  # FiltersSheet, SortSelect, CategoryChips
│   ├── cart/                     # CartItem, CartSummary, QuantityStepper
│   ├── vehicle/                  # VehicleSelector, VehicleBadge
│   └── home/                     # HeroCarousel, CategoryScroll, SectionHeader
├── composables/                  # useCart, useVehicle, useProductFilters, useDebounceSearch…
├── features/                     # Feature-based modules (preferred over pure technical)
│   ├── auth/
│   ├── catalog/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   ├── vehicle/
│   └── profile/
├── lib/                          # Pure utilities, constants, helpers
│   ├── utils.ts                  # cn(), formatPrice, etc.
│   ├── constants.ts
│   └── validators.ts
├── stores/                       # Pinia stores
│   ├── cart.ts
│   ├── user.ts
│   ├── vehicle.ts
│   └── ui.ts
├── types/                        # Global types & Zod schemas
│   ├── product.ts
│   ├── cart.ts
│   ├── vehicle.ts
│   └── api.ts
├── services/                     # API layer (ofetch wrappers)
│   ├── api.ts
│   ├── products.ts
│   └── orders.ts
├── mocks/                        # MSW or simple JSON for development
└── pages/                        # Route-level views (or views/)
├── HomePage.vue
├── CatalogPage.vue
├── ProductPage.vue
├── CartPage.vue
├── CheckoutPage.vue
├── ProfilePage.vue
└── ...
textRules:
- One responsibility per file / component.
- Prefer composition over inheritance.
- Keep presentational components dumb; put logic in composables or stores.
- Never put business logic inside templates.
- Use `defineModel`, `defineEmits`, typed props.
- Extract repeated UI into components early.

## 5. Core Domain Models (TypeScript)

```ts
// types/product.ts
interface Product {
  id: string
  slug: string
  name: string
  brand: string
  viscosity: string          // "5W-30"
  volume: string             // "4L", "1L"
  base: "Synthetic" | "Semi-Synthetic" | "Mineral"
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  stock: number
  specs: Record<string, string>
  description: string
  tags: string[]
  isBestseller?: boolean
  isNew?: boolean
}

interface Vehicle {
  make: string
  model: string
  year: number
  engine?: string
}
Cart, Order, User, FilterState, etc. must be fully typed and validated with Zod.
6. Key Features to Implement

Vehicle-based recommendation engine (simple matching for MVP)
Persistent cart (localStorage via Pinia persistedstate)
Optimistic UI for add/remove from cart
Advanced mobile filters (bottom sheet + chips)
Infinite scroll or pagination with Vue Query
Search with debounce + recent searches
Toast notifications (sonner or shadcn toast)
Dark mode only (or system + forced dark)
Responsive: mobile-first, tablet & desktop enhancements
Accessibility: proper ARIA, focus management, keyboard support
Performance: lazy routes, image optimization (vite-imagetools or similar), skeleton screens

7. Animation Guidelines

Page enter/leave transitions
List items stagger with @vueuse/motion
Button press scale
Cart badge bounce on add
Bottom sheet / dialog spring animations
Smooth quantity stepper
Avoid over-animation – keep it premium and purposeful

8. Development Commands & Tooling

pnpm create vite@latest motor-oil-app --template vue-ts
Install all packages listed above
Set up shadcn-vue properly (npx shadcn-vue@latest init)
Configure Tailwind with CSS variables for the design tokens
Add path aliases (@/)
Strict TypeScript + ESLint flat config
Pre-commit hooks (husky + lint-staged) optional but recommended

9. Deliverables

Fully working Vue 3 app with the structure above
Mock data that looks realistic (popular brands: Castrol, Mobil, Shell, Total, Motul, Liqui Moly, etc.)
All major screens wired with navigation
Clean, readable, well-commented code following the rules
README with setup instructions, architecture explanation, and design decisions
Optional: Storybook or simple component playground

10. Quality Bar

Zero any / unknown in TypeScript (strict)
No prop drilling – use provide/inject or stores when needed
Components under 150–200 lines ideally
Consistent naming (PascalCase components, camelCase functions)
Beautiful empty / loading / error states
Feels like a real App Store product