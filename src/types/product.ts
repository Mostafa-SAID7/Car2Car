export type OilBase = 'Full Synthetic' | 'Synthetic Blend' | 'Mineral'
export type ProductCategory = 'Engine Oil' | 'Transmission' | 'Filters' | 'Coolants' | 'Grease'

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  body: string
  verified: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: ProductCategory
  viscosity: string
  volume: string
  base: OilBase
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  image: string
  stock: number
  specs: Record<string, string>
  description: string
  reviews: Review[]
  compatibleMakes: string[]
  tags: string[]
  isBestseller?: boolean
  isNew?: boolean
}
