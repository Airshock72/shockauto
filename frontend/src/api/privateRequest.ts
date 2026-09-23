import { type GlobalResponse, ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { stringify } from 'src/core/helpers/queryString.ts'
import { RefreshTokenStatus } from 'src/api/auth/types.ts'
import { clearLocalStorage, handleRequestException, handleResponse, setAuthExpiredMessage } from 'src/api/helper'
import { refreshToken } from 'src/api/auth'

const baseURL = import.meta.env.VITE_API_BASE_URL
let refreshTokenPromise: Promise<RefreshTokenStatus> | null = null

export const sendPrivateRequest = async (
  url: string,
  method: string,
  params: unknown,
  reFetching: boolean,
  BodyInit?: BodyInit
): Promise<GlobalResponse> => {
  try {
    const storedToken = localStorage.getItem('token')
    const token = storedToken ? JSON.parse(storedToken) : null

    const urlParams = stringify(params, { encode: true })
    const headersObject: Record<string, string> = {
      Authorization: token ? `Bearer ${token.accessToken}` : '',
      'Accept-Language': 'ka',
      'Accept': 'application/json'
    }
    const headers = { ...headersObject, 'Content-Type': 'application/json' }
    const body = BodyInit && JSON.stringify(BodyInit)

    const response = await fetch(baseURL + url + urlParams, {
      body,
      headers,
      method
    })

    if (response.status === ResponseStatuses.UNAUTHENTICATED && reFetching) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken()
      }

      const refreshStatus = await refreshTokenPromise
      refreshTokenPromise = null

      if (refreshStatus === RefreshTokenStatus.SUCCESS) {
        return sendPrivateRequest(url, method, params, false, BodyInit)
      }

      if (refreshStatus === RefreshTokenStatus.LOCKED || refreshStatus === RefreshTokenStatus.FAILED) {
        clearLocalStorage()
        setAuthExpiredMessage('გთხოვთ გაიაროთ ავტორიზაცია თავიდან')
        window.location.href = '/login'
        return { status: ResponseStatuses.UNAUTHENTICATED, content: null }
      }
    }

    return await handleResponse(response)

  } catch (err) {
    return handleRequestException(err)
  }
}

export const get = (url: string, params: unknown = {}): Promise<GlobalResponse> => {
  return sendPrivateRequest(url, 'GET', params, true)
}

export const post = (url: string, body: unknown): Promise<GlobalResponse> => {
  return sendPrivateRequest(url, 'POST', {}, true, body as BodyInit)
}

export const deleteItem = (url: string, params?: unknown): Promise<GlobalResponse> => {
  return sendPrivateRequest(url, 'DELETE', {}, true, params as BodyInit)
}

export const put = (url: string, body: unknown): Promise<GlobalResponse> => {
  return sendPrivateRequest(url, 'PUT', {}, true, body as BodyInit)
}