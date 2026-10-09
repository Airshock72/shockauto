import { type Dispatch, useReducer } from 'react'

export interface DeleteAccountStore {
  readonly isDeleting: boolean
  readonly isDeleted: boolean
}

export type SET_DELETING = 'SET_DELETING'
export type SET_DELETED = 'SET_DELETED'

export type DeleteAccountActions =
  | { type: SET_DELETING, readonly payload: boolean }
  | { type: SET_DELETED, readonly payload: boolean }

const initialDeleteAccountStore: DeleteAccountStore = {
  isDeleting: false,
  isDeleted: false
}

export const useDeleteAccountReducer = (): [DeleteAccountStore, Dispatch<DeleteAccountActions>] => {
  return useReducer(deleteAccountReducer, initialDeleteAccountStore)
}

export const deleteAccountReducer = (
  state: DeleteAccountStore,
  action: DeleteAccountActions
): DeleteAccountStore => {
  switch (action.type) {
  case 'SET_DELETING':
    return {
      ...state,
      isDeleting: action.payload
    }
  case 'SET_DELETED':
    return {
      ...state,
      isDeleted: action.payload
    }
  default:
    return state
  }
}
