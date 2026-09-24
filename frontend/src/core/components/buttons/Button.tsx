import type { ComponentProps, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from 'src/core/lib/utils'

const buttonVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap outline-none select-none',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-fluid',
    'focus-visible:ring-4 focus-visible:ring-ring/40 active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-55 disabled:shadow-none [&_svg]:shrink-0'
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 hover:shadow-glow',
        secondary: 'bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80 [--shimmer-color:color-mix(in_oklch,var(--primary)_22%,transparent)]',
        outline: 'border border-input bg-card text-foreground shadow-soft hover:border-primary/40 hover:bg-accent/50 [--shimmer-color:color-mix(in_oklch,var(--primary)_22%,transparent)]',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        sm: 'h-9 rounded-md px-3 text-sm [&_svg]:size-4',
        md: 'h-11 rounded-lg px-5 text-sm [&_svg]:size-4.5',
        lg: 'h-12 rounded-xl px-6 text-base [&_svg]:size-5',
        icon: 'size-10 rounded-lg [&_svg]:size-4.5'
      },
      fullWidth: {
        true: 'w-full'
      },
      shimmer: {
        true: 'btn-shimmer'
      }
    },
    compoundVariants: [
      { variant: 'link', class: 'h-auto px-0 active:scale-100' }
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  readonly loading?: boolean
  readonly leftIcon?: ReactNode
  readonly rightIcon?: ReactNode
}

const Button = ({
  variant,
  size,
  fullWidth,
  shimmer,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) => {
  const hasShimmer = shimmer ?? (variant !== 'ghost' && variant !== 'link')

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, fullWidth, shimmer: hasShimmer }), className)}
      {...props}
    >
      {loading ? <Loader2 className='animate-spin' aria-hidden='true' /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
}

export default Button
