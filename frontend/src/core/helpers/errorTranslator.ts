export const errorMessagesMap: Record<string, string> = {
  'Too Many Requests': 'დაფიქსირდა მოთხოვნების ჭარბი რაოდენობა, გთხოვთ სცადოთ მოგვიანებით'
}

export const translateErrorMessage = (errorMessage: string, defaultMessage = 'დაფიქსირდა შეცდომა, გთხოვთ სცადოთ მოგვიანებით'): string => {
  return errorMessagesMap[errorMessage] || defaultMessage
}