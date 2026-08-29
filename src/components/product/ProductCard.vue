<script setup lang="ts">
import { Check, Heart, ShoppingCart, Star } from 'lucide-vue-next'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import type { Product } from '@/types/product'
import { UiCard } from '@/components/ui'

const props = defineProps<{ product: Product }>()
const cart = useCartStore()
const wishlist = useWishlistStore()
const quantity = computed(() => cart.quantity(props.product.id))
const saved = computed(() => wishlist.has(props.product.id))

function addToCart() {
  cart.add(props.product)
}

function toggleSaved() {
  wishlist.toggle(props.product.id)
}
</script>

<template>
  <UiCard
    as="article"
    class="product-card group relative min-w-0 overflow-hidden rounded-[10px] border-white/[0.04] bg-[#2C2C2C] p-0 shadow-none transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-[#333333]"
  >
    <div class="product-visual relative aspect-[1.35] overflow-hidden bg-[#2C2C2C]">
      <RouterLink
        :to="`/product/${product.slug}`"
        class="absolute inset-0 grid place-items-center"
        :aria-label="`View ${product.name}`"
        ><img
          :src="product.image"
          :alt="product.name"
          class="h-full w-full object-cover opacity-75 grayscale-[0.15] mix-blend-screen transition duration-500 group-hover:scale-105 group-hover:opacity-90"
      /></RouterLink>
      <span
        class="absolute left-3 top-3 text-[11px] font-medium uppercase tracking-[0.08em] text-white/25"
        >Sale</span
      >
      <button
        class="cart-button absolute right-2.5 top-2.5 grid h-8 w-12 place-items-center rounded-full bg-[#F5A710] text-[#0B0D10] transition hover:bg-[#FFC233]"
        :aria-label="`Add ${product.name} to cart`"
        @click.stop="addToCart"
      >
        <Check v-if="quantity" :size="16" stroke-width="3" /><ShoppingCart
          v-else
          :size="16"
          stroke-width="2.8"
        />
      </button>
    </div>

    <div class="product-info px-3 pb-3 pt-3">
      <div class="min-h-[39px]">
        <RouterLink
          :to="`/product/${product.slug}`"
          class="line-clamp-2 text-[12px] font-medium uppercase leading-[1.35] text-white transition hover:text-[#F5A710]"
          >{{ product.brand }} {{ product.name }}</RouterLink
        >
      </div>
      <div class="mt-2 flex items-center gap-2 text-[10px]">
        <span class="flex items-center gap-1 text-[#F5A710]"
          ><Star :size="10" fill="currentColor" stroke-width="0" />{{
            product.rating.toFixed(1)
          }}</span
        >
        <span class="text-white/25">{{ product.reviewCount }} reviews</span>
      </div>
      <div class="mt-4 flex items-end justify-between gap-2">
        <div class="flex flex-col leading-none">
          <span v-if="product.originalPrice" class="mb-1 text-[11px] text-white/45 line-through"
            >EGP {{ product.originalPrice.toFixed(2) }}</span
          >
          <span class="display-font text-[16px] font-medium text-white"
            >EGP {{ product.price.toFixed(2) }}</span
          >
        </div>
        <button
          class="favorite-button grid h-8 w-8 place-items-center rounded-full text-[#c49d45] transition hover:bg-[#F5A710]/10 hover:text-[#F5A710]"
          :aria-label="saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`"
          :aria-pressed="saved"
          @click.stop="toggleSaved"
        >
          <Heart :size="25" :fill="saved ? 'currentColor' : 'none'" stroke-width="1.25" />
        </button>
      </div>
    </div>
  </UiCard>
</template>
