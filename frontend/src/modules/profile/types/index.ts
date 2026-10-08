import type { AnimationEvent, ChangeEvent, ComponentProps, SubmitEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'
import type { actionCardVariants } from 'src/modules/profile/helpers'
import type { ProfileFormErrors, ProfileFormValues } from 'src/modules/profile/store/profile.ts'

export interface GenderOption {
  readonly value: string
  readonly label: string
  readonly icon: LucideIcon
}

export interface UserProfile {
  readonly values: ProfileFormValues
  readonly errors: ProfileFormErrors
  readonly handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  readonly handleBirthDateChange: (value: string) => void
  readonly handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  readonly handleFormAnimationEnd: (event: AnimationEvent<HTMLFormElement>) => void
  readonly shouldShake: (field: keyof ProfileFormValues) => boolean
}

export interface ActionCardProps extends ComponentProps<'button'>, VariantProps<typeof actionCardVariants> {
  readonly icon: LucideIcon
  readonly title: string
  readonly description: string
}
