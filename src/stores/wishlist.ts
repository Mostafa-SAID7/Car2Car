import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const saved = localStorage.getItem('torque-wishlist')

export const useWishlistStore = defineStore('wishlist', () => {
  const ids = ref<string[]>(saved ? JSON.parse(saved) as string[] : [])
  const count = computed(() => ids.value.length)

  function toggle(id: string) {
    ids.value = ids.value.includes(id) ? ids.value.filter((item) => item !== id) : [...ids.value, id]
    localStorage.setItem('torque-wishlist', JSON.stringify(ids.value))
  }
  function has(id: string) { return ids.value.includes(id) }

  return { ids, count, toggle, has }
})
