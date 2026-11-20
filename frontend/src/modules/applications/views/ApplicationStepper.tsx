import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/core/lib/utils'
import TruncatedText from 'src/core/components/tooltips/TruncatedText.tsx'
import { getStepIndex, isStepCompleted, stepOptions } from 'src/modules/applications/helpers'
import type { ApplicationStepperProps } from 'src/modules/applications/types'

const ApplicationStepper = ({ activeStep, stepProgress, onSelect, isVertical }: ApplicationStepperProps) => {
  const { t } = useTranslation()
  const activeIndex = getStepIndex(activeStep)

  return (
    <nav aria-label={t('applications.stepsLabel')} className='w-full'>
      <ol className={cn('flex', isVertical && 'flex-col')}>
        {stepOptions.map(({ value, title, description }, index) => {
          const isCompleted = isStepCompleted(stepProgress[value])
          const isActive = index === activeIndex
          const isLast = index === stepOptions.length - 1

          return (
            <li
              key={value}
              className={cn('relative animate-fade-up', isVertical ? !isLast && 'pb-6' : 'min-w-0 flex-1')}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              {!isLast && (
                <span
                  aria-hidden='true'
                  className={cn(
                    'absolute overflow-hidden rounded-full bg-border',
                    isVertical
                      ? 'top-11 bottom-1 left-4.5 w-0.5 -translate-x-1/2'
                      : 'top-4.5 right-[calc(-50%+1.75rem)] left-[calc(50%+1.75rem)] h-0.5 -translate-y-1/2'
                  )}
                >
                  <span
                    className={cn(
                      'block size-full from-primary to-neon transition-transform duration-500 ease-fluid',
                      isVertical ? 'origin-top bg-linear-to-b' : 'origin-left bg-linear-to-r',
                      isVertical
                        ? (isCompleted ? 'scale-y-100' : 'scale-y-0')
                        : (isCompleted ? 'scale-x-100' : 'scale-x-0')
                    )}
                  />
                </span>
              )}

              <button
                type='button'
                aria-current={isActive ? 'step' : undefined}
                onClick={() => onSelect(value)}
                className={cn(
                  'group flex w-full rounded-xl outline-none focus-visible:ring-4 focus-visible:ring-primary/15',
                  isVertical ? 'items-start gap-3 text-left' : 'flex-col items-center gap-2 text-center'
                )}
              >
                <span
                  className={cn(
                    'relative flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold',
                    'transition-[background-color,border-color,color,box-shadow,scale] duration-300 ease-spring group-hover:scale-110 group-active:scale-95',
                    isCompleted && 'border-transparent bg-linear-to-br from-primary to-neon text-primary-foreground',
                    isActive && !isCompleted && 'border-primary bg-primary/10 text-primary shadow-[0_0_14px_-3px_var(--neon)]',
                    !isCompleted && !isActive && 'border-border bg-card text-muted-foreground group-hover:border-primary/40'
                  )}
                >
                  {isActive && <span aria-hidden='true' className='absolute inset-0 animate-glow-pulse rounded-full ring-4 ring-primary/15' />}
                  {isCompleted
                    ? <Check aria-hidden='true' className='size-4 animate-scale-in' />
                    : index + 1}
                </span>

                <span className={cn('min-w-0', isVertical ? 'flex-1 pt-1.5' : 'w-full px-1')}>
                  <span
                    className={cn(
                      'block font-semibold transition-colors duration-300',
                      isVertical ? 'text-sm' : 'text-xs sm:text-sm',
                      isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  >
                    {isVertical ? t(title) : <TruncatedText text={t(title)} />}
                  </span>
                  <span className={cn('mt-0.5 text-muted-foreground', isVertical ? 'block text-xs leading-relaxed' : 'hidden text-2xs xl:block')}>
                    {isVertical ? t(description) : <TruncatedText text={t(description)} />}
                  </span>
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
