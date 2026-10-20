import type { GlobalResponse } from 'src/api/types/apiGlobalTypes.ts'
import type { ModelResponse, ModelsData, ModelsResponse } from 'src/api/lists/models/types.ts'
import { throwException } from 'src/core/helpers'

export const parseModels = (response: GlobalResponse): ModelsData => {
  if (!response.content) return { data: { topModels: [], models: [] }, status: response.status }
  const content = response.content as ModelsResponse
  try {
    const parseModel = (model: ModelResponse) => ({
      id: model.id,
      name: model.name ?? ''
    })

    return {
      data: {
        topModels: (content.topModels ?? []).map(parseModel),
        models: (content.models ?? []).map(parseModel)
      },
      status: response.status
    }
  } catch (err) {
    throwException(err)
    return { data: { topModels: [], models: [] }, status: response.status }
  }
}
