import { type Dispatch, useReducer } from 'react'

export interface MobileMenuStore {
  readonly isOpen: boolean
}

export type SET_OPEN = 'SET_OPEN'

export type MobileMenuActions =
  | { type: SET_OPEN, readonly payload: boolean }

const initialMobileMenuStore: MobileMenuStore = {
  isOpen: false
}

export const useMobileMenuReducer = (): [MobileMenuStore, Dispatch<MobileMenuActions>] => {
  return useReducer(mobileMenuReducer, initialMobileMenuStore)
}

export const mobileMenuReducer = (
  state: MobileMenuStore,
  action: MobileMenuActions
): MobileMenuStore => {
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
