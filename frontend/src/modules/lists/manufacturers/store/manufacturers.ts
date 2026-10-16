import { type Dispatch, useReducer } from 'react'
import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import type { SelectOption } from 'src/core/types/select.ts'

export interface ManufacturersStore {
  readonly options: Array<SelectOption<ID>>
  readonly isLoading: boolean
}

export type SET_OPTIONS = 'SET_OPTIONS'
export type SET_LOADING = 'SET_LOADING'

export type ManufacturersActions =
  | { type: SET_OPTIONS, readonly payload: Array<SelectOption<ID>> }
  | { type: SET_LOADING, readonly payload: boolean }

const initialManufacturersStore: ManufacturersStore = {
  options: [],
  isLoading: true
}

export const useManufacturersReducer = (): [ManufacturersStore, Dispatch<ManufacturersActions>] => {
  return useReducer(manufacturersReducer, initialManufacturersStore)
}

export const manufacturersReducer = (
  state: ManufacturersStore,
  action: ManufacturersActions
): ManufacturersStore => {
  switch (action.type) {
  case 'SET_OPTIONS':
    return {
      ...state,
      options: action.payload
    }
  case 'SET_LOADING':
    return {
      ...state,
      isLoading: action.payload
    }
  default:
    return state
  }
}
