import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'src/core/lib/utils'

const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-neon select-none',
    'font-display font-semibold text-primary-foreground ring-2 ring-background shadow-[0_0_14px_-3px_var(--neon)]'
  ],
  {
    variants: {
      size: {
        sm: 'size-8 text-xs',
        md: 'size-9 text-sm',
        lg: 'size-12 text-base'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  readonly initials: string
  readonly online?: boolean
  readonly className?: string
}

const UserAvatar = ({ initials, size, online = true, className }: UserAvatarProps) => {
  return (
    <span aria-hidden='true' className={cn(avatarVariants({ size }), className)}>
      {initials}
      {online && (
        <span className='absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-success' />
      )}
    </span>
  )
}

export default UserAvatar
