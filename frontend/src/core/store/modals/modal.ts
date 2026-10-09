import { type Dispatch, useReducer } from 'react'

export interface ModalStore {
  readonly isMounted: boolean
}

export type SET_MOUNTED = 'SET_MOUNTED'

export type ModalActions =
  | { type: SET_MOUNTED, readonly payload: boolean }

const initialModalStore: ModalStore = {
  isMounted: false
}

export const useModalReducer = (): [ModalStore, Dispatch<ModalActions>] => {
  return useReducer(modalReducer, initialModalStore)
}

export const modalReducer = (
  state: ModalStore,
  action: ModalActions
): ModalStore => {
  switch (action.type) {
  case 'SET_MOUNTED':
    return {
      ...state,
      isMounted: action.payload
    }
  default:
    return state
  }
}
