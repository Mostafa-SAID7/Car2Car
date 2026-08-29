import { products } from '@/data/products'
import type { Product } from '@/types/product'

export const catalogMock: Product[] = products

export function findCatalogProduct(slug: string) {
  return catalogMock.find((product) => product.slug === slug)
}
