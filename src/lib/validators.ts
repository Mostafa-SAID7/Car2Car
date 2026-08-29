import { z } from 'zod'

export const checkoutSchema = z.object({
  email: z.string().email('Enter a valid email'),
  name: z.string().min(2, 'Enter your full name'),
  street: z.string().min(4, 'Enter a delivery address'),
  city: z.string().min(2, 'Enter your city'),
  postalCode: z.string().min(4, 'Enter a valid postal code'),
  card: z.string().min(12, 'Enter a valid card number'),
})

export type CheckoutForm = z.infer<typeof checkoutSchema>
