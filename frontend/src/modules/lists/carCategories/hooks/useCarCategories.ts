import { useEffect } from 'react'
import { CarCategoriesApi } from 'src/api'
import { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { useCarCategoriesReducer } from 'src/modules/lists/carCategories/store/carCategories.ts'
import { transformCarCategoriesToOptions } from 'src/modules/lists/carCategories/helpers'
import type { CarCategories } from 'src/modules/lists/carCategories/types'

const useCarCategories = (): CarCategories => {
  const [state, dispatch] = useCarCategoriesReducer()
  const { options, isLoading } = state

  useEffect(() => {
    let isActive = true

    const loadCarCategories = async () => {
      const response = await CarCategoriesApi.getCarCategories()
      if (!isActive) return

      if (response.status === ResponseStatuses.SUCCESS) {
        dispatch({ type: 'SET_OPTIONS', payload: transformCarCategoriesToOptions(response.data) })
      }
      dispatch({ type: 'SET_LOADING', payload: false })
    }

    loadCarCategories().then()
    return () => {
      isActive = false
    }
  }, [dispatch])

  return {
    options,
    isLoading
  }
}

export default useCarCategories
