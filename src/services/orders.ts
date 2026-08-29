import type { CartLine, OrderAddress } from '@/types/cart'
import type { Order } from '@/types/order'

export async function submitOrder(lines: CartLine[], address: OrderAddress, total: number): Promise<Order> {
  return Promise.resolve({ id: `TRQ-${Date.now().toString().slice(-6)}`, createdAt: new Date().toISOString(), status: 'Processing', total, itemCount: lines.reduce((sum, line) => sum + line.quantity, 0), address, lines })
}
