import { isValidEmail } from 'src/core/helpers/validators.ts'
import { getTodayIso } from 'src/core/helpers/datePicker.ts'
import { minBirthDate } from 'src/modules/profile/helpers'
import type { ProfileFormErrors, ProfileFormValues } from 'src/modules/profile/store/profile.ts'

const validateName = (value: string, requiredKey: string): string | undefined => {
  if (!value.trim()) return requiredKey
  if (value.trim().length < 2) return 'validation.minLength2'
  return undefined
}

const validateBirthDate = (value: string): string | undefined => {
  if (!value) return 'validation.birthDateRequired'
  if (value < minBirthDate || value > getTodayIso()) return 'validation.birthDateInvalid'
  return undefined
}

export const validateProfileForm = (values: ProfileFormValues): ProfileFormErrors => {
  const errors: ProfileFormErrors = {
    firstName: validateName(values.firstName, 'validation.firstNameRequired'),
    lastName: validateName(values.lastName, 'validation.lastNameRequired'),
    birthDate: validateBirthDate(values.birthDate)
  }

  if (!values.gender) errors.gender = 'validation.genderRequired'

  if (values.personalNumber && !/^\d{11}$/.test(values.personalNumber)) errors.personalNumber = 'validation.personalNumberInvalid'

  if (!values.email.trim()) errors.email = 'validation.emailRequired'
  else if (!isValidEmail(values.email)) errors.email = 'validation.emailInvalid'

  if (values.phoneNumber && !/^\d{9}$/.test(values.phoneNumber)) errors.phoneNumber = 'validation.phoneNumberInvalid'

  return errors
}
