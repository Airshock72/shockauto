import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import type { GasolineTypeResponse } from 'src/api/lists/gasolineTypes/types.ts'
import type { SelectOption } from 'src/core/types/select.ts'

export const transformGasolineTypesToOptions = (gasolineTypes: Array<GasolineTypeResponse>): Array<SelectOption<ID>> =>
  gasolineTypes.map(({ id, name }) => ({ label: name, value: id }))
