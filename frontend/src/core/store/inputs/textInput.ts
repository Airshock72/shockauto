import { type Dispatch, useReducer } from 'react'

export interface TextInputStore {
  readonly isPasswordVisible: boolean
}

export type TOGGLE_PASSWORD_VISIBILITY = 'TOGGLE_PASSWORD_VISIBILITY'

export type TextInputActions =
  | { type: TOGGLE_PASSWORD_VISIBILITY }

const initialTextInputStore: TextInputStore = {
  isPasswordVisible: false
}

export const useTextInputReducer = (): [TextInputStore, Dispatch<TextInputActions>] => {
  return useReducer(textInputReducer, initialTextInputStore)
}

export const textInputReducer = (
  state: TextInputStore,
  action: TextInputActions
): TextInputStore => {
  switch (action.type) {
  case 'TOGGLE_PASSWORD_VISIBILITY':
    return {
      ...state,
      isPasswordVisible: !state.isPasswordVisible
    }
  default:
    return state
  }
}
