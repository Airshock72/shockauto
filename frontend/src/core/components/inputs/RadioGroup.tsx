import { type CSSProperties, useId } from 'react'
import { cn } from 'src/core/lib/utils'
import useRadioGroup from 'src/core/hooks/inputs/radioGroup.ts'
import { defaultRadioAccent, getSwatchBackground } from 'src/core/helpers/radioGroup.ts'
import type { RadioGroupProps, RadioOption, RadioValue } from 'src/core/types/radioGroup.ts'

interface IndicatorProps {
  readonly swatch?: string
  readonly checked: boolean
}

const DefaultIndicator = ({ swatch, checked }: IndicatorProps) => {
  if (swatch) {
    return (
      <span
        className='block size-4 rounded-full transition-shadow duration-300 ease-fluid'
        style={{
          background: getSwatchBackground(swatch),
          boxShadow: checked
            ? `inset 0 0 0 1px rgb(0 0 0 / 0.18), 0 0 0 2px var(--card), 0 0 0 4px ${swatch}`
            : 'inset 0 0 0 1px rgb(0 0 0 / 0.18)'
        }}
      />
    )
  }

  return (
    <span
      className={cn(
        'grid size-4 place-items-center rounded-full border-2 bg-card transition-colors duration-300 ease-fluid',
        checked ? 'border-primary' : 'border-muted-foreground/40 group-hover/radio:border-primary/60'
      )}
    >
      <span className={cn('size-2 rounded-full bg-primary transition-[scale] duration-300 ease-spring', checked ? 'scale-100' : 'scale-0')} />
    </span>
  )
}

const RadioGroup = <T extends RadioValue>({
  name,
  label,
  value,
  options,
  required = false,
  disabled = false,
  className,
  optionClassName,
  hideIndicator = false,
  renderIndicator,
  onValueChange
}: RadioGroupProps<T>) => {
  const labelId = useId()
  const { groupRef, thumbRef, handleKeyDown } = useRadioGroup({ value, options, disabled, onValueChange })
  const checkedIndex = options.findIndex((option) => option.value === value)
  const focusableIndex = Math.max(checkedIndex, 0)

  const handleSelect = (option: RadioOption<T>) => {
    if (option.value !== value) onValueChange(option.value)
    else if (!required) onValueChange(null)
  }

  return (
    <div className={cn('flex flex-col gap-2 short:gap-1.5', className)}>
      <span id={labelId} className='text-sm font-medium text-foreground short:text-xs'>
        {label}
        {required && <span aria-hidden='true' className='ml-0.5 text-destructive'>*</span>}
      </span>

      <input type='hidden' name={name} value={value === null ? '' : String(value)} />

      <div
        ref={groupRef}
        role='radiogroup'
        aria-labelledby={labelId}
        aria-required={required}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        className='relative flex flex-wrap gap-2'
      >
        <span
          ref={thumbRef}
          aria-hidden='true'
          className={cn(
            'pointer-events-none absolute top-0 left-0 z-0 rounded-xl border opacity-0 will-change-transform',
            'border-[color-mix(in_oklch,var(--thumb)_70%,transparent)] bg-[color-mix(in_oklch,var(--thumb)_13%,var(--card))]',
            'shadow-[0_0_0_3px_color-mix(in_oklch,var(--thumb)_14%,transparent),0_8px_20px_-10px_color-mix(in_oklch,var(--thumb)_70%,transparent)]'
          )}
          style={{ '--thumb': defaultRadioAccent } as CSSProperties}
        />

        {options.map((option, index) => {
          const checked = index === checkedIndex
          const accent = option.swatch ?? defaultRadioAccent

          return (
            <button
              key={String(option.value)}
              type='button'
              role='radio'
              aria-checked={checked}
              tabIndex={index === focusableIndex ? 0 : -1}
              disabled={disabled}
              data-accent={option.swatch}
              onClick={() => handleSelect(option)}
              className={cn(
                'group/radio relative z-10 inline-flex h-10 min-w-11 items-center justify-center gap-2.5 rounded-xl border px-3.5',
                'text-sm font-medium whitespace-nowrap outline-none select-none will-change-transform short:h-9',
                'transition-[border-color,background-color,color,box-shadow] duration-300 ease-fluid',
                'focus-visible:ring-4 focus-visible:ring-primary/20',
                'disabled:cursor-not-allowed disabled:opacity-60',
                checked
                  ? cn('border-transparent bg-transparent', option.swatch ? 'text-foreground' : 'text-primary')
                  : 'border-input bg-card/70 text-foreground/80 shadow-soft hover:border-primary/40 hover:bg-card hover:text-foreground',
                optionClassName
              )}
            >
              {!hideIndicator && (
                <span data-radio-indicator aria-hidden='true' className='relative flex shrink-0 items-center justify-center rounded-full'>
                  <span data-radio-pulse className='pointer-events-none absolute inset-0 rounded-full opacity-0' style={{ backgroundColor: accent }} />
                  {renderIndicator ? renderIndicator(option, checked) : <DefaultIndicator swatch={option.swatch} checked={checked} />}
                </span>
              )}
              <span data-radio-label className='truncate'>{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default RadioGroup
