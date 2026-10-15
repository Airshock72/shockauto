import { useTranslation } from 'react-i18next'
import { cn } from 'src/core/lib/utils'
import { categoryOptions } from 'src/modules/applications/helpers'
import useCategoryTabs from 'src/modules/applications/hooks/useCategoryTabs.ts'
import type { CategoryTabsProps } from 'src/modules/applications/types'

const CategoryTabs = ({ value, onChange }: CategoryTabsProps) => {
  const { t } = useTranslation()
  const { containerRef, thumbRef } = useCategoryTabs(value)

  return (
    <div
      ref={containerRef}
      role='tablist'
      aria-label={t('applications.categoryLabel')}
      className='relative grid grid-cols-3 gap-1 rounded-xl border border-input bg-card p-1 shadow-soft'
    >
      <span
        ref={thumbRef}
        aria-hidden='true'
        className='absolute inset-y-1 left-0 rounded-lg bg-linear-to-br from-primary to-neon opacity-0 shadow-glow will-change-transform'
      />

      {categoryOptions.map(({ value: optionValue, label, icon: Icon }) => {
        const isSelected = value === optionValue

        return (
          <button
            key={optionValue}
            type='button'
            role='tab'
            aria-selected={isSelected}
            data-category={optionValue}
            onClick={() => onChange(optionValue)}
            className={cn(
              'relative z-10 flex h-11 min-w-0 items-center justify-center rounded-lg px-2 text-sm outline-none select-none [&_svg]:size-4.5',
              'transition-colors duration-300 focus-visible:ring-4 focus-visible:ring-primary/15',
              isSelected ? 'font-medium text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span data-category-label className='inline-flex min-w-0 items-center gap-2'>
              <Icon aria-hidden='true' className='shrink-0' />
              <span className='truncate max-xs:sr-only'>{t(label)}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs
