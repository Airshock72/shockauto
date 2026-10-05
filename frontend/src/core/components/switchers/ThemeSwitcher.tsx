import { cn } from 'src/core/lib/utils'
import useThemeSwitcher from 'src/core/hooks/switchers/useThemeSwitcher.ts'
import type { ThemeSwitcherProps } from 'src/core/types/themeSwitcher.ts'
import { stars } from 'src/core/helpers/themeSwitcher.ts'

const moonCraters = ['top-1 left-3 size-1.5', 'top-3.5 left-1.5 size-1', 'bottom-1 left-3.5 size-1']

const ThemeSwitcher = ({ mini = false, className }: ThemeSwitcherProps) => {
  const { trackRef, isDark, label, toggleTheme } = useThemeSwitcher()

  return (
    <button
      ref={trackRef}
      type='button'
      role='switch'
      aria-checked={isDark}
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className={cn(
        'group relative isolate shrink-0 overflow-hidden rounded-full border border-white/25 outline-none',
        mini ? 'h-8 w-14' : 'h-9 w-17',
        'bg-linear-to-br from-sky-300 via-sky-400 to-blue-500 shadow-[inset_0_2px_6px_rgb(0_0_0/0.25)]',
        'focus-visible:ring-4 focus-visible:ring-ring/40',
        className
      )}
    >
      <span
        data-theme-night
        aria-hidden='true'
        className='absolute inset-0 -z-10 bg-linear-to-br from-indigo-950 via-slate-900 to-violet-950 opacity-0'
      >
        {stars.map((star, index) => (
          <span
            key={index}
            data-theme-star
            className={cn('absolute opacity-0', star.className)}
          >
            <span
              className='absolute inset-0 animate-glow-pulse rounded-full bg-white shadow-[0_0_4px_white]'
              style={{ animationDelay: `${index * 0.4}s` }}
            />
          </span>
        ))}
      </span>

      {/* Clouds */}
      <span data-theme-clouds aria-hidden='true' className='absolute right-1 bottom-0.5 -z-10 h-4 w-8'>
        <span className='absolute right-0 bottom-0 h-2.5 w-7 rounded-full bg-white/90' />
        <span className='absolute right-3 bottom-1 size-3 rounded-full bg-white/90' />
        <span className='absolute right-1 bottom-1.5 size-2.5 rounded-full bg-white/80' />
      </span>

      <span
        data-theme-thumb
        aria-hidden='true'
        className={cn('absolute top-0.75 left-0.75 rounded-full will-change-transform', mini ? 'size-6' : 'size-7')}
      >
        <span
          data-theme-sun
          className={cn(
            'absolute inset-0 rounded-full bg-linear-to-br from-amber-200 via-amber-300 to-orange-400',
            'shadow-[0_0_0_3px_rgb(253_230_138/0.35),0_0_14px_rgb(251_191_36/0.8)]'
          )}
        />
        <span
          data-theme-moon
          className='absolute inset-0 rounded-full bg-linear-to-br from-slate-100 to-slate-300 opacity-0 shadow-[0_0_12px_rgb(226_232_240/0.55)]'
        >
          {moonCraters.map((crater) => (
            <span key={crater} className={cn('absolute rounded-full bg-slate-400/60 shadow-[inset_0_1px_1px_rgb(0_0_0/0.2)]', crater)} />
          ))}
        </span>
      </span>

      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 rounded-full bg-white/0 transition-colors duration-200 group-hover:bg-white/10'
      />
    </button>
  )
}

export default ThemeSwitcher
