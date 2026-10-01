import type { ComponentProps, ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from 'src/core/lib/utils'
import type { Normalizer } from 'src/core/helpers/normalizers.ts'
import useTextInput from 'src/core/hooks/inputs/textInput.ts'

interface TextInputProps extends ComponentProps<'input'> {
  readonly label?: string
  readonly error?: string
  readonly hint?: string
  readonly leftIcon?: ReactNode
  readonly containerClassName?: string
  readonly shake?: boolean
  readonly normalizer?: Normalizer
}

const TextInput = ({
  label,
  error,
  hint,
  leftIcon,
  containerClassName,
  shake = false,
  normalizer,
  className,
  id,
  type = 'text',
  disabled,
  onChange,
  ...props
}: TextInputProps) => {
  const {
    isPasswordVisible,
    inputId,
    messageId,
    isPassword,
    message,
    handleChange,
    togglePasswordVisibility
  } = useTextInput({ id, type, error, hint, normalizer, onChange })

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className='text-sm font-medium text-foreground'>
          {label}
        </label>
      )}

      <div className={cn('group relative', shake && 'animate-shake')}>
        {leftIcon && (
          <span
            className={cn(
              'pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted-foreground',
              'transition-colors duration-200 group-focus-within:text-primary [&_svg]:size-4.5',
              error && 'text-destructive'
            )}
          >
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          type={isPassword && isPasswordVisible ? 'text' : type}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-foreground shadow-soft outline-none',
            'transition-[border-color,box-shadow,background-color] duration-200 ease-fluid',
            'placeholder:text-muted-foreground/70',
            'hover:border-primary/40',
            'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15',
            'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:shadow-none disabled:hover:border-input',
            'aria-invalid:border-destructive aria-invalid:hover:border-destructive aria-invalid:focus-visible:ring-destructive/15',
            leftIcon ? 'pl-10' : undefined,
            isPassword && 'pr-11',
            className
          )}
          onChange={handleChange}
          {...props}
        />

        {isPassword && (
          <button
            type='button'
            disabled={disabled}
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            aria-controls={inputId}
            className={cn(
              'absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none',
              'transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:size-4.5'
            )}
          >
            {isPasswordVisible ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>

      {message && (
        <p
          id={messageId}
          className={cn('animate-fade-in text-xs', error ? 'text-destructive' : 'text-muted-foreground')}
        >
          {message}
        </p>
      )}
    </div>
  )
}

export default TextInput
