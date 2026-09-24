import { cn } from 'src/core/lib/utils'

interface DividerProps {
  readonly label?: string
  readonly className?: string
}

const Divider = ({ label, className }: DividerProps) => {
  return (
    <div className={cn('flex items-center gap-3 text-2xs font-medium tracking-futuristic text-muted-foreground uppercase', className)}>
      <span className='h-px flex-1 bg-linear-to-r from-transparent to-border' aria-hidden='true' />
      {label && <span>{label}</span>}
      <span className='h-px flex-1 bg-linear-to-l from-transparent to-border' aria-hidden='true' />
    </div>
  )
}

export default Divider
