import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from 'src/core/lib/utils'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import useDatePicker from 'src/core/hooks/inputs/datePicker.ts'

interface DatePickerProps {
  readonly name: string
  readonly value: string
  readonly min: string
  readonly max: string
  readonly label?: string
  readonly placeholder?: string
  readonly error?: string
  readonly shake?: boolean
  readonly onValueChange: (value: string) => void
}

const navButtonClassName = cn(
  'flex size-8 items-center justify-center rounded-lg text-muted-foreground outline-none [&_svg]:size-4.5',
  'transition-[background-color,color,scale] duration-200 ease-fluid hover:bg-accent hover:text-foreground',
  'focus-visible:ring-2 focus-visible:ring-ring active:scale-90 disabled:pointer-events-none disabled:opacity-30'
)

const cellClassName = cn(
  'flex items-center justify-center rounded-lg text-sm outline-none',
  'transition-[background-color,color,box-shadow,scale] duration-200 ease-fluid',
  'hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-90',
  'disabled:pointer-events-none disabled:opacity-30'
)

const headerButtonClassName = cn(
  'inline-flex items-center gap-1 rounded-lg px-2 py-1 font-display text-sm font-semibold outline-none',
  'transition-colors duration-200 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring'
)

const chevronClassName = 'size-4 text-muted-foreground transition-transform duration-200 ease-fluid'

const activeCellClassName = 'bg-primary font-semibold text-primary-foreground shadow-glow hover:bg-primary/90 hover:text-primary-foreground'

const DatePicker = ({ name, value, min, max, label, placeholder, error, shake, onValueChange }: DatePickerProps) => {
  const { t } = useTranslation()
  const popoverId = useId()
  const {
    containerRef,
    inputRef,
    yearsRef,
    isOpen,
    view,
    viewYear,
    viewMonth,
    monthLabel,
    monthsShort,
    displayValue,
    weekdays,
    days,
    years,
    canShowPrevious,
    canShowNext,
    toggle,
    handleInputKeyDown,
    handleContainerKeyDown,
    handleBlur,
    showMonth,
    toggleView,
    selectMonth,
    isMonthDisabled,
    selectYear,
    selectDay,
    clear,
    getDayState
  } = useDatePicker({ value, min, max, onChange: onValueChange })

  return (
    <div ref={containerRef} className='relative' onKeyDown={handleContainerKeyDown} onBlur={handleBlur}>
      <TextInput
        ref={inputRef}
        readOnly
        name={name}
        label={label}
        placeholder={placeholder}
        value={displayValue}
        leftIcon={<CalendarDays />}
        error={error}
        shake={shake}
        role='combobox'
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        aria-controls={popoverId}
        onClick={toggle}
        onKeyDown={handleInputKeyDown}
        onClear={clear}
        className={cn('cursor-pointer caret-transparent', isOpen && 'border-primary ring-4 ring-primary/15')}
      />

      {isOpen && (
        <div
          id={popoverId}
          role='dialog'
          aria-label={label}
          className='absolute top-full left-0 z-30 mt-2 w-full min-w-72 origin-top animate-scale-in rounded-xl border bg-popover/95 p-3 text-popover-foreground shadow-elevated backdrop-blur-xl sm:w-80'
        >
          <div className='mb-2 flex items-center justify-between gap-2'>
            <div className='flex items-center gap-0.5'>
              <button
                type='button'
                onClick={() => toggleView('months')}
                aria-expanded={view === 'months'}
                aria-label={t('datePicker.chooseMonth')}
                className={cn(headerButtonClassName, view === 'months' && 'bg-accent')}
              >
                {monthLabel}
                <ChevronDown aria-hidden='true' className={cn(chevronClassName, view === 'months' && 'rotate-180')} />
              </button>
              <button
                type='button'
                onClick={() => toggleView('years')}
                aria-expanded={view === 'years'}
                aria-label={t('datePicker.chooseYear')}
                className={cn(headerButtonClassName, view === 'years' && 'bg-accent')}
              >
                <span className='text-gradient'>{viewYear}</span>
                <ChevronDown aria-hidden='true' className={cn(chevronClassName, view === 'years' && 'rotate-180')} />
              </button>
            </div>

            {view === 'days' && (
              <div className='flex gap-1'>
                <button
                  type='button'
                  disabled={!canShowPrevious}
                  onClick={() => showMonth(-1)}
                  aria-label={t('datePicker.previousMonth')}
                  className={navButtonClassName}
                >
                  <ChevronLeft aria-hidden='true' />
                </button>
                <button
                  type='button'
                  disabled={!canShowNext}
                  onClick={() => showMonth(1)}
                  aria-label={t('datePicker.nextMonth')}
                  className={navButtonClassName}
                >
                  <ChevronRight aria-hidden='true' />
                </button>
              </div>
            )}
          </div>

          <div aria-hidden='true' className='mb-2 h-px bg-linear-to-r from-transparent via-neon/40 to-transparent' />

          {view === 'days'
            ? <div key={`${viewYear}-${monthLabel}`} className='grid animate-fade-in grid-cols-7 gap-1'>
              {weekdays.map((weekday) => (
                <span key={weekday} className='flex h-8 items-center justify-center text-2xs font-medium text-muted-foreground'>
                  {weekday}
                </span>
              ))}

              {days.map((day, index) => {
                if (day === null) return <span key={`empty-${index}`} />

                const { isDisabled, isSelected, isToday } = getDayState(day)

                return (
                  <button
                    key={day}
                    type='button'
                    disabled={isDisabled}
                    onClick={() => selectDay(day)}
                    aria-pressed={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    className={cn(
                      cellClassName,
                      'aspect-square',
                      isToday && 'font-semibold text-primary ring-1 ring-primary/40',
                      isSelected && activeCellClassName
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
            : view === 'months'
              ? <div className='grid animate-fade-in grid-cols-3 gap-1.5'>
                {monthsShort.map((month, index) => (
                  <button
                    key={month}
                    type='button'
                    disabled={isMonthDisabled(index)}
                    onClick={() => selectMonth(index)}
                    aria-pressed={index === viewMonth}
                    className={cn(cellClassName, 'h-12', index === viewMonth && activeCellClassName)}
                  >
                    {month}
                  </button>
                ))}
              </div>
              : <div ref={yearsRef} className='relative grid max-h-64 animate-fade-in grid-cols-4 gap-1 overflow-y-auto pr-1'>
                {years.map((year) => (
                  <button
                    key={year}
                    type='button'
                    data-active={year === viewYear || undefined}
                    onClick={() => selectYear(year)}
                    aria-pressed={year === viewYear}
                    className={cn(cellClassName, 'h-9', year === viewYear && activeCellClassName)}
                  >
                    {year}
                  </button>
                ))}
              </div>
          }
        </div>
      )}
    </div>
  )
}

export default DatePicker
