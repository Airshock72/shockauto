import { type Dispatch, useEffect } from 'react'
import { ModelsApi } from 'src/api'
import { type ID, ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { type ModelsActions, useModelsReducer } from 'src/modules/lists/models/store/models.ts'
import { transformModelsToOptions } from 'src/modules/lists/models/helpers'
import type { Models } from 'src/modules/lists/models/types'

const loadModels = async (manufacturerId: ID, dispatch: Dispatch<ModelsActions>, isActive: () => boolean = () => true) => {
  const response = await ModelsApi.getModels(manufacturerId)
  if (!isActive()) return

  const isSuccess = response.status === ResponseStatuses.SUCCESS
  dispatch({
    type: 'SET_MODELS',
    payload: {
      manufacturerId,
      topOptions: isSuccess ? transformModelsToOptions(response.data.topModels) : [],
      options: isSuccess ? transformModelsToOptions(response.data.models) : []
    }
  })
}

const useModels = (manufacturerId: ID | null): Models => {
  const [state, dispatch] = useModelsReducer()
  const isLoaded = state.manufacturerId === manufacturerId

  useEffect(() => {
    if (manufacturerId === null) return

    let isActive = true

    loadModels(manufacturerId, dispatch, () => isActive).then()
    return () => {
      isActive = false
    }
  }, [manufacturerId, dispatch])

  return {
    topOptions: isLoaded ? state.topOptions : [],
    options: isLoaded ? state.options : [],
    isLoading: manufacturerId !== null && !isLoaded
  }
}

export default useModels
