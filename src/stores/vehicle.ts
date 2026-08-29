import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Vehicle } from '@/types/vehicle'

const savedVehicle = localStorage.getItem('torque-vehicle')

export const useVehicleStore = defineStore('vehicle', () => {
  const vehicle = ref<Vehicle | null>(savedVehicle ? JSON.parse(savedVehicle) as Vehicle : null)

  function select(nextVehicle: Vehicle) {
    vehicle.value = nextVehicle
    localStorage.setItem('torque-vehicle', JSON.stringify(nextVehicle))
  }

  function clear() {
    vehicle.value = null
    localStorage.removeItem('torque-vehicle')
  }

  return { vehicle, select, clear }
})
