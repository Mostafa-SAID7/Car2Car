<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, CarFront, Check, ShieldCheck, Sparkles } from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'
import { UiButton } from '@/components/ui'

const router = useRouter()
const onboarding = useOnboardingStore()
const slide = ref(0)
const slides = [
  { eyebrow: '01 · Find your fit', title: 'The right oil. First time.', copy: 'Tell us what you drive and we’ll take the guesswork out of maintenance.', icon: CarFront },
  { eyebrow: '02 · Shop with confidence', title: 'Good fluids, better miles.', copy: 'Compare real specs from the brands your engine already trusts.', icon: ShieldCheck },
  { eyebrow: '03 · Keep moving', title: 'Your garage, in your pocket.', copy: 'Track service essentials, save favourites, and stay ready for the road.', icon: Sparkles },
]
function next() { if (slide.value < slides.length - 1) slide.value += 1 }
function skip() { onboarding.finish(); router.push('/') }
function finish() { onboarding.finish() }
</script>

<template>
  <div class="mx-auto flex min-h-[75vh] max-w-xl flex-col justify-center py-14 text-center"><div class="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#F5A710] text-[#0B0D10] shadow-[0_0_35px_rgba(245,167,16,.25)]"><component :is="slides[slide].icon" :size="30" /></div><div class="mt-12 min-h-[215px]"><p class="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5A710]">{{ slides[slide].eyebrow }}</p><h1 class="display-font mt-3 text-4xl font-bold leading-[0.98] tracking-[-0.06em] text-white sm:text-6xl">{{ slides[slide].title }}<span class="text-[#F5A710]">.</span></h1><p class="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-[#8E96A3]">{{ slides[slide].copy }}</p></div><div class="mx-auto mt-7 flex gap-2"><span v-for="(_, index) in slides" :key="index" class="h-1.5 rounded-full transition-all" :class="index === slide ? 'w-8 bg-[#F5A710]' : 'w-1.5 bg-white/20'"></span></div><UiButton v-if="slide < slides.length - 1" class="mx-auto mt-10 h-12 px-6" @click="next">Next <ArrowRight :size="17" /></UiButton><RouterLink v-else to="/vehicle" class="mx-auto mt-10 inline-flex h-12 items-center gap-2 rounded-xl bg-[#F5A710] px-6 text-sm font-bold text-[#0B0D10] hover:bg-[#FFC233]" @click="finish">Set up my garage <Check :size="17" /></RouterLink><button class="mt-6 text-xs text-[#68707D] hover:text-white" @click="skip">Skip for now</button></div>
</template>
