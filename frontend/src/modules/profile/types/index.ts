import type { AnimationEvent, ChangeEvent, ComponentProps, SubmitEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'
import type { GUID } from 'src/api/types/apiGlobalTypes.ts'
import type { actionCardVariants } from 'src/modules/profile/helpers'
import type { ProfileFormErrors, ProfileFormValues } from 'src/modules/profile/store/profile.ts'
import type { ChangePasswordFormErrors, ChangePasswordFormValues } from 'src/modules/profile/store/changePassword.ts'

export interface GenderOption {
  readonly value: string
  readonly label: string
  readonly icon: LucideIcon
}

export interface UserProfile {
  readonly userId: GUID
  readonly values: ProfileFormValues
  readonly errors: ProfileFormErrors
  readonly isLoading: boolean
  readonly isSubmitting: boolean
  readonly handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  readonly handleBirthDateChange: (value: string) => void
  readonly handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  readonly handleFormAnimationEnd: (event: AnimationEvent<HTMLFormElement>) => void
  readonly shouldShake: (field: keyof ProfileFormValues) => boolean
  readonly isChangePasswordOpen: boolean
  readonly openChangePassword: () => void
  readonly closeChangePassword: () => void
  readonly isDeleteAccountOpen: boolean
  readonly openDeleteAccount: () => void
  readonly closeDeleteAccount: () => void
}

export interface DeleteAccountAlertProps {
  readonly userId: GUID
  readonly isOpen: boolean
  readonly onClose: () => void
}

export interface DeleteAccount {
  readonly isDeleting: boolean
  readonly handleConfirm: () => void
  readonly handleAfterClose: () => void
}

export interface ChangePasswordModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export interface ChangePassword {
  readonly formId: string
  readonly values: ChangePasswordFormValues
  readonly errors: ChangePasswordFormErrors
  readonly isSubmitting: boolean
  readonly handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  readonly handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  readonly handleFormAnimationEnd: (event: AnimationEvent<HTMLFormElement>) => void
  readonly shouldShake: (field: keyof ChangePasswordFormValues) => boolean
  readonly reset: () => void
}

export interface ActionCardProps extends ComponentProps<'button'>, VariantProps<typeof actionCardVariants> {
  readonly icon: LucideIcon
  readonly title: string
  readonly description: string
}
