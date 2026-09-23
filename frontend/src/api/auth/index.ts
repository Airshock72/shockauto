import * as PublicApi from 'src/api/requests'
import {
  type LoginParams,
  RefreshTokenStatus,
  type ResponseToken,
  type Token,
  type TokenData
} from 'src/api/auth/types.ts'
import { parseLogin } from 'src/api/auth/parsers.ts'

export const login = async (params: LoginParams): Promise<TokenData> => {
  const response = await PublicApi.post('/Auth/Login', params)
  return parseLogin(response)
}

export const refreshToken = async (): Promise<RefreshTokenStatus> => {
  const storedToken = localStorage.getItem('token')
  if (!storedToken) return RefreshTokenStatus.EMPTY_TOKEN

  let parsedToken: Token
  try {
    parsedToken = JSON.parse(storedToken) as Token
    if (!parsedToken.accessToken || !parsedToken.refreshToken) {
      return RefreshTokenStatus.EMPTY_TOKEN
    }
  } catch {
    return RefreshTokenStatus.EMPTY_TOKEN
  }

  try {
    const params = { refreshToken: parsedToken.refreshToken }
    const response = await PublicApi.post('/Auth/RefreshToken', params, true)

    if (!response.content || typeof response.content !== 'object' || !('accessToken' in response.content)) {
      return RefreshTokenStatus.FAILED
    }

    const responseToken = response.content as ResponseToken

    const updatedToken: Token = {
      accessToken: responseToken.accessToken,
      refreshToken: parsedToken.refreshToken,
      expiresIn: responseToken.expiresIn + Date.now()
    }

    localStorage.setItem('token', JSON.stringify(updatedToken))
    return RefreshTokenStatus.SUCCESS

  } catch (e) {
    console.error('Refresh token failed:', e)
    return RefreshTokenStatus.FAILED
  }
}