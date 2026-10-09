import { Mars, Venus } from 'lucide-react'
import { cva } from 'class-variance-authority'
import type { ProfileFormValues } from 'src/modules/profile/store/profile.ts'
import type { Gender, Profile, ProfileParams } from 'src/api/account/types.ts'
import type { GenderOption } from 'src/modules/profile/types'
import { getYearsAgoIso } from 'src/core/helpers/datePicker.ts'

export const fieldOrder: Array<keyof ProfileFormValues> = [
  'firstName',
  'lastName',
  'gender',
  'birthDate',
  'personalNumber',
  'email',
  'phoneNumber'
]

export const genderOptions: Array<GenderOption> = [
  { value: 'Male', label: 'profile.genders.male', icon: Mars },
  { value: 'Female', label: 'profile.genders.female', icon: Venus }
]

export const minBirthDate = '1900-01-01'

export const minAge = 13

export const getMaxBirthDate = (): string => getYearsAgoIso(minAge)

export const transformProfileToFormValues = (profile: Profile): ProfileFormValues => ({
  firstName: profile.firstName,
  lastName: profile.lastName,
  gender: profile.gender,
  birthDate: profile.dateOfBirth?.slice(0, 10) ?? null,
  personalNumber: profile.personalNumber,
  email: profile.email,
  phoneNumber: profile.mobilePhone
})

export const transformProfileParams = (values: ProfileFormValues): ProfileParams => ({
  firstName: values.firstName.trim(),
  lastName: values.lastName.trim(),
  email: values.email.trim(),
  birthDate: values.birthDate,
  personalNumber: values.personalNumber,
  gender: values.gender as Gender | null,
  mobilePhone: values.phoneNumber
})

export const nullableFields: Array<keyof ProfileFormValues> = ['gender', 'birthDate', 'personalNumber', 'phoneNumber']

export const actionCardVariants = cva(
  [
    'group relative flex w-full animate-fade-up items-center gap-4 overflow-hidden rounded-xl border bg-card/60 p-5 text-left shadow-soft outline-none',
    'transition-[translate,scale,border-color,box-shadow,background-color] duration-300 ease-fluid',
    'hover:-translate-y-0.5 hover:bg-card focus-visible:ring-4 active:translate-y-0 active:scale-[0.98]'
  ],
  {
    variants: {
      tone: {
        default: 'hover:border-primary/40 hover:shadow-glow focus-visible:ring-primary/15',
        destructive: 'hover:border-destructive/40 hover:shadow-[0_8px_32px_-8px_var(--destructive)] focus-visible:ring-destructive/15'
      }
    },
    defaultVariants: {
      tone: 'default'
    }
  }
)

export const iconVariants = cva(
  'flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ease-spring group-hover:scale-110 group-hover:-rotate-6 [&_svg]:size-5.5',
  {
    variants: {
      tone: {
        default: 'bg-primary/10 text-primary',
        destructive: 'bg-destructive/10 text-destructive'
      }
    },
    defaultVariants: {
      tone: 'default'
    }
  }
)
