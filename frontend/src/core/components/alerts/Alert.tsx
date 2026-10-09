import { createPortal } from 'react-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { CircleAlert, type LucideIcon } from 'lucide-react'
import { cn } from 'src/core/lib/utils'
import Button from 'src/core/components/buttons/Button.tsx'
import useModal from 'src/core/hooks/modals/useModal.ts'

const alertIconVariants = cva(
  'alert-icon relative flex size-16 items-center justify-center rounded-full [&>svg]:size-8 [&>svg]:stroke-[2.25]',
  {
    variants: {
      tone: {
        default: 'bg-primary/15 text-primary shadow-[0_0_28px_-4px_var(--primary)]',
        destructive: 'bg-destructive/15 text-destructive shadow-[0_0_28px_-4px_var(--destructive)]'
      }
    },
    defaultVariants: {
      tone: 'default'
    }
  }
)

const alertRingVariants = cva('pointer-events-none absolute inset-0 rounded-full border-2', {
  variants: {
    tone: {
      default: 'border-primary/50',
      destructive: 'border-destructive/50'
    }
  },
  defaultVariants: {
    tone: 'default'
  }
})

const alertGlowVariants = cva('pointer-events-none absolute -top-28 left-1/2 size-60 -translate-x-1/2 rounded-full blur-3xl animate-glow-pulse', {
  variants: {
    tone: {
      default: 'bg-primary/20',
      destructive: 'bg-destructive/20'
    }
  },
  defaultVariants: {
    tone: 'default'
  }
})

interface AlertProps extends VariantProps<typeof alertIconVariants> {
  readonly isOpen: boolean
  readonly title: string
  readonly description?: string
  readonly icon?: LucideIcon
  readonly confirmText: string
  readonly cancelText: string
  readonly loading?: boolean
  readonly onConfirm: () => void
  readonly onClose: () => void
  readonly onAfterClose?: () => void
}

const Alert = ({
  isOpen,
  title,
  description,
  icon: Icon = CircleAlert,
  tone,
  confirmText,
  cancelText,
  loading = false,
  onConfirm,
  onClose,
  onAfterClose
}: AlertProps) => {
  const {
    isMounted,
    panelRef,
    titleId,
    descriptionId,
    handleBackdropClick,
    handleAnimationEnd
  } = useModal({ isOpen, preventClose: loading, onClose, onAfterClose })

  if (!isMounted) return null

  const dataState = isOpen ? 'open' : 'closed'

  return createPortal(
    <div
      data-state={dataState}
      onClick={handleBackdropClick}
      className='modal-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/60 p-4 backdrop-blur-sm sm:p-6'
    >
      <div
        ref={panelRef}
        role='alertdialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        data-state={dataState}
        onAnimationEnd={handleAnimationEnd}
        className={cn(
          'modal-panel relative w-full max-w-md overflow-hidden rounded-2xl border bg-card/90 p-6 text-center text-card-foreground outline-none backdrop-blur-xl sm:p-8',
          tone === 'destructive'
            ? 'shadow-[0_2px_4px_oklch(0_0_0/0.05),0_24px_64px_-16px_color-mix(in_oklch,var(--destructive)_45%,transparent)]'
            : 'shadow-[0_2px_4px_oklch(0_0_0/0.05),0_24px_64px_-16px_var(--glow)]'
        )}
      >
        <span aria-hidden='true' className={alertGlowVariants({ tone })} />

        <div className='relative mx-auto mb-5 flex size-16 items-center justify-center'>
          <span aria-hidden='true' className={cn(alertRingVariants({ tone }), 'alert-ring')} />
          <span aria-hidden='true' className={cn(alertRingVariants({ tone }), 'alert-ring-delayed')} />
          <span className={alertIconVariants({ tone })}>
            <Icon aria-hidden='true' />
          </span>
        </div>

        <h2 id={titleId} className='relative font-display text-xl font-bold'>{title}</h2>
        {description && (
          <p id={descriptionId} className='relative mt-2 text-sm leading-relaxed text-muted-foreground'>{description}</p>
        )}

        <div
          aria-hidden='true'
          className={cn(
            'relative my-6 h-px bg-linear-to-r from-transparent to-transparent',
            tone === 'destructive' ? 'via-destructive/40' : 'via-neon/40'
          )}
        />

        <div className='relative grid grid-cols-2 gap-3'>
          <Button data-autofocus variant='outline' fullWidth disabled={loading} onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant={tone === 'destructive' ? 'destructive' : 'primary'}
            fullWidth
            loading={loading}
            onClick={onConfirm}
            className={tone === 'destructive' ? 'hover:shadow-[0_8px_32px_-8px_var(--destructive)]' : undefined}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Alert
