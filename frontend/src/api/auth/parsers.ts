import type { GlobalResponse } from 'src/api/types/apiGlobalTypes.ts'
import type {
  ResponseToken,
  TokenData
} from 'src/api/auth/types.ts'
import { errorObject, throwException } from 'src/core/helpers'

export const parseLogin = (response: GlobalResponse): TokenData => {
  if (response.content === null) return { data: null, status: response.status }
  const token = response.content as ResponseToken
  try {
    return {
      data: {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken
      },
      status: response.status
    }
  } catch (err) {
    throwException(err)
    return errorObject
  }
}