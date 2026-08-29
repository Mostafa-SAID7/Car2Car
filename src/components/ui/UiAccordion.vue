<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'

defineProps<{ items: Array<{ value: string; title: string; content: string }> }>()
</script>

<template>
  <AccordionRoot type="single" collapsible class="space-y-2">
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      class="overflow-hidden rounded-xl border border-white/[0.08] bg-[#14171C]"
    >
      <AccordionHeader
        ><AccordionTrigger
          class="group flex w-full items-center justify-between px-4 py-4 text-left text-sm font-semibold text-white outline-none transition hover:text-[#F5A710] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F5A710]/50"
          ><span>{{ item.title }}</span
          ><ChevronDown
            :size="16"
            class="text-[#F5A710] transition-transform duration-200 group-data-[state=open]:rotate-180" /></AccordionTrigger
      ></AccordionHeader>
      <AccordionContent
        class="border-t border-white/[0.08] px-4 py-4 text-xs leading-relaxed text-[#8E96A3]"
        >{{ item.content }}</AccordionContent
      >
    </AccordionItem>
  </AccordionRoot>
</template>
