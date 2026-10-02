import { type Dispatch, useReducer } from 'react'

export interface LoginFormValues {
  readonly email: string
  readonly password: string
}

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>

export interface LoginStore {
  readonly values: LoginFormValues
  readonly errors: LoginFormErrors
  readonly isSubmitted: boolean
  readonly formShaking: boolean
  readonly isLoading: boolean
}

export type SET_VALUES = 'SET_VALUES'
export type SET_ERRORS = 'SET_ERRORS'
export type SET_SUBMITTED = 'SET_SUBMITTED'
export type SET_FORM_SHAKING = 'SET_FORM_SHAKING'
export type SET_LOADING = 'SET_LOADING'

export type LoginActions =
  | { type: SET_VALUES, readonly payload: LoginFormValues }
  | { type: SET_ERRORS, readonly payload: LoginFormErrors }
  | { type: SET_SUBMITTED, readonly payload: boolean }
  | { type: SET_FORM_SHAKING, readonly payload: boolean }
  | { type: SET_LOADING, readonly payload: boolean }

const initialLoginStore: LoginStore = {
  values: {
    email: '',
    password: ''
  },
  errors: {},
  isSubmitted: false,
  formShaking: false,
  isLoading: false
}

export const useLoginReducer = (): [LoginStore, Dispatch<LoginActions>] => {
  return useReducer(loginReducer, initialLoginStore)
}

export const loginReducer = (
  state: LoginStore,
  action: LoginActions
): LoginStore => {
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
  case 'SET_LOADING':
    return {
      ...state,
      isLoading: action.payload
    }
  default:
    return state
  }
}
