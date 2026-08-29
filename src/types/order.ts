import type { CartLine, OrderAddress } from './cart'

export interface Order {
  id: string
  createdAt: string
  status: 'Processing' | 'Shipped' | 'Delivered'
  total: number
  itemCount: number
  address: OrderAddress
  lines: CartLine[]
}
