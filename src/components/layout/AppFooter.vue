<script setup lang="ts">
import { ArrowRight, Facebook, Instagram, MessageCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const subscribed = ref(false)

function subscribe() {
  if (!email.value.trim()) return
  subscribed.value = true
}
</script>

<template>
  <footer
    class="w-full max-w-[1440px] mx-auto px-4 sm:px-[clamp(16px,2.9vw,42px)] pb-3.5 text-[#f4f5f7]"
  >
    <div
      class="grid grid-cols-2 md:grid-cols-[minmax(0,1.62fr)_minmax(116px,0.54fr)_minmax(210px,1fr)] gap-2.5 md:gap-[18px] mb-3 md:mb-6"
    >
      <a
        href="tel:+20212345678"
        class="col-span-2 md:col-span-1 relative flex min-h-[90px] md:min-h-[105px] flex-col justify-between overflow-hidden border border-white/15 rounded-[10px] bg-[#151515] px-[14px] py-[13px] md:px-[19px] md:pt-[17px] md:pb-[14px] no-underline transition hover:border-[#f5a710]/65 hover:bg-[#191919] group"
      >
        <span class="relative text-[#e5e5e5] text-[9px] font-semibold tracking-[0.13em] uppercase"
          >Phone</span
        >
        <strong
          class="relative text-[#f5a710] font-['Space_Grotesk'] text-[13px] md:text-[16px] font-semibold tracking-[0.08em] uppercase"
          >+20 2 1234 5678</strong
        >
        <div
          class="absolute inset-[-40px_-25px_-35px_100px] opacity-75 transform -rotate-7 scale-[1.2,0.72] pointer-events-none"
          style="
            background: repeating-radial-gradient(
              ellipse at 57% 47%,
              transparent 0 11px,
              rgba(255, 255, 255, 0.075) 12px 13px,
              transparent 14px 20px
            );
          "
        ></div>
      </a>

      <div
        class="relative flex min-h-[90px] md:min-h-[105px] flex-col justify-between overflow-hidden border border-white/15 rounded-[10px] bg-[#151515] px-[14px] md:pr-3 md:pl-[18px] py-[13px] md:pt-[17px] md:pb-[14px] transition hover:border-[#f5a710]/65 hover:bg-[#191919]"
      >
        <span class="relative text-[#e5e5e5] text-[9px] font-semibold tracking-[0.13em] uppercase"
          >Follow Us</span
        >
        <div class="flex items-center gap-2.5 text-[#f5a710]" aria-label="Social media">
          <a
            href="https://wa.me/20212345678"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            class="inline-flex items-center justify-center text-inherit no-underline transition hover:text-[#ffc233] hover:-translate-y-[1px]"
            ><MessageCircle :size="15" :stroke-width="2.8"
          /></a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            class="inline-flex items-center justify-center text-inherit no-underline transition hover:text-[#ffc233] hover:-translate-y-[1px]"
            ><Facebook :size="15" :stroke-width="2.8"
          /></a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            class="inline-flex items-center justify-center text-inherit no-underline transition hover:text-[#ffc233] hover:-translate-y-[1px]"
            ><Instagram :size="14" :stroke-width="2.8"
          /></a>
        </div>
      </div>

      <a
        href="mailto:info@motor-oil-eg.com"
        class="relative flex min-h-[90px] md:min-h-[105px] flex-col justify-between overflow-hidden border border-white/15 rounded-[10px] bg-[#151515] px-[14px] py-[13px] md:px-[19px] md:pt-[17px] md:pb-[14px] no-underline transition hover:border-[#f5a710]/65 hover:bg-[#191919]"
      >
        <span class="relative text-[#e5e5e5] text-[9px] font-semibold tracking-[0.13em] uppercase"
          >Email</span
        >
        <strong
          class="relative text-[#f5a710] font-['Space_Grotesk'] text-[13px] md:text-[14px] font-semibold tracking-[0.02em] uppercase"
          >info@motor-oil-eg.com</strong
        >
      </a>
    </div>

    <div
      class="min-h-[265px] overflow-hidden rounded-[8px_8px_30px_30px] md:rounded-[9px_9px_48px_48px] bg-[#2c2c2c] p-[24px_18px_22px] md:p-[30px_33px_27px]"
    >
      <div
        class="grid grid-cols-1 md:grid-cols-[minmax(0,337px)_minmax(180px,195px)] justify-between gap-8 md:gap-12"
      >
        <div>
          <h2
            class="mb-[13px] font-['Space_Grotesk'] text-[17px] font-semibold tracking-[0.015em] m-0"
          >
            Subscribe to our newsletter
          </h2>
          <form
            v-if="!subscribed"
            class="flex max-w-[337px] items-center border-b border-white/50"
            @submit.prevent="subscribe"
          >
            <label class="sr-only" for="footer-email">Your email</label>
            <input
              id="footer-email"
              v-model="email"
              required
              type="email"
              placeholder="Your email"
              class="min-w-0 h-[29px] flex-1 border-0 outline-none bg-transparent text-white text-[12px] placeholder:text-[#777]"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              class="grid h-[24px] w-[56px] place-items-center border border-[#c5962c] rounded-[20px] bg-transparent text-[#dcae3f] transition hover:bg-[#f5a710] hover:text-[#2c2c2c]"
            >
              <ArrowRight :size="19" />
            </button>
          </form>
          <p v-else class="text-[#f5a710] text-[12px]">Thanks! You're on the list.</p>
          <label class="flex items-center gap-1 mt-[7px] text-[#858585] text-[8px]"
            ><input type="checkbox" required class="h-[10px] w-[10px] m-0 accent-[#f5a710]" />
            <span>I agree to the data policy</span></label
          >
        </div>

        <div class="grid grid-cols-2 gap-x-[18px] md:gap-x-[35px] gap-y-6">
          <div>
            <p class="m-0 mb-2 text-[#f0f0f0] text-[10px] font-medium tracking-normal normal-case">
              About Motor-Oil-EG
            </p>
            <nav class="flex flex-col gap-[5px]">
              <RouterLink
                to="/about"
                class="text-[#858585] text-[9px] no-underline transition hover:text-[#f5a710]"
                >Our story</RouterLink
              >
              <RouterLink
                to="/catalog"
                class="text-[#858585] text-[9px] no-underline transition hover:text-[#f5a710]"
                >Reviews</RouterLink
              >
              <RouterLink
                to="/delivery"
                class="text-[#858585] text-[9px] no-underline transition hover:text-[#f5a710]"
                >Delivery</RouterLink
              >
              <RouterLink
                to="/help"
                class="text-[#858585] text-[9px] no-underline transition hover:text-[#f5a710]"
                >Contact us</RouterLink
              >
            </nav>
          </div>
          <div>
            <p class="m-0 mb-2 text-[#f0f0f0] text-[10px] font-medium tracking-normal normal-case">
              Oil catalog
            </p>
            <nav class="flex flex-col gap-[5px]">
              <RouterLink
                to="/catalog"
                class="text-[#858585] text-[9px] no-underline transition hover:text-[#f5a710]"
                >Synthetic</RouterLink
              >
              <RouterLink
                to="/catalog"
                class="text-[#858585] text-[9px] no-underline transition hover:text-[#f5a710]"
                >Semi-synthetic</RouterLink
              >
              <RouterLink
                to="/catalog"
                class="text-[#858585] text-[9px] no-underline transition hover:text-[#f5a710]"
                >Mineral</RouterLink
              >
              <RouterLink
                to="/catalog"
                class="text-[#858585] text-[9px] no-underline transition hover:text-[#f5a710]"
                >Filters</RouterLink
              >
            </nav>
          </div>
          <div>
            <RouterLink
              to="/partners"
              class="inline-block m-0 mb-2 text-[#f0f0f0] text-[10px] font-medium tracking-normal normal-case hover:text-[#f5a710]"
              >For partners</RouterLink
            >
          </div>
          <div>
            <RouterLink
              to="/help"
              class="inline-block m-0 mb-2 text-[#f0f0f0] text-[10px] font-medium tracking-normal normal-case hover:text-[#f5a710]"
              >Help center</RouterLink
            >
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center mt-10 md:mt-[58px]">
        <RouterLink
          to="/"
          class="text-[#f5a710] font-['Space_Grotesk'] text-[16px] font-extrabold tracking-[0.04em] no-underline"
          >MOTOR-OIL-EG</RouterLink
        >
        <div
          class="flex flex-wrap justify-center items-center gap-x-3.5 gap-y-1.5 md:gap-x-[27px] mt-[7px] text-[#777] text-[8px] text-center"
        >
          <span>© Motor-Oil-EG, 2025</span>
          <a href="#" class="text-inherit no-underline hover:text-[#c7c7c7]">Privacy policy</a>
          <a href="#" class="text-inherit no-underline hover:text-[#c7c7c7]">Partner agreement</a>
        </div>
      </div>
    </div>
  </footer>
</template>
