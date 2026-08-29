import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type Theme = 'dark' | 'light'

const savedTheme = localStorage.getItem('torque-theme')

export const useUiStore = defineStore('ui', () => {
  const theme = ref<Theme>(savedTheme === 'light' ? 'light' : 'dark')
  const isLight = computed(() => theme.value === 'light')

  function apply(nextTheme: Theme) {
    theme.value = nextTheme
    document.documentElement.dataset.theme = nextTheme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextTheme === 'light' ? '#F4F6F8' : '#0B0D10')
    localStorage.setItem('torque-theme', nextTheme)
  }

  function toggle() {
    apply(isLight.value ? 'dark' : 'light')
  }

  apply(theme.value)

  return { theme, isLight, apply, toggle }
})
