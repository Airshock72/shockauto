import { useId } from 'react'
import { Check } from 'lucide-react'
import { cn } from 'src/core/lib/utils'
import type { CheckboxGroupProps } from 'src/core/types/checkboxGroup.ts'

const CheckboxGroup = <T extends string>({
  name,
  label,
  values,
  options,
  disabled = false,
  className,
  onValuesChange
}: CheckboxGroupProps<T>) => {
  const labelId = useId()

  const handleToggle = (value: T) => {
    onValuesChange(values.includes(value) ? values.filter((item) => item !== value) : [...values, value])
  }

  return (
    <div className={cn('flex flex-col gap-2 short:gap-1.5', className)}>
      <span id={labelId} className='text-sm font-medium text-foreground short:text-xs'>
        {label}
      </span>

      {values.map((value) => <input key={value} type='hidden' name={name} value={value} />)}

      <div role='group' aria-labelledby={labelId} className='grid grid-cols-1 gap-2 xs:grid-cols-2 lg:grid-cols-3'>
        {options.map(({ label: optionLabel, value, icon: Icon }) => {
          const checked = values.includes(value)

          return (
            <button
              key={value}
              type='button'
              role='checkbox'
              aria-checked={checked}
              disabled={disabled}
              onClick={() => handleToggle(value)}
              className={cn(
                'group/checkbox relative flex h-12 min-w-0 items-center gap-3 rounded-xl border px-3 text-left text-sm font-medium outline-none select-none short:h-11',
                'transition-[border-color,background-color,color,box-shadow] duration-300 ease-fluid',
                'focus-visible:ring-4 focus-visible:ring-primary/20',
                'disabled:cursor-not-allowed disabled:opacity-60',
                checked
                  ? 'border-primary/60 bg-primary/8 text-primary shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_12%,transparent)]'
                  : 'border-input bg-card/70 text-foreground/80 shadow-soft hover:border-primary/40 hover:bg-card hover:text-foreground'
              )}
            >
              {Icon && (
                <span
                  aria-hidden='true'
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-lg transition-[background-color,color,scale] duration-300 ease-spring [&_svg]:size-4.5',
                    'group-active/checkbox:scale-90',
                    checked ? 'bg-primary text-primary-foreground shadow-glow' : 'bg-muted text-muted-foreground group-hover/checkbox:text-primary'
                  )}
                >
                  <Icon />
                </span>
              )}

              <span className='min-w-0 flex-1 truncate' title={optionLabel}>{optionLabel}</span>

              <span
                aria-hidden='true'
                className={cn(
                  'relative flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-[background-color,border-color] duration-300 ease-fluid',
                  checked ? 'border-primary bg-primary' : 'border-muted-foreground/40 bg-card group-hover/checkbox:border-primary/60'
                )}
              >
                {checked && <span className='absolute inset-0 animate-ring-burst rounded-md' />}
                <Check
                  strokeWidth={3.5}
                  className={cn(
                    'size-3 text-primary-foreground transition-[scale,opacity] duration-300 ease-spring',
                    checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  )}
                />
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CheckboxGroup
