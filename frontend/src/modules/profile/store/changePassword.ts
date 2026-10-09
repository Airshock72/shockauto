import { type Dispatch, useReducer } from 'react'

export interface ChangePasswordFormValues {
  readonly newPassword: string
  readonly repeatPassword: string
}

export type ChangePasswordFormErrors = Partial<Record<keyof ChangePasswordFormValues, string>>

export interface ChangePasswordStore {
  readonly values: ChangePasswordFormValues
  readonly errors: ChangePasswordFormErrors
  readonly isSubmitted: boolean
  readonly formShaking: boolean
  readonly isSubmitting: boolean
}

export type SET_VALUES = 'SET_VALUES'
export type SET_ERRORS = 'SET_ERRORS'
export type SET_SUBMITTED = 'SET_SUBMITTED'
export type SET_FORM_SHAKING = 'SET_FORM_SHAKING'
export type SET_SUBMITTING = 'SET_SUBMITTING'
export type RESET = 'RESET'

export type ChangePasswordActions =
  | { type: SET_VALUES, readonly payload: ChangePasswordFormValues }
  | { type: SET_ERRORS, readonly payload: ChangePasswordFormErrors }
  | { type: SET_SUBMITTED, readonly payload: boolean }
  | { type: SET_FORM_SHAKING, readonly payload: boolean }
  | { type: SET_SUBMITTING, readonly payload: boolean }
  | { type: RESET }

const initialChangePasswordStore: ChangePasswordStore = {
  values: {
    newPassword: '',
    repeatPassword: ''
  },
  errors: {},
  isSubmitted: false,
  formShaking: false,
  isSubmitting: false
}

export const useChangePasswordReducer = (): [ChangePasswordStore, Dispatch<ChangePasswordActions>] => {
  return useReducer(changePasswordReducer, initialChangePasswordStore)
}

export const changePasswordReducer = (
  state: ChangePasswordStore,
  action: ChangePasswordActions
): ChangePasswordStore => {
  switch (action.type) {
  case 'SET_VALUES':
    return {
      ...state,
      values: action.payload
    }
  case 'SET_ERRORS':
    return {
      ...state,
      errors: action.payload
    }
  case 'SET_SUBMITTED':
    return {
      ...state,
      isSubmitted: action.payload
    }
  case 'SET_FORM_SHAKING':
    return {
      ...state,
      formShaking: action.payload
    }
  case 'SET_SUBMITTING':
    return {
      ...state,
      isSubmitting: action.payload
    }
  case 'RESET':
    return initialChangePasswordStore
  default:
    return state
  }
}
