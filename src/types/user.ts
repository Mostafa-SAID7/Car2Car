import type { Vehicle } from './vehicle'

export interface UserPreferences {
  name: string
  email: string
  vehicle: Vehicle | null
  notifications: boolean
}
