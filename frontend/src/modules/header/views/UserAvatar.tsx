import { cn } from 'src/core/lib/utils'
import { avatarVariants } from 'src/modules/header/helpers'
import type { UserAvatarProps } from 'src/modules/header/types'

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
