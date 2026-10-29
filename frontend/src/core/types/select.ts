import type { LabelInValue } from 'src/api/types/apiGlobalTypes.ts'

export interface SelectOption<T = string> extends LabelInValue<T> {
  readonly icon?: string | null
  readonly group?: string | null
}
