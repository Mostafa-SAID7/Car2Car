<script setup lang="ts">
withDefaults(defineProps<{ as?: string; muted?: boolean }>(), { as: 'div', muted: false })
</script>

<template>
  <component
    :is="as"
    class="rounded-2xl border border-white/[0.08] bg-[#14171C] text-[#F4F5F7] shadow-sm"
    :class="muted ? 'bg-white/[0.03]' : ''"
    ><slot
  /></component>
</template>
