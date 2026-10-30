import { cn } from 'src/core/lib/utils'
import type { SwitchProps } from 'src/core/types/switch.ts'

const Switch = ({ checked, label, name, disabled = false, className, onCheckedChange }: SwitchProps) => (
  <button
    type='button'
    role='switch'
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      'group flex h-11 items-center justify-between gap-3 rounded-lg border bg-card px-3.5 text-sm font-medium shadow-soft outline-none short:h-10',
      'transition-[border-color,box-shadow,background-color] duration-300 ease-fluid',
      'hover:border-primary/40 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15',
      'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:shadow-none',
      checked ? 'border-primary/50 bg-primary/5' : 'border-input',
      className
    )}
  >
    {name && <input type='hidden' name={name} value={String(checked)} />}

    <span className={cn('transition-colors duration-300', checked ? 'text-primary' : 'text-foreground')}>
      {label}
    </span>

    <span
      aria-hidden='true'
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5',
        'transition-[background-color,box-shadow] duration-300 ease-fluid',
        checked ? 'bg-primary shadow-glow' : 'bg-muted-foreground/25 group-hover:bg-muted-foreground/35'
      )}
    >
      {checked && <span className='absolute inset-0 animate-ring-burst rounded-full' />}
      <span
        className={cn(
          'relative flex size-5 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.25)]',
          'transition-[translate,width] duration-400 ease-spring group-active:w-6',
          checked ? 'translate-x-5 group-active:translate-x-4' : 'translate-x-0'
        )}
      >
        <span
          className={cn(
            'size-1.5 rounded-full transition-[background-color,scale] duration-300 ease-spring',
            checked ? 'scale-100 bg-primary' : 'scale-0 bg-muted-foreground'
          )}
        />
      </span>
    </span>
  </button>
)

export default Switch
