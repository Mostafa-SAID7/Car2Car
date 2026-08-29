<script setup lang="ts">
import { ArrowLeft, Construction } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

defineProps<{ title: string; eyebrow: string }>()
</script>

<template>
  <div class="flex min-h-[65vh] items-center justify-center py-16">
    <div class="max-w-sm text-center">
      <div
        class="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-[#F5A710]/20 bg-[#F5A710]/10 text-[#F5A710]"
      >
        <Construction :size="28" />
      </div>
      <p class="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5A710]">
        {{ eyebrow }}
      </p>
      <h1 class="display-font mt-2 text-3xl font-bold tracking-[-0.05em] text-white">
        {{ title }}
      </h1>
      <p class="mt-3 text-sm leading-relaxed text-[#8E96A3]">
        This part of your Motor-Oil-EG experience is coming soon. Keep exploring the shop while we
        build it out.
      </p>
      <RouterLink
        to="/catalog"
        class="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#F5A710] px-5 py-3 text-xs font-bold text-[#0B0D10]"
        ><ArrowLeft :size="15" /> Back to the shop</RouterLink
      >
    </div>
  </div>
</template>
