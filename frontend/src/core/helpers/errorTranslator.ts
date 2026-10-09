import i18n from 'src/i18n'

export const errorMessagesMap: Record<string, string> = {
  'Too Many Requests': 'errors.tooManyRequests',
  'invalidCredentials': 'errors.invalidCredentials',
  'accountDisabled': 'errors.accountDisabled'
}

export const translateErrorMessage = (errorMessage: string, defaultKey = 'errors.default'): string => {
  return i18n.t(errorMessagesMap[errorMessage] || defaultKey)
}
