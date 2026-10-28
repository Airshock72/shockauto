import * as PrivateApi from 'src/api/privateRequest'
import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import type { ModelsData } from 'src/api/lists/models/types.ts'
import { parseModels } from 'src/api/lists/models/parsers.ts'

export const getModels = async (manufacturerId: ID): Promise<ModelsData> => {
  const response = await PrivateApi.get(`/List/Models/${manufacturerId}`)
  return parseModels(response)
}
