import { isValidEmail } from 'src/core/helpers/validators.ts'
import type { LoginFormErrors, LoginFormValues } from 'src/modules/auth/login/store/login.ts'

export const validateLoginForm = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {}

  if (!values.email.trim()) errors.email = 'validation.emailRequired'
  else if (!isValidEmail(values.email)) errors.email = 'validation.emailInvalid'

  if (!values.password) errors.password = 'validation.passwordRequired'

  return errors
}
