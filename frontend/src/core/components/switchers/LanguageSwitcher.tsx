import { cn } from 'src/core/lib/utils'
import { LANGUAGE_OPTIONS } from 'src/core/helpers/languageSwitcher.ts'
import useLanguageSwitcher from 'src/core/hooks/switchers/useLanguageSwitcher.ts'

const LanguageSwitcher = () => {
  const { containerRef, thumbRef, activeLanguage, label, handleSelect } = useLanguageSwitcher()

  return (
    <div
      ref={containerRef}
      role='radiogroup'
      aria-label={label}
      className='glass fixed top-4 left-4 z-50 flex items-center rounded-full border p-1 shadow-soft'
    >
      <span
        ref={thumbRef}
        aria-hidden='true'
        className='absolute top-1 left-0 h-8 w-11 rounded-full bg-primary shadow-glow will-change-transform'
      />

      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = option.code === activeLanguage

        return (
          <button
            key={option.code}
            type='button'
            role='radio'
            lang={option.code}
            aria-checked={isActive}
            data-language={option.code}
            onClick={() => handleSelect(option.code)}
            className={cn(
              'relative z-10 flex h-8 w-11 items-center justify-center rounded-full text-sm font-semibold outline-none',
              'transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring',
              isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span data-language-label className='inline-block'>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
