import { ChevronRight } from 'lucide-react'
import { cn } from 'src/core/lib/utils'
import { actionCardVariants, iconVariants } from 'src/modules/profile/helpers'
import type { ActionCardProps } from 'src/modules/profile/types'

const ActionCard = ({ icon: Icon, title, description, tone, type = 'button', className, ...props }: ActionCardProps) => {
  return (
    <button type={type} className={cn(actionCardVariants({ tone }), className)} {...props}>
      <span
        aria-hidden='true'
        className={cn(
          'pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent to-transparent',
          'transition-[translate] duration-700 ease-fluid group-hover:translate-x-full',
          tone === 'destructive' ? 'via-destructive/10' : 'via-primary/10'
        )}
      />

      <span className={iconVariants({ tone })}>
        <Icon aria-hidden='true' />
      </span>

      <span className='min-w-0 flex-1'>
        <span className={cn('block font-semibold', tone === 'destructive' && 'text-destructive')}>{title}</span>
        <span className='mt-0.5 block text-xs leading-relaxed text-muted-foreground'>{description}</span>
      </span>

      <ChevronRight
        aria-hidden='true'
        className='size-4.5 shrink-0 text-muted-foreground transition-[translate,color] duration-300 ease-fluid group-hover:translate-x-1 group-hover:text-foreground'
      />
    </button>
  )
}

export default ActionCard
