import type { GlobalResponse } from 'src/api/types/apiGlobalTypes.ts'
import type { ModelResponse, ModelsData } from 'src/api/lists/models/types.ts'
import { throwException } from 'src/core/helpers'

export const parseModels = (response: GlobalResponse): ModelsData => {
  if (!Array.isArray(response.content)) return { data: [], status: response.status }
  const models = response.content as Array<ModelResponse>
  try {
    return {
      data: models.map((model) => ({
        id: model.id,
        name: model.name ?? ''
      })),
      status: response.status
    }
  } catch (err) {
    throwException(err)
    return { data: [], status: response.status }
  }
}
