import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserPreferences } from '@/types/user'

const defaultPreferences: UserPreferences = { name: 'Alex Morgan', email: 'alex@torque.app', vehicle: null, notifications: true }
const savedPreferences = localStorage.getItem('torque-preferences')

export const useUserStore = defineStore('user', () => {
  const preferences = ref<UserPreferences>(savedPreferences ? JSON.parse(savedPreferences) as UserPreferences : defaultPreferences)

  function update(next: Partial<UserPreferences>) {
    preferences.value = { ...preferences.value, ...next }
    localStorage.setItem('torque-preferences', JSON.stringify(preferences.value))
  }

  return { preferences, update }
})
