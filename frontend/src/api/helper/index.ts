import { toast } from 'sonner'
import { type GlobalResponse, ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { translateErrorMessage } from 'src/core/helpers/errorTranslator.ts'
import { throwException } from 'src/core/helpers'

const AUTH_EXPIRED_MESSAGE_KEY = 'auth-expired-message'
const NETWORK_ERROR_MESSAGE = 'სერვერთან დაკავშირება ვერ მოხერხდა, შეამოწმეთ ინტერნეტ კავშირი'

export interface NotifyOptions {
  title: string
  description?: string
  /** Seconds the notification stays visible */
  duration?: number
}

export const notifyError = ({ title, description, duration = 4.5 }: NotifyOptions): void => {
  toast.error(title, {
    id: `error:${title}:${description ?? ''}`,
    description,
    duration: duration * 1000
  })
}

export const clearLocalStorage = () => {
  localStorage.removeItem('token')
  localStorage.setItem('app-logout-event', Date.now().toString())
}

export const setAuthExpiredMessage = (message: string): void => {
  localStorage.setItem(AUTH_EXPIRED_MESSAGE_KEY, message)
}

export const consumeAuthExpiredMessage = (): string | null => {
  const message = localStorage.getItem(AUTH_EXPIRED_MESSAGE_KEY)
  if (message) localStorage.removeItem(AUTH_EXPIRED_MESSAGE_KEY)
  return message
}

const parseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const extractErrorKey = (body: unknown): string | null => {
  if (typeof body === 'string') return body.trim() || null
  if (typeof body === 'number') return String(body)
  if (!body || typeof body !== 'object') return null

  const data = body as Record<string, unknown>

  for (const key of ['message', 'error', 'detail', 'title', 'errorCode', 'code']) {
    const value = data[key]
    if (typeof value === 'string' && value.trim()) return value
    if (typeof value === 'number') return String(value)
  }

  if (data.errors && typeof data.errors === 'object') {
    const first = Object.values(data.errors as Record<string, unknown>)[0]
    if (Array.isArray(first) && typeof first[0] === 'string') return first[0]
    if (typeof first === 'string') return first
  }

  return null
}

export const handleResponse = async (response: Response, silent = false): Promise<GlobalResponse> => {
  let body: unknown = null
  try {
    body = await parseBody(response)
  } catch {
    body = null
  }

  if (!response.ok) {
    const errorKey = extractErrorKey(body) ?? response.statusText
    const errorMessage = translateErrorMessage(errorKey)

    if (!silent) notifyError({ title: errorMessage, duration: 4.5 })

    return { status: response.status, content: null }
  }

  return {
    status: response.status,
    content: body
  }
}

export const handleRequestException = (err: unknown, silent = false): GlobalResponse => {
  throwException(err)

  const isAborted = err instanceof DOMException && err.name === 'AbortError'
  if (!silent && !isAborted) notifyError({ title: NETWORK_ERROR_MESSAGE, duration: 4.5 })

  return {
    status: ResponseStatuses.UNEXPECTED,
    content: null
  }
}
