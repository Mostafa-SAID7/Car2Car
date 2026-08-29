<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bell, CarFront, Grid2X2, MapPin, Menu, Moon, Phone, Search, ShoppingBag, Sparkles, Sun, UserRound, X } from 'lucide-vue-next'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import AppFooter from '@/components/layout/AppFooter.vue'
import ErrorBoundary from '@/components/layout/ErrorBoundary.vue'
import PwaStatus from '@/components/layout/PwaStatus.vue'
import { useCartStore } from '@/stores/cart'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const cart = useCartStore()
const ui = useUiStore()
const mobileMenuOpen = ref(false)
const cartLabel = computed(() => cart.count > 0 ? `${cart.count}` : '')
const navItems = [
  { label: 'Deals', to: '/shop', name: 'shop' },
  { label: 'Reviews', to: '/shop', name: 'reviews' },
  { label: 'About', to: '/onboarding', name: 'about' },
  { label: 'Delivery', to: '/checkout', name: 'delivery' },
  { label: 'Partners', to: '/profile', name: 'partners' },
  { label: 'Help', to: '/search', name: 'help' },
]
</script>

<template>
  <ErrorBoundary>
  <div class="min-h-screen overflow-x-hidden bg-[#0B0D10] text-[#F4F5F7]">
    <a href="#app-content" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#F5A710] focus:px-4 focus:py-3 focus:text-xs focus:font-bold focus:text-[#0B0D10]">Skip to content</a>
    <header class="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0B0D10]/90 backdrop-blur-xl">
      <div class="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div class="relative flex h-[54px] items-center justify-between border-b border-white/[0.06] lg:h-[58px]">
          <div class="hidden items-center gap-2 text-[9px] font-medium uppercase tracking-[0.12em] text-[#8E96A3] sm:flex"><MapPin :size="11" class="text-[#F5A710]" /> Austin, TX</div>
          <RouterLink to="/" class="absolute left-1/2 flex -translate-x-1/2 items-center gap-2"><span class="relative grid h-6 w-6 place-items-center rounded-md bg-[#F5A710] text-[#0B0D10]"><span class="absolute h-2.5 w-2.5 rounded-full border-2 border-[#0B0D10]"></span><span class="absolute h-[2px] w-5 rotate-45 rounded-full bg-[#0B0D10]"></span></span><span class="display-font text-[16px] font-bold tracking-[-0.06em] text-[#F5A710]">torque<span class="text-[#F4F5F7]">.</span></span></RouterLink>
          <div class="ml-auto flex items-center gap-1.5 sm:gap-2"><a href="tel:+18008677253" class="mr-2 hidden items-center gap-2 text-[10px] font-bold tracking-[0.1em] text-[#F5A710] lg:flex"><Phone :size="12" /> 1 800 500 84 93</a><RouterLink to="/search" aria-label="Search" class="grid h-8 w-8 place-items-center rounded-md border border-white/[0.08] text-[#8E96A3] transition hover:border-[#F5A710]/40 hover:text-white"><Search :size="14" /></RouterLink><button :aria-label="ui.isLight ? 'Switch to dark theme' : 'Switch to light theme'" :title="ui.isLight ? 'Switch to dark theme' : 'Switch to light theme'" class="grid h-8 w-8 place-items-center rounded-md border border-white/[0.08] text-[#8E96A3] transition hover:border-[#F5A710]/40 hover:text-[#F5A710]" @click="ui.toggle"><Sun v-if="ui.isLight" :size="14" /><Moon v-else :size="14" /></button><button aria-label="Notifications" class="hidden h-8 w-8 place-items-center rounded-md border border-white/[0.08] text-[#8E96A3] transition hover:text-white sm:grid"><Bell :size="14" /></button><RouterLink to="/profile" aria-label="Profile" class="hidden h-8 w-8 place-items-center rounded-md border border-white/[0.08] text-[#8E96A3] transition hover:text-white sm:grid"><UserRound :size="14" /></RouterLink><RouterLink to="/cart" aria-label="Cart" class="relative grid h-8 w-8 place-items-center rounded-md border border-[#F5A710]/60 bg-[#F5A710] text-[#0B0D10] transition hover:bg-[#FFC233]"><ShoppingBag :size="14" stroke-width="2.5" /><span v-if="cartLabel" role="status" aria-live="polite" class="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full border-2 border-[#0B0D10] bg-[#58D5E6] px-1 text-[8px] font-bold">{{ cartLabel }}</span></RouterLink><button aria-label="Open menu" aria-controls="mobile-navigation" :aria-expanded="mobileMenuOpen" class="grid h-8 w-8 place-items-center rounded-md border border-white/[0.08] text-[#8E96A3] sm:hidden" @click="mobileMenuOpen = !mobileMenuOpen"><X v-if="mobileMenuOpen" :size="17" /><Menu v-else :size="17" /></button></div>
        </div>
        <div class="hidden h-[50px] items-center lg:flex"><RouterLink to="/shop" class="mr-6 inline-flex h-7 items-center gap-2 rounded-md bg-white/[0.06] px-4 text-[9px] font-bold uppercase tracking-[0.14em] text-[#A8AFBA] transition hover:bg-[#F5A710] hover:text-[#0B0D10]" :class="{ 'bg-[#F5A710] text-[#0B0D10]': route.name === 'shop' }"><Grid2X2 :size="12" /> Catalog</RouterLink><nav class="flex flex-1 items-center justify-center gap-7"><RouterLink v-for="item in navItems" :key="item.name" :to="item.to" class="text-[9px] font-medium uppercase tracking-[0.16em] text-[#68707D] transition hover:text-white" :class="{ 'text-[#F5A710]': route.name === item.name }" :aria-current="route.name === item.name ? 'page' : undefined">{{ item.label }}</RouterLink></nav><RouterLink to="/vehicle" class="ml-6 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#58D5E6] hover:text-white"><CarFront :size="12" /> Fit my car</RouterLink></div>
        <div v-if="mobileMenuOpen" id="mobile-navigation" class="border-t border-white/[0.07] py-4 lg:hidden"><nav class="grid grid-cols-2 gap-1"><RouterLink to="/shop" class="rounded-lg px-3 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#A8AFBA]" :class="{ 'bg-white/5 text-white': route.name === 'shop' }" @click="mobileMenuOpen = false">Catalog</RouterLink><RouterLink v-for="item in navItems" :key="item.name" :to="item.to" class="rounded-lg px-3 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#A8AFBA]" @click="mobileMenuOpen = false">{{ item.label }}</RouterLink></nav></div>
      </div>
    </header>

    <main id="app-content" class="mx-auto max-w-[1440px] px-5 pb-28 sm:px-8 lg:px-12 lg:pb-12"><RouterView v-slot="{ Component }"><Transition name="fade" mode="out-in"><component :is="Component" /></Transition></RouterView></main>
    <AppFooter />
    <PwaStatus />

    <nav class="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[#111419]/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl sm:hidden"><div class="mx-auto flex max-w-md items-center justify-around"><RouterLink to="/" class="flex flex-col items-center gap-1 text-[10px] text-[#8E96A3]" :class="{ 'text-[#F5A710]': route.name === 'home' }"><Sparkles :size="19" /><span>Discover</span></RouterLink><RouterLink to="/shop" class="flex flex-col items-center gap-1 text-[10px] text-[#8E96A3]" :class="{ 'text-[#F5A710]': route.name === 'shop' }"><Search :size="19" /><span>Shop</span></RouterLink><RouterLink to="/cart" class="relative flex flex-col items-center gap-1 text-[10px] text-[#8E96A3]" :class="{ 'text-[#F5A710]': route.name === 'cart' }"><ShoppingBag :size="19" /><span>Bag</span><span v-if="cartLabel" class="absolute -right-3 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#58D5E6] px-1 text-[9px] font-bold text-[#0B0D10]">{{ cartLabel }}</span></RouterLink><RouterLink to="/profile" class="flex flex-col items-center gap-1 text-[10px] text-[#8E96A3]" :class="{ 'text-[#F5A710]': route.name === 'profile' }"><CarFront :size="19" /><span>Garage</span></RouterLink></div></nav>
  </div>
  </ErrorBoundary>
</template>
