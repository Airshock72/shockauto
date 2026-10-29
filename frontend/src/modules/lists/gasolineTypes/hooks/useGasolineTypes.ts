import { useEffect } from 'react'
import { GasolineTypesApi } from 'src/api'
import { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { useGasolineTypesReducer } from 'src/modules/lists/gasolineTypes/store/gasolineTypes.ts'
import { transformGasolineTypesToOptions } from 'src/modules/lists/gasolineTypes/helpers'
import type { GasolineTypes } from 'src/modules/lists/gasolineTypes/types'

const useGasolineTypes = (): GasolineTypes => {
  const [state, dispatch] = useGasolineTypesReducer()
  const { options, isLoading } = state

  useEffect(() => {
    let isActive = true

    const loadGasolineTypes = async () => {
      const response = await GasolineTypesApi.getGasolineTypes()
      if (!isActive) return

      if (response.status === ResponseStatuses.SUCCESS) {
        dispatch({ type: 'SET_OPTIONS', payload: transformGasolineTypesToOptions(response.data) })
      }
      dispatch({ type: 'SET_LOADING', payload: false })
    }

    loadGasolineTypes().then()
    return () => {
      isActive = false
    }
  }, [dispatch])

  return {
    options,
    isLoading
  }
}

export default useGasolineTypes
