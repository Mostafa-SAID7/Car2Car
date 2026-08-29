import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProductCard from '../product/ProductCard.vue'
import { products } from '../../data/products'
import { useCartStore } from '../../stores/cart'
import { checkoutSchema } from '../../lib/validators'

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
})

describe('ProductCard', () => {
  it('renders product details and supports adding to cart', async () => {
    const wrapper = mount(ProductCard, {
      props: { product: products[0] },
      global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } },
    })

    expect(wrapper.text()).toContain('EDGE Titanium 5W-30')
    await wrapper.get('button[aria-label="Add EDGE Titanium 5W-30 to cart"]').trigger('click')
    expect(useCartStore().count).toBe(1)
  })
})

describe('Cart and checkout validation', () => {
  it('calculates a persistent cart subtotal', () => {
    const cart = useCartStore()
    cart.add(products[0])
    cart.add(products[0])
    expect(cart.count).toBe(2)
    expect(cart.subtotal).toBe(85.8)
    expect(JSON.parse(localStorage.getItem('torque-cart') ?? '{}')[products[0].id]).toBe(2)
  })

  it('rejects incomplete checkout details', () => {
    const result = checkoutSchema.safeParse({ email: 'not-an-email', name: '', street: '', city: '', postalCode: '', card: '' })
    expect(result.success).toBe(false)
  })
})
