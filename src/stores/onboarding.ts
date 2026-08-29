import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOnboardingStore = defineStore('onboarding', () => {
  const complete = ref(localStorage.getItem('torque-onboarding-complete') === 'true')

  function finish() {
    complete.value = true
    localStorage.setItem('torque-onboarding-complete', 'true')
  }

  return { complete, finish }
})
