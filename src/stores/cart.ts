import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { products } from '@/data/products'
import type { CartLine } from '@/types/cart'
import type { Product } from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Record<string, number>>(JSON.parse(localStorage.getItem('torque-cart') ?? '{}'))
  const count = computed(() => Object.values(items.value).reduce((total, quantity) => total + quantity, 0))
  const lines = computed<CartLine[]>(() => Object.entries(items.value).flatMap(([id, quantity]) => {
    const product = products.find((candidate) => candidate.id === id)
    return product ? [{ product, quantity }] : []
  }))
  const subtotal = computed(() => lines.value.reduce((total, line) => total + line.product.price * line.quantity, 0))

  function add(product: Product) {
    items.value[product.id] = (items.value[product.id] ?? 0) + 1
    persist()
  }

  function quantity(id: string) {
    return items.value[id] ?? 0
  }

  function remove(id: string) {
    if (!items.value[id]) return
    if (items.value[id] === 1) delete items.value[id]
    else items.value[id] -= 1
    persist()
  }

  function clear(id: string) {
    delete items.value[id]
    persist()
  }

  function clearAll() {
    items.value = {}
    persist()
  }

  function persist() {
    localStorage.setItem('torque-cart', JSON.stringify(items.value))
  }

  return { items, count, lines, subtotal, add, remove, clear, clearAll, quantity }
})
