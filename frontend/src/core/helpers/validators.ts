const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface PasswordRule {
  readonly id: string
  readonly label: string
  readonly test: (value: string) => boolean
}

export type PasswordStrength = 'empty' | 'weak' | 'medium' | 'strong'

export const PASSWORD_RULES: Array<PasswordRule> = [
  { id: 'length', label: 'მინიმუმ 10 ასო', test: (value) => value.length >= 10 },
  { id: 'uppercase', label: 'ერთი დიდი ასო', test: (value) => /[A-Z]/.test(value) },
  { id: 'lowercase', label: 'ერთი პატარა ასო', test: (value) => /[a-z]/.test(value) },
  { id: 'number', label: 'ერთი ციფრი', test: (value) => /\d/.test(value) },
  { id: 'special', label: 'ერთი სიმბოლო', test: (value) => /[^A-Za-z0-9\s]/.test(value) }
]

export const isValidEmail = (value: string): boolean => EMAIL_REGEX.test(value.trim())

export const isStrongPassword = (value: string): boolean => PASSWORD_RULES.every((rule) => rule.test(value))

export const getPasswordStrength = (value: string): PasswordStrength => {
  if (!value) return 'empty'

  const passed = PASSWORD_RULES.filter((rule) => rule.test(value)).length

  if (passed === PASSWORD_RULES.length) return 'strong'
  if (passed >= 3) return 'medium'
  return 'weak'
}
