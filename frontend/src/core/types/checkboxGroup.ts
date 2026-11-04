import type { ComponentProps, ComponentType } from 'react'

export type CheckboxIcon = ComponentType<ComponentProps<'svg'>>

export interface CheckboxOption<T extends string> {
  readonly label: string
  readonly value: T
  readonly icon?: CheckboxIcon
}

export interface CheckboxGroupProps<T extends string> {
  readonly name: string
  readonly label: string
  readonly values: ReadonlyArray<T>
  readonly options: ReadonlyArray<CheckboxOption<T>>
  readonly disabled?: boolean
  readonly className?: string
  readonly onValuesChange: (values: ReadonlyArray<T>) => void
}
