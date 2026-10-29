import type { GlobalResponse } from 'src/api/types/apiGlobalTypes.ts'
import { type GasolineTypeResponse, type GasolineTypesData, GasolineTypeKind } from 'src/api/lists/gasolineTypes/types.ts'
import { throwException } from 'src/core/helpers'

export const parseGasolineTypes = (response: GlobalResponse): GasolineTypesData => {
  if (!response.content) return { data: [], status: response.status }
  const content = response.content as Array<GasolineTypeResponse>
  try {
    return {
      data: content.map((gasolineType) => ({
        id: gasolineType.id,
        name: gasolineType.name ?? '',
        type: gasolineType.type ?? GasolineTypeKind.Common
      })),
      status: response.status
    }
  } catch (err) {
    throwException(err)
    return { data: [], status: response.status }
  }
}
