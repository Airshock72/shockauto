import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { type LucideIcon, X } from 'lucide-react'
import { cn } from 'src/core/lib/utils'
import useModal from 'src/core/hooks/modals/useModal.ts'

interface ModalProps {
  readonly isOpen: boolean
  readonly title: string
  readonly description?: string
  readonly icon?: LucideIcon
  readonly footer?: ReactNode
  readonly preventClose?: boolean
  readonly className?: string
  readonly children?: ReactNode
  readonly onClose: () => void
  readonly onAfterClose?: () => void
}

const Modal = ({
  isOpen,
  title,
  description,
  icon: Icon,
  footer,
  preventClose = false,
  className,
  children,
  onClose,
  onAfterClose
}: ModalProps) => {
  const { t } = useTranslation()
  const {
    isMounted,
    panelRef,
    titleId,
    descriptionId,
    requestClose,
    handleBackdropClick,
    handleAnimationEnd
  } = useModal({ isOpen, preventClose, onClose, onAfterClose })

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
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        data-state={dataState}
        onAnimationEnd={handleAnimationEnd}
        className={cn(
          'modal-panel neon-edge relative flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden outline-none',
          'rounded-2xl border bg-card/90 text-card-foreground backdrop-blur-xl',
          'shadow-[0_2px_4px_oklch(0_0_0/0.05),0_24px_64px_-16px_var(--glow)]',
          className
        )}
      >
        <span
          aria-hidden='true'
          className='pointer-events-none absolute -top-24 left-1/2 size-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-glow-pulse'
        />

        <header className='relative flex items-start gap-4 p-6 pb-5 sm:px-8 sm:pt-8'>
          {Icon && (
            <span className='flex size-12 shrink-0 animate-scale-in items-center justify-center rounded-xl bg-linear-to-br from-primary to-neon text-primary-foreground shadow-[0_0_14px_-3px_var(--neon)]'>
              <Icon aria-hidden='true' />
            </span>
          )}
          <div className='min-w-0 flex-1 space-y-1 pt-0.5'>
            <h2 id={titleId} className='font-display text-xl font-bold'>{title}</h2>
            {description && <p id={descriptionId} className='text-sm text-muted-foreground'>{description}</p>}
          </div>
          <button
            type='button'
            disabled={preventClose}
            onClick={requestClose}
            aria-label={t('common.close')}
            className={cn(
              '-mt-1 -mr-2 flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none',
              'transition-[background-color,color,rotate,scale] duration-300 ease-fluid hover:rotate-90 hover:bg-accent hover:text-foreground',
              'focus-visible:ring-2 focus-visible:ring-ring active:scale-90 disabled:pointer-events-none disabled:opacity-40'
            )}
          >
            <X aria-hidden='true' />
          </button>
        </header>

        <div aria-hidden='true' className='mx-6 h-px bg-linear-to-r from-transparent via-neon/40 to-transparent sm:mx-8' />

        <div className='relative min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8'>
          {children}
        </div>

        {footer && (
          <footer className='relative flex flex-col-reverse gap-3 border-t bg-muted/30 px-6 py-4 sm:flex-row sm:justify-end sm:px-8'>
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  )
}

export default Modal
