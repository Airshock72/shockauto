import type { ComponentProps } from 'react'
import { cn } from 'src/core/lib/utils'

const Card = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('rounded-2xl border bg-card/80 p-6 text-card-foreground shadow-elevated backdrop-blur-xl sm:p-8', className)}
      {...props}
    />
  )
}

export default Card
