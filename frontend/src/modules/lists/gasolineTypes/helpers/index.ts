import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import { type GasolineTypeResponse, GasolineTypeKind } from 'src/api/lists/gasolineTypes/types.ts'
import type { SelectOption } from 'src/core/types/select.ts'

export const gasolineTypeKindOrder: Array<GasolineTypeKind> = [GasolineTypeKind.Common, GasolineTypeKind.Hybrid, GasolineTypeKind.Gas]

export const gasolineTypeKindGroups: Record<GasolineTypeKind, string | null> = {
  [GasolineTypeKind.Common]: null,
  [GasolineTypeKind.Hybrid]: 'gasolineTypes.hybrid',
  [GasolineTypeKind.Gas]: 'gasolineTypes.gas'
}

export const transformGasolineTypesToOptions = (gasolineTypes: Array<GasolineTypeResponse>): Array<SelectOption<ID>> =>
  gasolineTypeKindOrder.flatMap((kind) =>
    gasolineTypes
      .filter(({ type }) => type === kind)
      .map(({ id, nameKa }) => ({ label: nameKa, value: id, group: gasolineTypeKindGroups[kind] }))
  )
