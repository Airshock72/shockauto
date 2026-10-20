import { type Dispatch, useReducer } from 'react'
import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import type { SelectOption } from 'src/core/types/select.ts'

export interface ModelsStore {
  readonly manufacturerId: ID | null
  readonly topOptions: Array<SelectOption<ID>>
  readonly options: Array<SelectOption<ID>>
}

export type SET_MODELS = 'SET_MODELS'

export type ModelsActions =
  | { type: SET_MODELS, readonly payload: ModelsStore }

const initialModelsStore: ModelsStore = {
  manufacturerId: null,
  topOptions: [],
  options: []
}

export const useModelsReducer = (): [ModelsStore, Dispatch<ModelsActions>] => {
  return useReducer(modelsReducer, initialModelsStore)
}

export const modelsReducer = (
  state: ModelsStore,
  action: ModelsActions
): ModelsStore => {
  switch (action.type) {
  case 'SET_MODELS':
    return action.payload
  default:
    return state
  }
}
