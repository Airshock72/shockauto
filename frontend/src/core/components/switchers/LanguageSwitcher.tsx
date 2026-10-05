import { cn } from 'src/core/lib/utils'
import { languageOptions } from 'src/core/helpers/languageSwitcher.ts'
import useLanguageSwitcher from 'src/core/hooks/switchers/useLanguageSwitcher.ts'
import type { LanguageSwitcherProps } from 'src/core/types/languageSwitcher.ts'

const LanguageSwitcher = ({ extended = false, className }: LanguageSwitcherProps) => {
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
      className={cn('relative flex items-center rounded-full border bg-secondary/60 p-1 shadow-soft', className)}
    >
      <span
        ref={thumbRef}
        aria-hidden='true'
        className='absolute top-1 left-0 h-8 w-11 rounded-full bg-primary shadow-glow will-change-transform'
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
              'relative z-10 flex h-8 items-center justify-center rounded-full px-3 text-sm font-semibold outline-none',
              'transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring',
              isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span data-language-label className='inline-flex items-center gap-2'>
              <option.Flag
                className={cn(
                  'size-4.5 shrink-0 rounded-full ring-1 transition-[filter,opacity] duration-300',
                  isActive ? 'ring-white/50' : 'opacity-70 ring-border grayscale-[0.4]'
                )}
              />
              {extended ? option.name : (
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
