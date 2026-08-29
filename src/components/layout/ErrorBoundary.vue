<script setup lang="ts">
import { computed, onErrorCaptured, ref } from 'vue'
import { useRouter } from 'vue-router'
import ErrorPage from '@/pages/ErrorPage.vue'
import { clearError, currentError, reportError, type AppError } from '@/lib/errors'

const router = useRouter()
const capturedError = ref<AppError | null>(null)
const attempt = ref(0)
const activeError = computed(() => capturedError.value ?? currentError.value)

onErrorCaptured((error, _instance, info) => {
  capturedError.value = reportError(error, `Vue ${info}`)
  return false
})

function retry() {
  capturedError.value = null
  clearError()
  attempt.value += 1
}

function goHome() {
  capturedError.value = null
  clearError()
  if (router.currentRoute.value.name !== 'home') router.push('/')
}
</script>

<template>
  <div v-if="!activeError" :key="attempt"><slot /></div>
  <ErrorPage v-else :error="activeError" @retry="retry" @home="goHome" />
</template>
