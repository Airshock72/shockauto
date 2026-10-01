import i18n from 'src/i18n'

// Backend error message → translation key
export const errorMessagesMap: Record<string, string> = {
  'Too Many Requests': 'errors.tooManyRequests'
}

export const translateErrorMessage = (errorMessage: string, defaultKey = 'errors.default'): string => {
  return i18n.t(errorMessagesMap[errorMessage] || defaultKey)
}
