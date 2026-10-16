import { type Dispatch, useEffect } from 'react'
import { ManufacturersApi } from 'src/api'
import { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { type ManufacturersActions, useManufacturersReducer } from 'src/modules/lists/manufacturers/store/manufacturers.ts'
import { transformManufacturersToOptions } from 'src/modules/lists/manufacturers/helpers'
import type { Manufacturers } from 'src/modules/lists/manufacturers/types'

const loadManufacturers = async (dispatch: Dispatch<ManufacturersActions>, isActive: () => boolean = () => true) => {
  const response = await ManufacturersApi.getManufacturers()
  if (!isActive()) return

  if (response.status === ResponseStatuses.SUCCESS) {
    dispatch({ type: 'SET_OPTIONS', payload: transformManufacturersToOptions(response.data) })
  }
  dispatch({ type: 'SET_LOADING', payload: false })
}

const useManufacturers = (): Manufacturers => {
  const [state, dispatch] = useManufacturersReducer()
  const { options, isLoading } = state

  useEffect(() => {
    let isActive = true

    loadManufacturers(dispatch, () => isActive).then()
    return () => {
      isActive = false
    }
  }, [dispatch])

  return {
    options,
    isLoading
  }
}

export default useManufacturers
