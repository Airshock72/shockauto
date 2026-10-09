import { type ChangeEventHandler, useId } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/core/lib/utils'
import { genderOptions } from 'src/modules/profile/helpers'
import useGenderSelect from 'src/modules/profile/hooks/useGenderSelect.ts'

interface GenderSelectProps {
  readonly name: string
  readonly label: string
  readonly value: string
  readonly error?: string
  readonly shake?: boolean
  readonly onChange: ChangeEventHandler<HTMLInputElement>
}

const GenderSelect = ({ name, label, value, error, shake = false, onChange }: GenderSelectProps) => {
  const { t } = useTranslation()
  const id = useId()
  const labelId = `${id}-label`
  const messageId = `${id}-message`
  const { containerRef, thumbRef } = useGenderSelect(value)

  return (
    <div className='relative flex flex-col gap-1.5 short:gap-1'>
      <span id={labelId} className='text-sm font-medium text-foreground short:text-xs'>{label}</span>

      <div
        ref={containerRef}
        role='radiogroup'
        aria-labelledby={labelId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? messageId : undefined}
        className={cn(
          'relative grid h-11 grid-cols-2 gap-1 rounded-lg border border-input bg-card p-1 shadow-soft short:h-10',
          'transition-[border-color,opacity] duration-200 ease-fluid hover:border-primary/40',
          'has-disabled:pointer-events-none has-disabled:opacity-60 has-disabled:shadow-none',
          error && 'border-destructive hover:border-destructive',
          shake && 'animate-shake'
        )}
      >
        <span
          ref={thumbRef}
          aria-hidden='true'
          className='absolute inset-y-1 left-0 rounded-md bg-primary opacity-0 shadow-glow will-change-transform'
        />

        {genderOptions.map(({ value: optionValue, label: optionLabel, icon: Icon }) => (
          <label
            key={optionValue}
            data-gender={optionValue}
            className={cn(
              'relative z-10 flex cursor-pointer items-center justify-center rounded-md text-sm text-muted-foreground select-none [&_svg]:size-4',
              'transition-colors duration-300 hover:text-foreground',
              'has-checked:text-primary-foreground has-checked:hover:text-primary-foreground',
              'has-focus-visible:ring-4 has-focus-visible:ring-primary/15'
            )}
          >
            <input
              type='radio'
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={onChange}
              className='sr-only'
            />
            <span data-gender-label className='inline-flex items-center gap-2'>
              <Icon aria-hidden='true' />
              {t(optionLabel)}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p
          id={messageId}
          title={error}
          className='animate-fade-in text-xs text-destructive md:absolute md:inset-x-0 md:top-full md:truncate md:text-2xs md:leading-4'
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default GenderSelect
