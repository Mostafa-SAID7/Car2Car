import type { App } from 'vue'
import { shallowRef } from 'vue'

export type AppErrorKind = 'not-found' | 'network' | 'validation' | 'unexpected'

export interface AppError {
  kind: AppErrorKind
  status: number
  code: string
  title: string
  message: string
}

export const currentError = shallowRef<AppError | null>(null)

export function normalizeError(error: unknown, context = 'application'): AppError {
  if (typeof error === 'object' && error !== null && 'kind' in error) {
    const candidate = error as Partial<AppError>
    if (
      candidate.kind === 'not-found' ||
      candidate.kind === 'network' ||
      candidate.kind === 'validation' ||
      candidate.kind === 'unexpected'
    ) {
      return {
        kind: candidate.kind,
        status: candidate.status ?? 500,
        code: candidate.code ?? 'TRQ-500',
        title: candidate.title ?? 'Something needs attention',
        message:
          candidate.message ??
          'We could not complete that request. Try again or return to the home page.',
      }
    }
  }

  const isNetworkError = error instanceof TypeError && /fetch|network|load/i.test(error.message)
  return isNetworkError
    ? {
        kind: 'network',
        status: 503,
        code: 'TRQ-503',
        title: 'Connection interrupted',
        message: 'We could not reach the garage right now. Check your connection and try again.',
      }
    : {
        kind: 'unexpected',
        status: 500,
        code: 'TRQ-500',
        title: 'Something needs attention',
        message: `Motor-Oil-EG hit an unexpected problem in ${context}. Your saved garage is safe; try again or head home.`,
      }
}

export function createNotFoundError(): AppError {
  return {
    kind: 'not-found',
    status: 404,
    code: 'TRQ-404',
    title: 'Route not found',
    message:
      'That road does not exist in this garage. Let’s get you back to the fluids and fitment tools.',
  }
}

export function reportError(error: unknown, context?: string): AppError {
  const normalized = normalizeError(error, context)
  currentError.value = normalized
  console.error(`[Motor-Oil-EG] ${context ?? 'application'} error`, error)
  return normalized
}

export function clearError() {
  currentError.value = null
}

export function installGlobalErrorHandling(app: App) {
  app.config.errorHandler = (error, _instance, info) => {
    reportError(error, `Vue ${info}`)
  }

  window.addEventListener('error', (event) => {
    if (event.error) reportError(event.error, 'browser')
  })
  window.addEventListener('unhandledrejection', (event) => {
    reportError(event.reason, 'promise')
  })
}
