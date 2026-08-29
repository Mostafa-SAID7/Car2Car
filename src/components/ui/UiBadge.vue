<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'orange' | 'cyan' | 'neutral' }>(), { tone: 'neutral' })
</script>

<template>
  <span class="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]" :class="{ 'border-[#F5A710]/25 bg-[#F5A710]/[0.1] text-[#F5A710]': tone === 'orange', 'border-[#58D5E6]/25 bg-[#58D5E6]/10 text-[#58D5E6]': tone === 'cyan', 'border-white/10 bg-white/[0.06] text-[#A8AFBA]': tone === 'neutral' }"><slot /></span>
</template>
