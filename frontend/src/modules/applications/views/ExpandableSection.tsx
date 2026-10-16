import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/core/lib/utils'
import type { ExpandableSectionProps } from 'src/modules/applications/types'

const ExpandableSection = ({ index, step, isExpanded, isActive, onToggle, children }: ExpandableSectionProps) => {
  const { t } = useTranslation()
  const { value, title, description, icon: Icon } = step
  const contentId = `application-step-${value}-content`

  return (
    <section
      id={`application-step-${value}`}
      className={cn(
        'relative scroll-mt-24 animate-fade-up rounded-xl border bg-card/60 shadow-soft focus-within:z-10',
        'transition-[border-color,box-shadow,background-color] duration-300 ease-fluid',
        isActive ? 'border-primary/40 bg-card shadow-glow' : 'hover:border-primary/25'
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        type='button'
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={() => onToggle(value)}
        className='group flex w-full items-center gap-4 p-4 text-left outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary/15 sm:p-5'
      >
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-xl transition-[background-color,color,rotate,scale] duration-300 ease-spring',
            'group-hover:scale-110 group-hover:-rotate-6',
            isActive ? 'bg-linear-to-br from-primary to-neon text-primary-foreground' : 'bg-primary/10 text-primary'
          )}
        >
          <Icon aria-hidden='true' />
        </span>

        <span className='min-w-0 flex-1'>
          <span className='block font-semibold'>{t(title)}</span>
          <span className='mt-0.5 block truncate text-xs text-muted-foreground'>{t(description)}</span>
        </span>

        <ChevronDown
          aria-hidden='true'
          className={cn(
            'size-5 shrink-0 text-muted-foreground transition-[rotate,color] duration-300 ease-fluid group-hover:text-foreground',
            isExpanded && 'rotate-180 text-foreground'
          )}
        />
      </button>

      <div
        id={contentId}
        role='region'
        inert={!isExpanded}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-400 ease-fluid',
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div
          className={cn(
            'min-h-0 transition-discrete',
            isExpanded ? 'overflow-visible transition-[overflow] delay-400' : 'overflow-hidden'
          )}
        >
          <div className='border-t px-4 py-5 sm:px-5'>
            {children ?? (
              <div className='flex min-h-24 items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground'>
                {t('applications.sectionPlaceholder')}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpandableSection
