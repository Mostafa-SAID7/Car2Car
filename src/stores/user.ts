import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserPreferences } from '@/types/user'

const defaultPreferences: UserPreferences = {
  name: 'Alex Morgan',
  email: 'alex@motor-oil-eg.com',
  vehicle: null,
  notifications: true,
}
const savedPreferences = localStorage.getItem('motor-oil-eg-preferences')

export const useUserStore = defineStore('user', () => {
  const preferences = ref<UserPreferences>(
    savedPreferences ? (JSON.parse(savedPreferences) as UserPreferences) : defaultPreferences,
  )

  function update(next: Partial<UserPreferences>) {
    preferences.value = { ...preferences.value, ...next }
    localStorage.setItem('motor-oil-eg-preferences', JSON.stringify(preferences.value))
  }

  return { preferences, update }
})
