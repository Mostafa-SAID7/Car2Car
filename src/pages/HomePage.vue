<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowDown,
  ArrowRight,
  Gauge,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Wrench,
} from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router'
import ProductCard from '@/components/product/ProductCard.vue'
import { products } from '@/data/products'
import { useVehicleStore } from '@/stores/vehicle'
import type { ProductCategory } from '@/types/product'
import { UiButton } from '@/components/ui'

const router = useRouter()
const vehicleStore = useVehicleStore()
const search = ref('')
const selectedCategory = ref<ProductCategory | 'All'>('All')
const categories: Array<{ label: ProductCategory | 'All'; icon: string }> = [
  { label: 'All', icon: '✦' },
  { label: 'Engine Oil', icon: '◉' },
  { label: 'Transmission', icon: '◆' },
  { label: 'Filters', icon: '▤' },
  { label: 'Coolants', icon: '✧' },
  { label: 'Grease', icon: '●' },
]
const heroProduct = products[0]
const featuredProducts = computed(() =>
  selectedCategory.value === 'All'
    ? products.slice(0, 4)
    : products.filter((product) => product.category === selectedCategory.value).slice(0, 4),
)
const recommendedProducts = computed(() =>
  vehicleStore.vehicle
    ? products
        .filter((product) => product.compatibleMakes.includes(vehicleStore.vehicle?.make ?? ''))
        .slice(0, 4)
    : [],
)
const brandMarks = ['CASTROL', 'MOBIL 1', 'SHELL', 'MOTUL', 'LIQUI MOLY', 'PETROMIN']

function searchProducts() {
  if (search.value.trim()) router.push({ path: '/shop', query: { q: search.value.trim() } })
}
</script>

<template>
  <div>
    <section
      class="relative mt-5 min-h-[620px] overflow-hidden rounded-[18px] border border-white/[0.22] bg-[#111318] sm:min-h-[680px] lg:min-h-[735px]"
    >
      <img
        :src="heroProduct.image"
        alt="Motor oil products for Egyptian roads"
        class="absolute inset-0 h-full w-full object-cover object-center opacity-[0.22] grayscale"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(67,72,78,0.26),transparent_34%),linear-gradient(180deg,rgba(10,12,15,0.78),rgba(10,12,15,0.45)_42%,#0b0d10_100%)]"
      ></div>
      <div
        class="absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#F5A710]/[0.08] blur-[100px]"
      ></div>
      <div
        class="relative z-10 flex min-h-[620px] flex-col px-5 pb-7 pt-5 sm:min-h-[680px] sm:px-10 sm:pb-10 sm:pt-7 lg:min-h-[735px] lg:px-12"
      >
        <div class="flex items-center justify-between">
          <p
            class="flex items-center gap-2 text-[9px] font-medium tracking-[0.08em] text-[#F5A710]"
          >
            <span class="h-1 w-1 rounded-full bg-[#F5A710]"></span> Cairo, Egypt
          </p>
          <p class="hidden text-[9px] font-bold tracking-[0.12em] text-[#F5A710] sm:block">
            MOTOR-OIL-EG / 2025
          </p>
        </div>
        <div class="mx-auto flex flex-1 flex-col items-center justify-center text-center">
          <p class="mb-7 text-[9px] font-bold uppercase tracking-[0.34em] text-[#8E96A3]">
            Premium oils for every Egyptian road
          </p>
          <h1
            class="display-font max-w-[950px] text-[clamp(3.8rem,10vw,9.2rem)] font-bold leading-[0.82] tracking-[-0.09em] text-[#F4F5F7]"
          >
            MOTOR OIL<span class="text-[#F5A710]">.</span><br /><span class="text-[#F4F5F7]"
              >MATCHED RIGHT.</span
            >
          </h1>
          <p
            class="mt-8 max-w-md text-[11px] uppercase tracking-[0.22em] text-[#A8AFBA] sm:text-xs"
          >
            Shop genuine oils from the brands your engine trusts — delivered across Egypt
          </p>
          <RouterLink
            to="/garage/add"
            class="group relative mt-10 grid h-28 w-28 place-items-center rounded-full border border-white/25 bg-[#0B0D10]/40 text-[9px] font-bold uppercase tracking-[0.16em] text-[#A8AFBA] backdrop-blur-sm transition hover:border-[#F5A710] hover:text-white sm:h-32 sm:w-32"
            ><span
              class="absolute inset-[-1px] rounded-full border border-transparent border-r-[#F5A710] border-t-[#F5A710] transition group-hover:rotate-45"
            ></span
            ><span>Select<br />your car</span
            ><ArrowDown :size="13" class="absolute bottom-5 text-[#F5A710]"
          /></RouterLink>
        </div>
        <div
          class="grid grid-cols-3 gap-3 border-t border-white/[0.1] pt-5 sm:grid-cols-6 sm:gap-6 sm:pt-7"
        >
          <div
            v-for="brand in brandMarks"
            :key="brand"
            class="text-center text-[10px] font-bold tracking-[-0.04em] text-white/[0.25] transition hover:text-white/[0.6] sm:text-xs"
          >
            {{ brand }}
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-5 py-12 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-20">
      <div>
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F5A710]/25 bg-[#F5A710]/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5A710]"
        >
          <Sparkles :size="13" /> Egypt's #1 Oil Marketplace
        </div>
        <h2
          class="display-font max-w-lg text-4xl font-bold leading-[0.95] tracking-[-0.07em] text-white sm:text-6xl"
        >
          Less guesswork.<br /><span class="text-[#F5A710]">More miles.</span>
        </h2>
        <p class="mt-6 max-w-md text-sm leading-relaxed text-[#8E96A3]">
          Genuine oils, filters and fluids matched to your car. Find exactly what your engine needs
          — fast delivery anywhere in Egypt.
        </p>
      </div>
      <form
        class="flex items-center rounded-xl border border-white/10 bg-[#14171C] p-1.5 focus-within:border-[#F5A710]/60"
        @submit.prevent="searchProducts"
      >
        <Search :size="17" class="ml-3 shrink-0 text-[#68707D]" /><label
          class="sr-only"
          for="home-search"
          >Search oil, brand or viscosity</label
        ><input
          id="home-search"
          v-model="search"
          type="search"
          placeholder="Search oil, brand or viscosity…"
          class="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-[#68707D]"
        /><UiButton
          type="submit"
          size="sm"
          class="rounded-lg bg-white/10 text-[11px] hover:bg-[#F5A710] hover:text-[#0B0D10]"
          >Search</UiButton
        >
      </form>
    </section>

    <section class="border-y border-white/[0.07] py-7">
      <div class="flex items-center justify-between gap-4">
        <p class="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E96A3]">
          Shop by category
        </p>
        <div class="hidden h-px flex-1 bg-white/[0.07] sm:block"></div>
        <RouterLink to="/catalog" class="shrink-0 text-[11px] font-semibold text-[#58D5E6]"
          >View all <ArrowRight :size="13" class="ml-1 inline"
        /></RouterLink>
      </div>
      <div class="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-1">
        <button
          v-for="category in categories"
          :key="category.label"
          class="flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition"
          :class="
            selectedCategory === category.label
              ? 'border-[#F5A710]/50 bg-[#F5A710]/10 text-white'
              : 'border-white/[0.08] bg-[#14171C] text-[#A8AFBA] hover:border-white/20'
          "
          :aria-pressed="selectedCategory === category.label"
          @click="selectedCategory = category.label"
        >
          <span
            class="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.06] text-sm text-[#F5A710]"
            >{{ category.icon }}</span
          ><span class="text-xs font-semibold">{{ category.label }}</span>
        </button>
      </div>
    </section>

    <section class="py-12 sm:py-14 lg:py-16">
      <div class="mb-8 flex items-start justify-between gap-4 sm:mb-10">
        <h2
          class="display-font text-[25px] font-bold uppercase leading-none tracking-[-0.07em] text-white sm:text-3xl"
        >
          Popular products
        </h2>
        <RouterLink
          to="/catalog"
          class="group hidden items-center gap-2 border-b border-[#F5A710]/50 pb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#8E96A3] transition hover:text-white sm:flex"
          >Catalog
          <ArrowRight :size="12" class="text-[#F5A710] transition group-hover:translate-x-0.5"
        /></RouterLink>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
      <RouterLink
        to="/catalog"
        class="mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-xs font-semibold text-[#A8AFBA] sm:hidden"
        >View catalog <ArrowRight :size="14"
      /></RouterLink>
    </section>

    <section
      v-if="vehicleStore.vehicle && recommendedProducts.length"
      class="border-y border-white/[0.07] py-14 lg:py-16"
    >
      <div class="mb-7 flex items-end justify-between gap-4">
        <div>
          <p
            class="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#58D5E6]"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-[#58D5E6]"></span> Matched to your garage
          </p>
          <h2 class="display-font text-3xl font-bold tracking-[-0.05em] text-white sm:text-4xl">
            For your {{ vehicleStore.vehicle.make }}.
          </h2>
          <p class="mt-2 text-xs text-[#8E96A3]">
            {{ vehicleStore.vehicle.model }} · {{ vehicleStore.vehicle.year }} ·
            {{ vehicleStore.vehicle.engine }}
          </p>
        </div>
        <RouterLink
          to="/catalog"
          class="hidden items-center gap-1 text-xs font-semibold text-[#8E96A3] hover:text-white sm:flex"
          >See all matches <ArrowRight :size="14"
        /></RouterLink>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <ProductCard v-for="product in recommendedProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <section class="grid gap-5 py-12 lg:grid-cols-[1.3fr_1fr] lg:py-20">
      <div
        class="relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#15191F] p-7 sm:p-10"
      >
        <div
          class="absolute -right-10 -top-14 h-48 w-48 rounded-full bg-[#58D5E6]/10 blur-3xl"
        ></div>
        <div class="relative max-w-md">
          <div
            class="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#58D5E6]/10 text-[#58D5E6]"
          >
            <Gauge :size="22" />
          </div>
          <p class="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#58D5E6]">
            Not sure what fits?
          </p>
          <h2 class="display-font text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
            Your car knows best.
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-[#8E96A3]">
            Add your vehicle once and we'll surface the exact fluids, filters, and service intervals
            recommended for Egyptian road conditions.
          </p>
          <RouterLink
            to="/garage/add"
            class="mt-6 inline-flex items-center gap-2 text-xs font-bold text-white transition hover:text-[#58D5E6]"
            >Build your garage <ArrowRight :size="14"
          /></RouterLink>
        </div>
      </div>
      <div class="rounded-[26px] border border-white/[0.08] bg-[#14171C] p-7 sm:p-10">
        <p class="mb-6 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E96A3]">
          The Motor-Oil-EG Standard
        </p>
        <div class="space-y-5">
          <div class="flex gap-3">
            <ShieldCheck :size="19" class="mt-0.5 shrink-0 text-[#F5A710]" />
            <div>
              <p class="text-sm font-semibold text-white">100% Genuine, always</p>
              <p class="mt-1 text-xs leading-relaxed text-[#8E96A3]">
                Sourced directly from authorized Egyptian distributors.
              </p>
            </div>
          </div>
          <div class="flex gap-3">
            <Wrench :size="19" class="mt-0.5 shrink-0 text-[#F5A710]" />
            <div>
              <p class="text-sm font-semibold text-white">Expert selected</p>
              <p class="mt-1 text-xs leading-relaxed text-[#8E96A3]">
                Real specs matched to your make, model and Egyptian climate.
              </p>
            </div>
          </div>
          <div class="flex gap-3">
            <SlidersHorizontal :size="19" class="mt-0.5 shrink-0 text-[#F5A710]" />
            <div>
              <p class="text-sm font-semibold text-white">Fast nationwide delivery</p>
              <p class="mt-1 text-xs leading-relaxed text-[#8E96A3]">
                Delivered to your door across all of Egypt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
