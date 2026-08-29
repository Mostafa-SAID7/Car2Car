<script setup lang="ts">
import { Download, WifiOff, X } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const offline = ref(!navigator.onLine)
const deferredPrompt = ref<InstallPromptEvent | null>(null)
const dismissed = ref(false)

function setOnline() {
  offline.value = false
}
function setOffline() {
  offline.value = true
}
function captureInstall(event: Event) {
  event.preventDefault()
  deferredPrompt.value = event as InstallPromptEvent
}
async function install() {
  if (!deferredPrompt.value) return
  await deferredPrompt.value.prompt()
  deferredPrompt.value = null
}

onMounted(() => {
  window.addEventListener('online', setOnline)
  window.addEventListener('offline', setOffline)
  window.addEventListener('beforeinstallprompt', captureInstall)
})
onUnmounted(() => {
  window.removeEventListener('online', setOnline)
  window.removeEventListener('offline', setOffline)
  window.removeEventListener('beforeinstallprompt', captureInstall)
})
</script>

<template>
  <div
    v-if="!dismissed && (offline || deferredPrompt)"
    class="fixed bottom-24 left-4 right-4 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-[#1B1F26] p-3 shadow-2xl sm:bottom-6 sm:left-auto sm:right-6"
  >
    <span
      class="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
      :class="offline ? 'bg-[#F5A710]/10 text-[#F5A710]' : 'bg-[#58D5E6]/10 text-[#58D5E6]'"
      ><WifiOff v-if="offline" :size="17" /><Download v-else :size="17"
    /></span>
    <p class="flex-1 text-xs leading-relaxed text-white">
      {{
        offline
          ? 'You’re offline. Your saved garage is still available.'
          : 'Take Motor-Oil-EG with you. Install the app for a faster garage.'
      }}
    </p>
    <button
      v-if="deferredPrompt && !offline"
      class="rounded-lg bg-[#F5A710] px-3 py-2 text-[10px] font-bold text-[#0B0D10]"
      @click="install"
    >
      Install</button
    ><button aria-label="Dismiss status" class="text-[#8E96A3]" @click="dismissed = true">
      <X :size="15" />
    </button>
  </div>
</template>
