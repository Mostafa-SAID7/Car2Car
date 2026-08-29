import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Vehicle } from '@/types/vehicle'

const savedVehicle = localStorage.getItem('motor-oil-eg-vehicle')

export const useVehicleStore = defineStore('vehicle', () => {
  const vehicle = ref<Vehicle | null>(savedVehicle ? (JSON.parse(savedVehicle) as Vehicle) : null)

  function select(nextVehicle: Vehicle) {
    vehicle.value = nextVehicle
    localStorage.setItem('motor-oil-eg-vehicle', JSON.stringify(nextVehicle))
  }

  function clear() {
    vehicle.value = null
    localStorage.removeItem('motor-oil-eg-vehicle')
  }

  return { vehicle, select, clear }
})
