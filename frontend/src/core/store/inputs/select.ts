import { type Dispatch, useReducer } from 'react'

export interface SelectStore {
  readonly isOpen: boolean
  readonly query: string
  readonly highlightedIndex: number
}

export type OPEN = 'OPEN'
export type CLOSE = 'CLOSE'
export type SET_QUERY = 'SET_QUERY'
export type SET_HIGHLIGHTED_INDEX = 'SET_HIGHLIGHTED_INDEX'

export type SelectActions =
  | { type: OPEN, readonly payload: number }
  | { type: CLOSE }
  | { type: SET_QUERY, readonly payload: string }
  | { type: SET_HIGHLIGHTED_INDEX, readonly payload: number }

const initialSelectStore: SelectStore = {
  isOpen: false,
  query: '',
  highlightedIndex: 0
}

export const useSelectReducer = (): [SelectStore, Dispatch<SelectActions>] => {
  return useReducer(selectReducer, initialSelectStore)
}

export const selectReducer = (
  state: SelectStore,
  action: SelectActions
): SelectStore => {
  switch (action.type) {
  case 'OPEN':
    return {
      ...state,
      isOpen: true,
      query: '',
      highlightedIndex: action.payload
    }
  case 'CLOSE':
    return {
      ...state,
      isOpen: false,
      query: ''
    }
  case 'SET_QUERY':
    return {
      ...state,
      isOpen: true,
      query: action.payload,
      highlightedIndex: 0
    }
  case 'SET_HIGHLIGHTED_INDEX':
    return {
      ...state,
      highlightedIndex: action.payload
    }
  default:
    return state
  }
}
