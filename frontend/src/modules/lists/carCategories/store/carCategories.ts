import { type Dispatch, useReducer } from 'react'
import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import type { SelectOption } from 'src/core/types/select.ts'

export interface CarCategoriesStore {
  readonly options: Array<SelectOption<ID>>
  readonly isLoading: boolean
}

export type SET_OPTIONS = 'SET_OPTIONS'
export type SET_LOADING = 'SET_LOADING'

export type CarCategoriesActions =
  | { type: SET_OPTIONS, readonly payload: Array<SelectOption<ID>> }
  | { type: SET_LOADING, readonly payload: boolean }

const initialCarCategoriesStore: CarCategoriesStore = {
  options: [],
  isLoading: true
}

export const useCarCategoriesReducer = (): [CarCategoriesStore, Dispatch<CarCategoriesActions>] => {
  return useReducer(carCategoriesReducer, initialCarCategoriesStore)
}

export const carCategoriesReducer = (
  state: CarCategoriesStore,
  action: CarCategoriesActions
): CarCategoriesStore => {
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
