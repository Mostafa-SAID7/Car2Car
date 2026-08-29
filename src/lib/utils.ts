export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(value)
}
