import { isStrongPassword, isValidEmail } from 'src/core/helpers/validators.ts'
import type { RegisterFormErrors, RegisterFormValues } from 'src/modules/auth/register/store/register.ts'

const validateName = (value: string, requiredKey: string): string | undefined => {
  if (!value.trim()) return requiredKey
  if (value.trim().length < 2) return 'validation.minLength2'
  return undefined
}

export const validateRegisterForm = (values: RegisterFormValues): RegisterFormErrors => {
  const errors: RegisterFormErrors = {
    firstName: validateName(values.firstName, 'validation.firstNameRequired'),
    lastName: validateName(values.lastName, 'validation.lastNameRequired')
  }

  if (!values.email.trim()) errors.email = 'validation.emailRequired'
  else if (!isValidEmail(values.email)) errors.email = 'validation.emailInvalid'

  if (!values.password) errors.password = 'validation.passwordRequired'
  else if (!isStrongPassword(values.password)) errors.password = 'validation.passwordWeak'

  if (!values.repeatPassword) errors.repeatPassword = 'validation.repeatPasswordRequired'
  else if (values.repeatPassword !== values.password) errors.repeatPassword = 'validation.passwordsMismatch'

  return errors
}
