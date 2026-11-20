import { type Dispatch, useReducer } from 'react'

export interface DockedCardsStore {
  readonly isDocked: boolean
}

export type SET_DOCKED = 'SET_DOCKED'

export type DockedCardsActions =
  | { type: SET_DOCKED, readonly payload: boolean }

const initialDockedCardsStore: DockedCardsStore = {
  isDocked: false
}

export const useDockedCardsReducer = (): [DockedCardsStore, Dispatch<DockedCardsActions>] => {
  return useReducer(dockedCardsReducer, initialDockedCardsStore)
}

export const dockedCardsReducer = (
  state: DockedCardsStore,
  action: DockedCardsActions
): DockedCardsStore => {
  switch (action.type) {
  case 'SET_DOCKED':
    return {
      ...state,
      isDocked: action.payload
    }
  default:
    return state
  }
}
