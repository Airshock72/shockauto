import { type FocusEvent, type KeyboardEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDatePickerReducer } from 'src/core/store/inputs/datePicker.ts'
import {
  clampMonth,
  formatDisplayDate,
  getMonthDays,
  getTodayIso,
  getYearRange,
  openKeys,
  parseIsoDate,
  shiftMonth,
  toIsoDate
} from 'src/core/helpers/datePicker.ts'

interface UseDatePickerParams {
  readonly value: string
  readonly min: string
  readonly max: string
  readonly onChange: (value: string) => void
}

const useDatePicker = ({ value, min, max, onChange }: UseDatePickerParams) => {
  const { t } = useTranslation()
  const [state, dispatch] = useDatePickerReducer()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const yearsRef = useRef<HTMLDivElement>(null)
  const { isOpen, view, viewYear, viewMonth } = state

  const months = t('datePicker.months', { returnObjects: true }) as Array<string>
  const monthsShort = t('datePicker.monthsShort', { returnObjects: true }) as Array<string>
  const weekdays = t('datePicker.weekdays', { returnObjects: true }) as Array<string>
  const today = getTodayIso()
  const minDate = parseIsoDate(min) ?? { year: 1900, month: 0, day: 1 }
  const maxDate = parseIsoDate(max) ?? parseIsoDate(today)!
  const viewIndex = viewYear * 12 + viewMonth

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) dispatch({ type: 'CLOSE' })
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen, dispatch])

  useEffect(() => {
    const list = yearsRef.current
    const active = list?.querySelector<HTMLElement>('[data-active]')
    if (list && active) list.scrollTop = active.offsetTop - list.clientHeight / 2 + active.clientHeight / 2
  }, [view])

  const open = () => {
    const anchor = parseIsoDate(value) ?? maxDate
    dispatch({ type: 'OPEN', payload: { year: anchor.year, month: anchor.month } })
  }

  const close = () => dispatch({ type: 'CLOSE' })

  const toggle = () => {
    if (isOpen) close()
    else open()
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isOpen || !openKeys.includes(event.key)) return
    event.preventDefault()
    open()
  }

  const handleContainerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape' || !isOpen) return
    event.preventDefault()
    close()
    inputRef.current?.focus()
  }

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) close()
  }

  const showMonth = (offset: number) => dispatch({ type: 'SET_VIEW_DATE', payload: shiftMonth(viewYear, viewMonth, offset) })

  const toggleYears = () => dispatch({ type: 'SET_VIEW', payload: view === 'years' ? 'days' : 'years' })

  const selectYear = (year: number) => {
    dispatch({ type: 'SET_VIEW_DATE', payload: { year, month: clampMonth(year, viewMonth, minDate, maxDate) } })
  }

  const selectDay = (day: number) => {
    onChange(toIsoDate({ year: viewYear, month: viewMonth, day }))
    close()
    inputRef.current?.focus()
  }

  const getDayState = (day: number) => {
    const iso = toIsoDate({ year: viewYear, month: viewMonth, day })
    return {
      isDisabled: iso < min || iso > max,
      isSelected: iso === value,
      isToday: iso === today
    }
  }

  return {
    containerRef,
    inputRef,
    yearsRef,
    isOpen,
    view,
    viewYear,
    monthLabel: months[viewMonth],
    displayValue: formatDisplayDate(value, monthsShort),
    weekdays,
    days: getMonthDays(viewYear, viewMonth),
    years: getYearRange(minDate.year, maxDate.year),
    canShowPrevious: viewIndex > minDate.year * 12 + minDate.month,
    canShowNext: viewIndex < maxDate.year * 12 + maxDate.month,
    toggle,
    handleInputKeyDown,
    handleContainerKeyDown,
    handleBlur,
    showMonth,
    toggleYears,
    selectYear,
    selectDay,
    getDayState
  }
}

export default useDatePicker
