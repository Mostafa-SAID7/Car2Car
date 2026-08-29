<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ArrowLeft, Check, LockKeyhole, MapPin, ShieldCheck } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { checkoutSchema, type CheckoutForm } from '@/lib/validators'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { useOrdersStore } from '@/stores/orders'

const cart = useCartStore()
const orders = useOrdersStore()
const submitted = ref(false)
const orderId = ref('')
const error = ref('')
const form = reactive<CheckoutForm>({
  email: '',
  name: '',
  street: '',
  city: '',
  postalCode: '',
  card: '',
})
function placeOrder() {
  const result = checkoutSchema.safeParse(form)
  if (!result.success) {
    error.value = result.error.issues[0]?.message ?? 'Check your details'
    return
  }
  const order = orders.create(
    cart.lines,
    { name: form.name, street: form.street, city: form.city, postalCode: form.postalCode },
    cart.subtotal,
  )
  orderId.value = order.id
  cart.clearAll()
  error.value = ''
  submitted.value = true
}
</script>

<template>
  <div class="pb-12 pt-8 sm:pt-14">
    <RouterLink
      to="/cart"
      class="inline-flex items-center gap-2 text-xs font-semibold text-[#8E96A3] hover:text-white"
      ><ArrowLeft :size="15" /> Back to bag</RouterLink
    >
    <div
      v-if="submitted"
      class="mx-auto flex min-h-[65vh] max-w-md items-center justify-center text-center"
    >
      <div>
        <div
          class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#58D5E6]/10 text-[#58D5E6]"
        >
          <Check :size="30" />
        </div>
        <p class="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-[#58D5E6]">
          Order confirmed
        </p>
        <h1 class="display-font mt-2 text-4xl font-bold tracking-[-0.06em] text-white">
          You’re good to go<span class="text-[#F5A710]">.</span>
        </h1>
        <p class="mt-4 text-sm leading-relaxed text-[#8E96A3]">
          Your Motor-Oil-EG order is confirmed. We'll send tracking details to
          {{ form.email || 'your inbox' }} shortly. Estimated delivery: 1-3 business days across
          Egypt.
        </p>
        <p class="mt-3 text-[11px] font-semibold text-[#58D5E6]">Order {{ orderId }}</p>
        <RouterLink
          to="/"
          class="mt-7 inline-flex rounded-xl bg-[#F5A710] px-5 py-3 text-xs font-bold text-[#0B0D10]"
          >Back to discover</RouterLink
        >
      </div>
    </div>
    <div v-else class="mt-9 grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5A710]">
          Secure checkout
        </p>
        <h1 class="display-font mt-2 text-4xl font-bold tracking-[-0.06em] text-white">
          Finish your order<span class="text-[#F5A710]">.</span>
        </h1>
        <form class="mt-8 space-y-5" @submit.prevent="placeOrder">
          <div class="rounded-2xl border border-white/[0.08] bg-[#14171C] p-5 sm:p-7">
            <div class="flex items-center gap-3">
              <span
                class="grid h-8 w-8 place-items-center rounded-lg bg-[#F5A710]/10 text-[#F5A710]"
                ><MapPin :size="16"
              /></span>
              <h2 class="text-sm font-semibold text-white">Delivery details</h2>
            </div>
            <div class="mt-5 grid gap-4 sm:grid-cols-2">
              <label class="sm:col-span-2"
                ><span class="block mb-2 text-[11px] font-semibold text-[#a8afba]">Email</span
                ><input
                  v-model="form.email"
                  type="email"
                  class="w-full h-[46px] border border-white/10 rounded-xl bg-[#0f1216] px-3.5 text-white outline-none text-[13px] focus:border-[#f5a710] placeholder:text-[#68707d]"
                  placeholder="alex@email.com" /></label
              ><label class="sm:col-span-2"
                ><span class="block mb-2 text-[11px] font-semibold text-[#a8afba]">Full name</span
                ><input
                  v-model="form.name"
                  class="w-full h-[46px] border border-white/10 rounded-xl bg-[#0f1216] px-3.5 text-white outline-none text-[13px] focus:border-[#f5a710] placeholder:text-[#68707d]"
                  placeholder="Alex Morgan" /></label
              ><label class="sm:col-span-2"
                ><span class="block mb-2 text-[11px] font-semibold text-[#a8afba]"
                  >Street address</span
                ><input
                  v-model="form.street"
                  class="w-full h-[46px] border border-white/10 rounded-xl bg-[#0f1216] px-3.5 text-white outline-none text-[13px] focus:border-[#f5a710] placeholder:text-[#68707d]"
                  placeholder="14 Grand Avenue" /></label
              ><label
                ><span class="block mb-2 text-[11px] font-semibold text-[#a8afba]">City</span
                ><input
                  v-model="form.city"
                  class="w-full h-[46px] border border-white/10 rounded-xl bg-[#0f1216] px-3.5 text-white outline-none text-[13px] focus:border-[#f5a710] placeholder:text-[#68707d]"
                  placeholder="Cairo" /></label
              ><label
                ><span class="block mb-2 text-[11px] font-semibold text-[#a8afba]">Postal code</span
                ><input
                  v-model="form.postalCode"
                  class="w-full h-[46px] border border-white/10 rounded-xl bg-[#0f1216] px-3.5 text-white outline-none text-[13px] focus:border-[#f5a710] placeholder:text-[#68707d]"
                  placeholder="11511"
              /></label>
            </div>
          </div>
          <div class="rounded-2xl border border-white/[0.08] bg-[#14171C] p-5 sm:p-7">
            <div class="flex items-center gap-3">
              <span
                class="grid h-8 w-8 place-items-center rounded-lg bg-[#F5A710]/10 text-[#F5A710]"
                ><LockKeyhole :size="16"
              /></span>
              <h2 class="text-sm font-semibold text-white">Payment method</h2>
              <span class="ml-auto text-[10px] text-[#58D5E6]">Secure</span>
            </div>
            <label class="mt-5 block"
              ><span class="block mb-2 text-[11px] font-semibold text-[#a8afba]">Card number</span
              ><input
                v-model="form.card"
                inputmode="numeric"
                class="w-full h-[46px] border border-white/10 rounded-xl bg-[#0f1216] px-3.5 text-white outline-none text-[13px] focus:border-[#f5a710] placeholder:text-[#68707d]"
                placeholder="4242 4242 4242 4242"
            /></label>
          </div>
          <p
            v-if="error"
            class="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300"
          >
            {{ error }}
          </p>
          <button
            class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F5A710] text-sm font-bold text-[#0B0D10] hover:bg-[#FFC233]"
          >
            Place order <ShieldCheck :size="17" />
          </button>
        </form>
      </div>
      <aside class="h-fit rounded-[24px] border border-white/[0.08] bg-[#14171C] p-5 sm:p-7">
        <h2 class="display-font text-xl font-bold text-white">Your order</h2>
        <div class="mt-5 space-y-4 border-b border-white/[0.08] pb-5">
          <div
            v-for="line in cart.lines"
            :key="line.product.id"
            class="flex justify-between gap-3 text-xs"
          >
            <span class="text-[#8E96A3]">{{ line.quantity }} × {{ line.product.name }}</span
            ><span class="shrink-0 text-white">{{
              formatPrice(line.product.price * line.quantity)
            }}</span>
          </div>
        </div>
        <div class="mt-5 flex justify-between">
          <span class="text-sm font-semibold text-white">Total</span
          ><strong class="display-font text-2xl text-white">{{
            formatPrice(cart.subtotal)
          }}</strong>
        </div>
      </aside>
    </div>
  </div>
</template>
