import { isStrongPassword, isValidEmail } from 'src/core/helpers/validators.ts'
import type { RegisterFormErrors, RegisterFormValues } from 'src/modules/auth/register/store/register.ts'

const validateName = (value: string, requiredMessage: string): string | undefined => {
  if (!value.trim()) return requiredMessage
  if (value.trim().length < 2) return 'მინიმუმ 2 სიმბოლო'
  return undefined
}

export const validateRegisterForm = (values: RegisterFormValues): RegisterFormErrors => {
  const errors: RegisterFormErrors = {
    firstName: validateName(values.firstName, 'სახელი სავალდებულოა'),
    lastName: validateName(values.lastName, 'გვარი სავალდებულოა')
  }

  if (!values.email.trim()) errors.email = 'ელ.ფოსტა სავალდებულოა'
  else if (!isValidEmail(values.email)) errors.email = 'შეიყვანეთ სწორი ელ.ფოსტა, მაგ. name@example.com'

  if (!values.password) errors.password = 'პაროლი სავალდებულოა'
  else if (!isStrongPassword(values.password)) errors.password = 'პაროლი არ აკმაყოფილებს ქვემოთ მოცემულ მოთხოვნებს'

  if (!values.repeatPassword) errors.repeatPassword = 'გაიმეორეთ პაროლი'
  else if (values.repeatPassword !== values.password) errors.repeatPassword = 'პაროლები არ ემთხვევა'

  return errors
}
