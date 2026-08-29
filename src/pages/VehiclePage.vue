<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowLeft, CarFront, Check } from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router'
import { UiSelect } from '@/components/ui'
import { useUserStore } from '@/stores/user'
import { useVehicleStore } from '@/stores/vehicle'

const router = useRouter()
const vehicleStore = useVehicleStore()
const userStore = useUserStore()
const make = ref(vehicleStore.vehicle?.make ?? '')
const model = ref(vehicleStore.vehicle?.model ?? '')
const year = ref(String(vehicleStore.vehicle?.year ?? ''))
const engine = ref(vehicleStore.vehicle?.engine ?? '')
const makes = ['BMW', 'Ford', 'Toyota', 'Volkswagen']

const modelsByMake: Record<string, string[]> = {
  BMW: ['3 Series', '5 Series', 'X3'],
  Ford: ['Focus', 'Mustang', 'F-150'],
  Toyota: ['Corolla', 'Camry', 'RAV4'],
  Volkswagen: ['Golf', 'Tiguan', 'Passat'],
}

const models = computed(() => (make.value ? (modelsByMake[make.value] ?? []) : []))
const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018']
const engines = ['1.5L Turbo', '2.0L Turbo', '2.5L Hybrid', '3.0L V6']
const canSave = computed(() => Boolean(make.value && model.value && year.value && engine.value))
function saveVehicle() {
  if (!canSave.value) return
  const next = {
    make: make.value,
    model: model.value,
    year: Number(year.value),
    engine: engine.value,
  }
  vehicleStore.select(next)
  userStore.update({ vehicle: next })
  router.push('/garage')
}
</script>

<template>
  <div class="mx-auto max-w-2xl pb-12 pt-8 sm:pt-14">
    <RouterLink
      to="/garage"
      class="inline-flex items-center gap-2 text-xs font-semibold text-[#8E96A3] hover:text-white"
      ><ArrowLeft :size="15" /> Back to Garage</RouterLink
    >
    <div class="mt-12 text-center">
      <div
        class="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#58D5E6]/10 text-[#58D5E6]"
      >
        <CarFront :size="30" />
      </div>
      <p class="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-[#58D5E6]">
        Your garage
      </p>
      <h1 class="display-font mt-2 text-4xl font-bold tracking-[-0.06em] text-white sm:text-5xl">
        Tell us what you drive<span class="text-[#F5A710]">.</span>
      </h1>
      <p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#8E96A3]">
        We’ll match every oil and filter to your exact engine. Your vehicle stays saved across
        devices.
      </p>
    </div>
    <div class="mt-10 rounded-[26px] border border-white/[0.08] bg-[#14171C] p-5 sm:p-8">
      <div class="grid gap-5 sm:grid-cols-2">
        <label class="block"
          ><span class="mb-2 block text-[11px] font-semibold text-[#A8AFBA]">Make</span
          ><UiSelect
            v-model="make"
            :options="makes"
            placeholder="Choose make"
            class="h-12 w-full rounded-xl border border-white/10 bg-[#0F1216] px-4 text-sm text-white outline-none transition focus:border-[#F5A710] focus:ring-1 focus:ring-[#F5A710]/50" /></label
        ><label class="block"
          ><span class="mb-2 block text-[11px] font-semibold text-[#A8AFBA]">Model</span
          ><UiSelect
            v-model="model"
            :disabled="!make"
            :options="models"
            placeholder="Choose model"
            class="h-12 w-full rounded-xl border border-white/10 bg-[#0F1216] px-4 text-sm text-white outline-none transition focus:border-[#F5A710] focus:ring-1 focus:ring-[#F5A710]/50 disabled:opacity-40" /></label
        ><label class="block"
          ><span class="mb-2 block text-[11px] font-semibold text-[#A8AFBA]">Year</span
          ><UiSelect
            v-model="year"
            :options="years"
            placeholder="Choose year"
            class="h-12 w-full rounded-xl border border-white/10 bg-[#0F1216] px-4 text-sm text-white outline-none transition focus:border-[#F5A710] focus:ring-1 focus:ring-[#F5A710]/50" /></label
        ><label class="block"
          ><span class="mb-2 block text-[11px] font-semibold text-[#A8AFBA]">Engine</span
          ><UiSelect
            v-model="engine"
            :options="engines"
            placeholder="Choose engine"
            class="h-12 w-full rounded-xl border border-white/10 bg-[#0F1216] px-4 text-sm text-white outline-none transition focus:border-[#F5A710] focus:ring-1 focus:ring-[#F5A710]/50"
        /></label>
      </div>
      <button
        :disabled="!canSave"
        class="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F5A710] text-sm font-bold text-[#0B0D10] transition hover:bg-[#FFC233] disabled:cursor-not-allowed disabled:opacity-40"
        @click="saveVehicle"
      >
        Save my vehicle <Check :size="17" />
      </button>
    </div>
    <div class="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#68707D]">
      <Check :size="14" class="text-[#58D5E6]" /> Private by default · Change it anytime
    </div>
  </div>
</template>
