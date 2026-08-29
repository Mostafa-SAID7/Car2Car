import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOnboardingStore = defineStore('onboarding', () => {
  const complete = ref(localStorage.getItem('motor-oil-eg-onboarding-complete') === 'true')

  function finish() {
    complete.value = true
    localStorage.setItem('motor-oil-eg-onboarding-complete', 'true')
  }

  return { complete, finish }
})
