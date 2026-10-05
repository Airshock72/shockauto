import type { LucideIcon } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'
import type { avatarVariants } from 'src/modules/header/helpers'

export interface UserMenuLink {
  readonly to: string
  readonly label: string
  readonly icon: LucideIcon
}

export interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  readonly initials: string
  readonly online?: boolean
  readonly className?: string
}
