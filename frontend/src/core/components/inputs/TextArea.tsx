import { type ComponentProps, useId } from 'react'
import { cn } from 'src/core/lib/utils'

interface TextAreaProps extends ComponentProps<'textarea'> {
  readonly label?: string
  readonly containerClassName?: string
}

const TextArea = ({
  label,
  containerClassName,
  className,
  id,
  value,
  maxLength,
  required = false,
  rows = 5,
  ...props
}: TextAreaProps) => {
  const generatedId = useId()
  const textAreaId = id ?? generatedId
  const counterId = `${textAreaId}-counter`
  const length = typeof value === 'string' ? value.length : 0
  const isAtLimit = maxLength !== undefined && length >= maxLength

  return (
    <div className={cn('flex flex-col gap-1.5 short:gap-1', containerClassName)}>
      {label && (
        <label htmlFor={textAreaId} className='text-sm font-medium text-foreground short:text-xs'>
          {label}
          {required && <span aria-hidden='true' className='ml-0.5 text-destructive'>*</span>}
        </label>
      )}

      <div className='relative'>
        <textarea
          id={textAreaId}
          rows={rows}
          value={value}
          maxLength={maxLength}
          required={required}
          aria-describedby={maxLength !== undefined ? counterId : undefined}
          className={cn(
            'block w-full resize-y rounded-lg border border-input bg-card px-3.5 pt-3 text-sm leading-relaxed text-foreground shadow-soft outline-none',
            'transition-[border-color,box-shadow,background-color] duration-200 ease-fluid',
            'placeholder:text-muted-foreground/70',
            'hover:border-primary/40',
            'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15',
            'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:shadow-none disabled:hover:border-input',
            maxLength !== undefined ? 'pb-8' : 'pb-3',
            className
          )}
          {...props}
        />

        {maxLength !== undefined && (
          <span
            id={counterId}
            aria-live='polite'
            className={cn(
              'pointer-events-none absolute right-3 bottom-2 rounded-md bg-card/90 px-1.5 text-2xs font-medium tabular-nums transition-colors duration-200',
              isAtLimit ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}

export default TextArea
