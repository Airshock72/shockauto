import { type Dispatch, useReducer } from 'react'

export interface DropdownStore {
  readonly isOpen: boolean
}

export type SET_OPEN = 'SET_OPEN'

export type DropdownActions =
  | { type: SET_OPEN, readonly payload: boolean }

const initialDropdownStore: DropdownStore = {
  isOpen: false
}

export const useDropdownReducer = (): [DropdownStore, Dispatch<DropdownActions>] => {
  return useReducer(dropdownReducer, initialDropdownStore)
}

export const dropdownReducer = (
  state: DropdownStore,
  action: DropdownActions
): DropdownStore => {
  switch (action.type) {
  case 'SET_OPEN':
    return {
      ...state,
      isOpen: action.payload
    }
  default:
    return state
  }
}
