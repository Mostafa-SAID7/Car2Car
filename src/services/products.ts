import { products } from '@/data/products'
import type { Product } from '@/types/product'

export async function getProducts(): Promise<Product[]> {
  return Promise.resolve(products)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return Promise.resolve(products.find((product) => product.slug === slug))
}
