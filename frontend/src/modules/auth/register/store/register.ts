import { type Dispatch, useReducer } from 'react'

export interface RegisterFormValues {
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly password: string
  readonly repeatPassword: string
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>

export interface RegisterStore {
  readonly values: RegisterFormValues
  readonly errors: RegisterFormErrors
  readonly isSubmitted: boolean
  readonly formShaking: boolean
  readonly isLoading: boolean
}

export type SET_VALUES = 'SET_VALUES'
export type SET_ERRORS = 'SET_ERRORS'
export type SET_SUBMITTED = 'SET_SUBMITTED'
export type SET_FORM_SHAKING = 'SET_FORM_SHAKING'
export type SET_LOADING = 'SET_LOADING'

export type RegisterActions =
  | { type: SET_VALUES, readonly payload: RegisterFormValues }
  | { type: SET_ERRORS, readonly payload: RegisterFormErrors }
  | { type: SET_SUBMITTED, readonly payload: boolean }
  | { type: SET_FORM_SHAKING, readonly payload: boolean }
  | { type: SET_LOADING, readonly payload: boolean }

const initialRegisterStore: RegisterStore = {
  values: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
  },
  errors: {},
  isSubmitted: false,
  formShaking: false,
  isLoading: false
}

export const useRegisterReducer = (): [RegisterStore, Dispatch<RegisterActions>] => {
  return useReducer(registerReducer, initialRegisterStore)
}

export const registerReducer = (
  state: RegisterStore,
  action: RegisterActions
): RegisterStore => {
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
