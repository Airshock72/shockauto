import type { ReactNode } from 'react'
import { cn } from 'src/core/lib/utils'

interface InputGroupProps {
  readonly label?: string
  readonly htmlFor?: string
  readonly required?: boolean
  readonly className?: string
  readonly children: ReactNode
}

const InputGroup = ({ label, htmlFor, required = false, className, children }: InputGroupProps) => (
  <div className={cn('flex flex-col gap-1.5 short:gap-1', className)}>
    {label && (
      <label htmlFor={htmlFor} className='text-sm font-medium text-foreground short:text-xs'>
        {label}
        {required && <span aria-hidden='true' className='ml-0.5 text-destructive'>*</span>}
      </label>
    )}

    <div
      role='group'
      aria-label={label}
      className={cn(
        'flex items-stretch rounded-lg shadow-soft',
        '*:relative *:min-w-0 *:focus-within:z-10 *:hover:z-10 [&_input]:shadow-none',
        '*:not-first:-ml-px [&>*:not(:first-child)_input]:rounded-l-none [&>*:not(:last-child)_input]:rounded-r-none',
        '[&>*:not(:first-child)_input]:bg-muted/40 [&>*:not(:first-child)_input]:font-medium'
      )}
    >
      {children}
    </div>
  </div>
)

export default InputGroup
