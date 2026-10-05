import type { Token } from 'src/api/auth/types.ts'

export interface CurrentUser {
  readonly name: string
  readonly email: string
  readonly initials: string
}

type JwtPayload = Record<string, unknown>

const claims = {
  email: ['email', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
  name: ['name', 'unique_name', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
  givenName: ['given_name', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
  familyName: ['family_name', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname']
}

const decodeJwtPayload = (jwt: string): JwtPayload | null => {
  try {
    const base64 = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0))
    return JSON.parse(new TextDecoder().decode(bytes)) as JwtPayload
  } catch {
    return null
  }
}

const readClaim = (payload: JwtPayload, keys: Array<string>): string => {
  for (const key of keys) {
    const value = payload[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

const nameFromEmail = (email: string) => email.split('@')[0].split(/[._-]+/).filter(Boolean).map(capitalize).join(' ')

const getInitials = (name: string) => {
  const parts = name.split(/\s+/).filter(Boolean)
  const initials = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : name.slice(0, 2)
  return initials.toUpperCase() || '?'
}

export const getCurrentUser = (): CurrentUser => {
  let payload: JwtPayload | null = null

  try {
    const token = JSON.parse(localStorage.getItem('token') ?? 'null') as Token | null
    if (token?.accessToken) payload = decodeJwtPayload(token.accessToken)
  } catch {
    payload = null
  }

  const email = payload ? readClaim(payload, claims.email) : ''
  const fullName = payload
    ? readClaim(payload, claims.name) ||
      [readClaim(payload, claims.givenName), readClaim(payload, claims.familyName)].filter(Boolean).join(' ')
    : ''
  const name = fullName || nameFromEmail(email) || 'User'

  return { name, email, initials: getInitials(name) }
}
