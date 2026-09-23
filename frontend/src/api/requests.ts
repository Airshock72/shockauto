import { type GlobalResponse } from 'src/api/types/apiGlobalTypes.ts'
import { stringify } from 'src/core/helpers/queryString.ts'
import { handleRequestException, handleResponse } from 'src/api/helper'

const baseURL = import.meta.env.VITE_API_BASE_URL

export const sendRequest = async (
  url: string,
  method: string,
  params: unknown,
  BodyInit?: BodyInit,
  silent = false
): Promise<GlobalResponse> => {
  try {
    const urlParams = stringify(params, { encode: true })
    const headersObject = {
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

    return await handleResponse(response, silent)

  } catch (err) {
    return handleRequestException(err, silent)
  }
}

export const get = (url: string, params: unknown = {}, silent = false): Promise<GlobalResponse> => {
  return sendRequest(url, 'GET', params, undefined, silent)
}

export const post = (url: string, body: unknown, silent = false): Promise<GlobalResponse> => {
  return sendRequest(url, 'POST', {}, body as BodyInit, silent)
}