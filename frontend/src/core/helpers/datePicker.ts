export interface CalendarDate {
  readonly year: number
  readonly month: number
  readonly day: number
}

const pad = (value: number) => String(value).padStart(2, '0')

export const toIsoDate = ({ year, month, day }: CalendarDate): string => `${year}-${pad(month + 1)}-${pad(day)}`

export const parseIsoDate = (value: string): CalendarDate | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  return { year: Number(match[1]), month: Number(match[2]) - 1, day: Number(match[3]) }
}

export const getTodayIso = (): string => {
  const today = new Date()
  return toIsoDate({ year: today.getFullYear(), month: today.getMonth(), day: today.getDate() })
}

export const getYearsAgoIso = (years: number): string => {
  const today = new Date()
  const date = new Date(today.getFullYear() - years, today.getMonth(), today.getDate())
  return toIsoDate({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate() })
}

export const shiftMonth =(year: number, month: number, offset: number) => {
  const date = new Date(year, month + offset, 1)
  return { year: date.getFullYear(), month: date.getMonth() }
}

export const openKeys = ['Enter', ' ', 'ArrowDown']

export const clampMonth = (year: number, month: number, min: CalendarDate, max: CalendarDate): number => {
  if (year === max.year) return Math.min(month, max.month)
  if (year === min.year) return Math.max(month, min.month)
  return month
}

export const getMonthDays = (year: number, month: number): Array<number | null> => {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7
  const total = new Date(year, month + 1, 0).getDate()
  return [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: total }, (_, index) => index + 1)
  ]
}

export const formatDisplayDate = (value: string, monthsShort: Array<string>): string => {
  const date = parseIsoDate(value)
  if (!date) return ''
  return `${monthsShort[date.month]} ${date.day}, ${date.year}`
}

export const getYearRange = (min: number, max: number): Array<number> =>
  Array.from({ length: max - min + 1 }, (_, index) => max - index)
