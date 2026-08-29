<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'default' | 'sm' | 'icon-sm'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'default', type: 'button', disabled: false },
)

const classes = computed(() => ({
  variant: {
    primary:
      'bg-[#F5A710] text-[#0B0D10] shadow-sm hover:bg-[#FFC233] focus-visible:ring-[#F5A710]/50',
    secondary:
      'border border-white/10 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.08] focus-visible:ring-white/30',
    ghost: 'text-[#A8AFBA] hover:bg-white/[0.06] hover:text-white focus-visible:ring-white/30',
  }[props.variant],
  size: {
    default: 'min-h-10 rounded-xl px-4 py-2.5 text-sm',
    sm: 'min-h-9 rounded-lg px-3 text-xs',
    'icon-sm': 'h-9 w-9 rounded-lg p-0 text-sm',
  }[props.size],
}))
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold outline-none transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D10] disabled:pointer-events-none disabled:opacity-50"
    :class="classes"
  >
    <slot />
  </button>
</template>
