import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Order } from '@/types/order'
import type { CartLine, OrderAddress } from '@/types/cart'

const savedOrders = localStorage.getItem('torque-orders')

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>(savedOrders ? JSON.parse(savedOrders) as Order[] : [])

  function create(lines: CartLine[], address: OrderAddress, total: number) {
    const order: Order = { id: `TRQ-${Date.now().toString().slice(-6)}`, createdAt: new Date().toISOString(), status: 'Processing', total, itemCount: lines.reduce((sum, line) => sum + line.quantity, 0), address, lines }
    orders.value = [order, ...orders.value]
    localStorage.setItem('torque-orders', JSON.stringify(orders.value))
    return order
  }

  return { orders, create }
})
