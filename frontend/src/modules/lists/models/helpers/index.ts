import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import type { ModelResponse } from 'src/api/lists/models/types.ts'
import type { SelectOption } from 'src/core/types/select.ts'

export const transformModelsToOptions = (models: Array<ModelResponse>): Array<SelectOption<ID>> =>
  models.map(({ id, name }) => ({ label: name, value: id }))
