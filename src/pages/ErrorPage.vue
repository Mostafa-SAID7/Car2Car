<script setup lang="ts">
import { Home, RefreshCw, TriangleAlert } from 'lucide-vue-next'
import { computed } from 'vue'
import type { AppError, AppErrorKind } from '@/lib/errors'
import { createNotFoundError } from '@/lib/errors'
import { UiButton } from '@/components/ui'

const props = withDefaults(defineProps<{ error?: AppError; kind?: AppErrorKind }>(), { kind: 'unexpected' })
const emit = defineEmits<{ retry: []; home: [] }>()
const displayError = computed(() => props.error ?? (props.kind === 'not-found' ? createNotFoundError() : {
  kind: 'unexpected' as const,
  status: 500,
  code: 'TRQ-500',
  title: 'Something needs attention',
  message: 'We could not complete that request. Try again or return to the home page.',
}))
const isNotFound = computed(() => displayError.value.kind === 'not-found')
</script>

<template>
  <section class="mx-auto flex min-h-[72vh] max-w-2xl items-center justify-center py-16">
    <div class="relative w-full overflow-hidden rounded-[28px] border border-white/[0.1] bg-[#14171C] px-6 py-12 text-center shadow-2xl sm:px-12">
      <div class="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#F5A710]/[0.08] blur-3xl"></div>
      <div class="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-white/[0.03] blur-3xl"></div>
      <div class="relative">
        <div class="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#F5A710]/25 bg-[#F5A710]/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5A710]"><span class="h-1.5 w-1.5 rounded-full bg-[#F5A710]"></span>{{ isNotFound ? 'Wrong turn' : 'Garage alert' }}</div>
        <div class="mx-auto mt-8 grid h-20 w-20 place-items-center rounded-[22px] border border-[#F5A710]/40 bg-[#0B0D10] text-[#F5A710] shadow-[0_0_45px_rgba(245,167,16,.12)]"><TriangleAlert :size="31" /></div>
        <p class="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#68707D]">{{ displayError.code }} · {{ displayError.status }}</p>
        <h1 class="display-font mt-3 text-4xl font-bold tracking-[-0.07em] text-white sm:text-5xl">{{ displayError.title }}</h1>
        <p class="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#8E96A3]">{{ displayError.message }}</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <UiButton v-if="!isNotFound" @click="emit('retry')"><RefreshCw :size="15" /> Try again</UiButton>
          <UiButton variant="secondary" @click="emit('home')"><Home :size="15" /> Back to home</UiButton>
        </div>
        <p class="mt-8 text-[10px] uppercase tracking-[0.16em] text-[#68707D]">Your saved vehicle and bag remain untouched</p>
      </div>
    </div>
  </section>
</template>
