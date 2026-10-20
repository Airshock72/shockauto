import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import type { SelectOption } from 'src/core/types/select.ts'

export interface Models {
  readonly topOptions: Array<SelectOption<ID>>
  readonly options: Array<SelectOption<ID>>
  readonly isLoading: boolean
}
