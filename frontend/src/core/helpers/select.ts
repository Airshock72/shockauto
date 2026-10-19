import type { SelectOption } from 'src/core/types/select.ts'

export const filterOptions = <T>(options: Array<SelectOption<T>>, query: string): Array<SelectOption<T>> => {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery) return options
  return options.filter(({ label }) => label.toLocaleLowerCase().includes(normalizedQuery))
}

export const getNextIndex = (current: number, offset: number, length: number): number => {
  if (length === 0) return 0
  return (current + offset + length) % length
}

export const getFeaturedOptions = <T>(options: Array<SelectOption<T>>, featuredValues: Array<T>): Array<SelectOption<T>> =>
  featuredValues.flatMap((value) => options.filter((option) => option.value === value))

export const getRegularOptions = <T>(options: Array<SelectOption<T>>, featuredValues: Array<T>): Array<SelectOption<T>> =>
  options.filter((option) => !featuredValues.includes(option.value))
