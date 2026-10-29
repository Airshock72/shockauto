import * as PrivateApi from 'src/api/privateRequest'
import type { GasolineTypesData } from 'src/api/lists/gasolineTypes/types.ts'
import { parseGasolineTypes } from 'src/api/lists/gasolineTypes/parsers.ts'

export const getGasolineTypes = async (): Promise<GasolineTypesData> => {
  const response = await PrivateApi.get('/List/GasolineTypes')
  return parseGasolineTypes(response)
}
