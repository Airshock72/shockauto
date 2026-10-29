import { Fragment } from 'react'
import { Check, ChevronDown, LoaderCircle, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/core/lib/utils'
import type { SelectOption } from 'src/core/types/select.ts'
import useSelect from 'src/core/hooks/inputs/select.ts'
import InputHint from 'src/core/components/inputs/InputHint.tsx'

interface SelectProps<T> {
  readonly name: string
  readonly value: T | null
  readonly options: Array<SelectOption<T>>
  readonly topOptions?: Array<SelectOption<T>>
  readonly id?: string
  readonly label?: string
  readonly placeholder?: string
  readonly hint?: string
  readonly error?: string
  readonly required?: boolean
  readonly disabled?: boolean
  readonly loading?: boolean
  readonly shake?: boolean
  readonly containerClassName?: string
  readonly onValueChange: (value: T | null) => void
}

const Select = <T, >({
  name,
  value,
  options,
  topOptions,
  id,
  label,
  placeholder,
  hint,
  error,
  required = false,
  disabled = false,
  loading = false,
  shake = false,
  containerClassName,
  onValueChange
}: SelectProps<T>) => {
  const { t } = useTranslation()
  const {
    containerRef,
    inputRef,
    listRef,
    inputId,
    listboxId,
    messageId,
    isOpen,
    highlightedIndex,
    selectedOption,
    filteredOptions,
    featuredOptions,
    regularOptions,
    inputValue,
    getOptionId,
    toggle,
    selectOption,
    clear,
    highlight,
    handleQueryChange,
    handleKeyDown
  } = useSelect({ id, value, options, topOptions, onChange: onValueChange })
  const isDisabled = disabled || loading
  const isClearable = Boolean(selectedOption) && !isDisabled
  const selectedIcon = isOpen ? null : selectedOption?.icon
  const hasFeaturedIcons = featuredOptions.some((option) => option.icon)
  const hasGroups = options.some((option) => option.group)

  return (
    <div ref={containerRef} className={cn('relative flex flex-col gap-1.5 short:gap-1', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className='text-sm font-medium text-foreground short:text-xs'>
          {label}
          {required && <span aria-hidden='true' className='ml-0.5 text-destructive'>*</span>}
        </label>
      )}

      <div className={cn('group relative', shake && 'animate-shake')}>
        <input type='hidden' name={name} value={value === null ? '' : String(value)} />

        {selectedIcon && (
          <img
            src={selectedIcon}
            alt=''
            aria-hidden='true'
            className='pointer-events-none absolute top-1/2 left-3 size-6 -translate-y-1/2 animate-fade-in rounded-md bg-white object-contain p-0.5'
          />
        )}

        <input
          ref={inputRef}
          id={inputId}
          type='text'
          role='combobox'
          autoComplete='off'
          disabled={isDisabled}
          aria-required={required || undefined}
          placeholder={isOpen ? selectedOption?.label ?? placeholder : placeholder}
          value={inputValue}
          aria-autocomplete='list'
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={isOpen && filteredOptions.length ? getOptionId(highlightedIndex) : undefined}
          aria-busy={loading || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? messageId : undefined}
          onClick={toggle}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          className={cn(
            'h-11 w-full cursor-pointer rounded-lg border border-input bg-card px-3.5 text-sm text-foreground shadow-soft outline-none short:h-10',
            'transition-[border-color,box-shadow,background-color] duration-200 ease-fluid',
            'placeholder:text-muted-foreground/70',
            'hover:border-primary/40',
            'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15',
            'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:shadow-none disabled:hover:border-input',
            'aria-invalid:border-destructive aria-invalid:hover:border-destructive aria-invalid:focus-visible:ring-destructive/15',
            isClearable && hint ? 'pr-26' : isClearable || hint ? 'pr-sidebar-collapsed' : 'pr-11',
            selectedIcon && 'pl-11',
            isOpen && 'cursor-text border-primary ring-4 ring-primary/15'
          )}
        />

        <div className='pointer-events-none absolute inset-y-0 right-1.5 flex items-center gap-0.5'>
          {hint && <InputHint text={hint} />}

          {isClearable && (
            <button
              type='button'
              onClick={clear}
              aria-label={t('common.clear')}
              aria-controls={inputId}
              className={cn(
                'pointer-events-auto flex size-8 animate-fade-in items-center justify-center rounded-md text-muted-foreground outline-none',
                'transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4.5'
              )}
            >
              <X />
            </button>
          )}

          <button
            type='button'
            tabIndex={-1}
            aria-hidden='true'
            disabled={isDisabled}
            onPointerDown={(event) => event.preventDefault()}
            onClick={toggle}
            className='pointer-events-auto flex size-8 cursor-pointer items-center justify-center text-muted-foreground'
          >
            {loading
              ? <LoaderCircle className='animate-spin' />
              : <ChevronDown className={cn('transition-transform duration-200 ease-fluid', isOpen && 'rotate-180 text-foreground')} />
            }
          </button>
        </div>

        {isOpen && (
          <ul
            ref={listRef}
            id={listboxId}
            role='listbox'
            aria-label={label}
            onPointerDown={(event) => event.preventDefault()}
            className='absolute top-full left-0 z-30 mt-2 max-h-72 w-full origin-top animate-scale-in overflow-y-auto rounded-xl border bg-popover/95 p-1.5 text-popover-foreground shadow-elevated backdrop-blur-xl'
          >
            {featuredOptions.length > 0 && (
              <li role='none' className={cn('px-1 py-1.5', hasFeaturedIcons ? 'grid grid-cols-5 justify-items-center gap-3' : 'flex flex-wrap gap-1.5')}>
                {hasFeaturedIcons
                  ? featuredOptions.map((option, index) => {
                    const isSelected = option.value === value
                    const isHighlighted = index === highlightedIndex

                    return (
                      <span
                        key={String(option.value)}
                        id={getOptionId(index)}
                        role='option'
                        title={option.label}
                        aria-label={option.label}
                        aria-selected={isSelected}
                        data-highlighted={isHighlighted || undefined}
                        onPointerMove={() => highlight(index)}
                        onClick={() => selectOption(option)}
                        className={cn(
                          'flex aspect-square w-full max-w-16 cursor-pointer items-center justify-center rounded-full bg-white ring-2 ring-transparent select-none',
                          'transition-shadow duration-150',
                          isHighlighted && 'ring-primary/40',
                          isSelected && 'ring-primary'
                        )}
                      >
                        {option.icon && (
                          <img
                            data-option-icon
                            src={option.icon}
                            alt=''
                            aria-hidden='true'
                            loading='lazy'
                            className='size-full rounded-full object-contain p-1.5 will-change-transform'
                          />
                        )}
                      </span>
                    )
                  })
                  : featuredOptions.map((option, index) => {
                    const isSelected = option.value === value
                    const isHighlighted = index === highlightedIndex

                    return (
                      <span
                        key={String(option.value)}
                        id={getOptionId(index)}
                        role='option'
                        title={option.label}
                        aria-selected={isSelected}
                        data-highlighted={isHighlighted || undefined}
                        onPointerMove={() => highlight(index)}
                        onClick={() => selectOption(option)}
                        className={cn(
                          'flex max-w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg border bg-card px-3 py-2 shadow-soft select-none',
                          'transition-[border-color,background-color,box-shadow] duration-150',
                          isHighlighted && 'border-primary/40 bg-accent',
                          isSelected && 'border-primary bg-primary/5 ring-2 ring-primary/15'
                        )}
                      >
                        <span aria-hidden='true' className='relative flex size-1.5 shrink-0'>
                          <span className='absolute inset-0 rounded-full bg-primary opacity-75 motion-safe:animate-ping' />
                          <span className='relative size-full rounded-full bg-primary shadow-[0_0_6px_var(--color-primary)]' />
                        </span>
                        <span className={cn('truncate text-xs font-semibold', isSelected && 'text-primary')}>{option.label}</span>
                      </span>
                    )
                  })
                }
              </li>
            )}

            {featuredOptions.length > 0 && regularOptions.length > 0 && (
              <li role='separator' className='-mx-1.5 my-1.5 h-px bg-border' />
            )}

            {filteredOptions.length
              ? regularOptions.map((option, regularIndex) => {
                const index = featuredOptions.length + regularIndex
                const isSelected = option.value === value
                const isHighlighted = index === highlightedIndex
                const isGroupStart = Boolean(option.group) && option.group !== regularOptions[regularIndex - 1]?.group

                return (
                  <Fragment key={String(option.value)}>
                    {isGroupStart && (
                      <li role='presentation' className='flex items-center gap-2 px-2.5 pt-3 pb-1.5 text-xs font-semibold text-primary select-none'>
                        {option.group}
                        <span aria-hidden='true' className='h-px flex-1 bg-linear-to-r from-primary/30 to-transparent' />
                      </li>
                    )}
                    <li
                      id={getOptionId(index)}
                      role='option'
                      aria-selected={isSelected}
                      data-highlighted={isHighlighted || undefined}
                      onPointerMove={() => highlight(index)}
                      onClick={() => selectOption(option)}
                      className={cn(
                        'flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 select-none',
                        'transition-colors duration-150',
                        hasGroups ? 'py-2 text-sm font-medium' : 'py-1.5 text-base font-semibold',
                        option.group && 'pl-6',
                        isHighlighted && 'bg-accent text-accent-foreground',
                        isSelected && 'font-bold text-primary'
                      )}
                    >
                      <span className='flex min-w-0 items-center gap-3'>
                        {option.icon && (
                          <img
                            data-option-icon
                            src={option.icon}
                            alt=''
                            aria-hidden='true'
                            loading='lazy'
                            className='size-14 shrink-0 rounded-xl bg-white object-contain p-1.5 will-change-transform'
                          />
                        )}
                        <span className='truncate'>{option.label}</span>
                      </span>
                      {isSelected && <Check aria-hidden='true' className='size-4 shrink-0' />}
                    </li>
                  </Fragment>
                )
              })
              : <li role='presentation' className='px-3 py-6 text-center text-xs text-muted-foreground'>
                {t('select.noOptions')}
              </li>
            }
          </ul>
        )}
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

export default Select
