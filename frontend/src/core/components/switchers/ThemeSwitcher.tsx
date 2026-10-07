import { Moon, Sun } from 'lucide-react'
import { cn } from 'src/core/lib/utils'
import useThemeSwitcher from 'src/core/hooks/switchers/useThemeSwitcher.ts'
import type { ThemeSwitcherProps } from 'src/core/types/themeSwitcher.ts'

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
        'group relative isolate shrink-0 rounded-full border outline-none',
        'border-zinc-300 bg-linear-to-b from-zinc-100 to-zinc-300 shadow-[inset_0_1px_0_rgb(255_255_255/0.8),0_1px_2px_rgb(0_0_0/0.15)]',
        'dark:border-white/10 dark:from-zinc-700 dark:to-zinc-900 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_1px_2px_rgb(0_0_0/0.4)]',
        'focus-visible:ring-4 focus-visible:ring-ring/40',
        mini ? 'h-8 w-24' : 'h-9 w-28',
        className
      )}
    >
      {/* Shift gate */}
      <span
        aria-hidden='true'
        className={cn(
          'absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-zinc-400/60 shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)] dark:bg-black/60',
          mini ? 'inset-x-7' : 'inset-x-8'
        )}
      />

      <Sun
        data-theme-sun
        aria-hidden='true'
        className={cn('absolute top-1/2 -translate-y-1/2 text-zinc-400', mini ? 'left-1.5 size-3.5' : 'left-2 size-4')}
      />
      <Moon
        data-theme-moon
        aria-hidden='true'
        className={cn('absolute top-1/2 -translate-y-1/2 text-zinc-400', mini ? 'right-1.5 size-3.5' : 'right-2 size-4')}
      />

      {/* Gear knob with an engraved shift pattern */}
      <span
        data-theme-knob
        aria-hidden='true'
        className={cn(
          'absolute top-1/2 -translate-y-1/2 rounded-full will-change-transform',
          'bg-[radial-gradient(circle_at_35%_30%,#ffffff,#d4d4d8_45%,#71717a)]',
          'dark:bg-[radial-gradient(circle_at_35%_30%,#e4e4e7,#71717a_45%,#27272a)]',
          'transition-[filter] duration-200 group-hover:brightness-110',
          mini ? 'left-6 size-6' : 'left-7 size-7'
        )}
      >
        <svg viewBox='0 0 24 24' fill='none' className='size-full p-1 text-zinc-800/70 dark:text-zinc-100/70'>
          <path d='M6.5 7v10M12 7v10M17.5 7v10M6.5 12h11' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
        </svg>
      </span>
    </button>
  )
}

export default ThemeSwitcher
