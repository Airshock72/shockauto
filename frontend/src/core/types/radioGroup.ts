import type { KeyboardEvent, ReactNode, RefObject } from 'react'

export type RadioValue = string | number | boolean

export interface RadioOption<T extends RadioValue> {
  readonly label: string
  readonly value: T
  readonly swatch?: string
}

export interface RadioGroupProps<T extends RadioValue> {
  readonly name: string
  readonly label: string
  readonly value: T | null
  readonly options: ReadonlyArray<RadioOption<T>>
  readonly required?: boolean
  readonly disabled?: boolean
  readonly className?: string
  readonly optionClassName?: string
  readonly hideIndicator?: boolean
  readonly renderIndicator?: (option: RadioOption<T>, checked: boolean) => ReactNode
  readonly onValueChange: (value: T | null) => void
}

export interface RadioGroupHandle {
  readonly groupRef: RefObject<HTMLDivElement | null>
  readonly thumbRef: RefObject<HTMLSpanElement | null>
  readonly handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
}
