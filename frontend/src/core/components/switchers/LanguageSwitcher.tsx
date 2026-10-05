import { cn } from 'src/core/lib/utils'
import { languageOptions } from 'src/core/helpers/languageSwitcher.ts'
import useLanguageSwitcher from 'src/core/hooks/switchers/useLanguageSwitcher.ts'
import type { LanguageSwitcherProps } from 'src/core/types/languageSwitcher.ts'

const LanguageSwitcher = ({ extended = false, mini = false, className }: LanguageSwitcherProps) => {
  const {
    containerRef,
    thumbRef,
    activeLanguage,
    label,
    handleSelect
  } = useLanguageSwitcher()

  return (
    <div
      ref={containerRef}
      role='radiogroup'
      aria-label={label}
      className={cn('relative flex items-center rounded-full border bg-secondary/60 shadow-soft', mini ? 'p-0.5' : 'p-1', className)}
    >
      <span
        ref={thumbRef}
        aria-hidden='true'
        className={cn(
          'absolute left-0 w-11 rounded-full bg-primary shadow-glow will-change-transform',
          mini ? 'top-0.5 h-7' : 'top-1 h-8'
        )}
      />

      {languageOptions.map((option) => {
        const isActive = option.code === activeLanguage

        return (
          <button
            key={option.code}
            type='button'
            role='radio'
            lang={option.code}
            aria-checked={isActive}
            aria-label={option.name}
            data-language={option.code}
            onClick={() => handleSelect(option.code)}
            className={cn(
              'relative z-10 flex items-center justify-center rounded-full font-semibold outline-none',
              mini ? 'h-7 px-2.5 text-xs' : 'h-8 px-3 text-sm',
              'transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring',
              isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span data-language-label className={cn('inline-flex items-center', mini ? 'gap-1.5' : 'gap-2')}>
              <option.Flag
                className={cn(
                  'shrink-0 rounded-full ring-1 transition-[filter,opacity] duration-300',
                  mini ? 'size-4' : 'size-4.5',
                  isActive ? 'ring-white/50' : 'opacity-70 ring-border grayscale-[0.4]'
                )}
              />
              {mini ? option.label : extended ? option.name : (
                <>
                  <span className='xl:hidden'>{option.label}</span>
                  <span className='hidden xl:inline'>{option.name}</span>
                </>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
