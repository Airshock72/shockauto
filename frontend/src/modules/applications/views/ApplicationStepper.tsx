import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/core/lib/utils'
import { getStepIndex, stepOptions } from 'src/modules/applications/helpers'
import type { ApplicationStepperProps } from 'src/modules/applications/types'

const ApplicationStepper = ({ activeStep, onSelect }: ApplicationStepperProps) => {
  const { t } = useTranslation()
  const activeIndex = getStepIndex(activeStep)

  return (
    <nav aria-label={t('applications.stepsLabel')}>
      <ol className='flex flex-col'>
        {stepOptions.map(({ value, title, description }, index) => {
          const isCompleted = index < activeIndex
          const isActive = index === activeIndex
          const isLast = index === stepOptions.length - 1

          return (
            <li
              key={value}
              className='relative animate-fade-up pb-6'
              style={{ animationDelay: `${index * 70}ms` }}
            >
              {!isLast && (
                <span aria-hidden='true' className='absolute top-11 bottom-1 left-4.5 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-border'>
                  <span
                    className={cn(
                      'block size-full origin-top bg-linear-to-b from-primary to-neon transition-transform duration-500 ease-fluid',
                      isCompleted ? 'scale-y-100' : 'scale-y-0'
                    )}
                  />
                </span>
              )}

              <button
                type='button'
                aria-current={isActive ? 'step' : undefined}
                onClick={() => onSelect(value)}
                className='group flex w-full items-start gap-3 rounded-xl text-left outline-none focus-visible:ring-4 focus-visible:ring-primary/15'
              >
                <span
                  className={cn(
                    'relative flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold',
                    'transition-[background-color,border-color,color,box-shadow,scale] duration-300 ease-spring group-hover:scale-110 group-active:scale-95',
                    isCompleted && 'border-transparent bg-linear-to-br from-primary to-neon text-primary-foreground',
                    isActive && 'border-primary bg-primary/10 text-primary shadow-[0_0_14px_-3px_var(--neon)]',
                    !isCompleted && !isActive && 'border-border bg-card text-muted-foreground group-hover:border-primary/40'
                  )}
                >
                  {isActive && <span aria-hidden='true' className='absolute inset-0 animate-glow-pulse rounded-full ring-4 ring-primary/15' />}
                  {isCompleted
                    ? <Check aria-hidden='true' className='size-4 animate-scale-in' />
                    : index + 1}
                </span>

                <span className='min-w-0 flex-1 pt-1.5'>
                  <span
                    className={cn(
                      'block text-sm font-semibold transition-colors duration-300',
                      isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  >
                    {t(title)}
                  </span>
                  <span className='mt-0.5 block text-xs leading-relaxed text-muted-foreground'>{t(description)}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default ApplicationStepper
