// RFC 3986 encoding: like encodeURIComponent, but also escapes !'()*
const encodeValue = (value: string): string =>
  encodeURIComponent(value).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)

const serializePrimitive = (value: unknown): string => {
  if (value === null) return ''
  if (value instanceof Date) return value.toISOString()
  return String(value)
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !(value instanceof Date) && !Array.isArray(value)

const byKey = (a: string, b: string) => a.localeCompare(b)

const serialize = (prefix: string, value: unknown, parts: Array<string>): void => {
  if (value === undefined || typeof value === 'function' || typeof value === 'symbol') return

  if (Array.isArray(value)) {
    value.forEach((item) => serialize(`${prefix}[]`, item, parts))
    return
  }

  if (isPlainObject(value)) {
    Object.keys(value)
      .sort(byKey)
      .forEach((key) => serialize(`${prefix}[${key}]`, value[key], parts))
    return
  }

  // keys stay unencoded (encodeValuesOnly), null becomes an empty value
  parts.push(`${prefix}=${encodeValue(serializePrimitive(value))}`)
}

/**
 * Builds a query string such as `?a=1&b[]=x&b[]=y&c[d]=z`.
 * Object keys are sorted alphabetically, array items use `[]`, undefined values are skipped.
 */
export const stringify = (params: unknown): string => {
  if (!isPlainObject(params)) return ''

  const parts: Array<string> = []
  Object.keys(params)
    .sort(byKey)
    .forEach((key) => serialize(key, params[key], parts))

  return parts.length ? `?${parts.join('&')}` : ''
}
