import { type Dispatch, useReducer } from 'react'

export interface ProfileFormValues {
  readonly firstName: string
  readonly lastName: string
  readonly gender: string | null
  readonly birthDate: string | null
  readonly personalNumber: string | null
  readonly email: string
  readonly phoneNumber: string | null
}

export type ProfileFormErrors = Partial<Record<keyof ProfileFormValues, string>>

export interface ProfileStore {
  readonly values: ProfileFormValues
  readonly errors: ProfileFormErrors
  readonly isSubmitted: boolean
  readonly formShaking: boolean
  readonly isLoading: boolean
  readonly isSubmitting: boolean
}

export type SET_VALUES = 'SET_VALUES'
export type SET_ERRORS = 'SET_ERRORS'
export type SET_SUBMITTED = 'SET_SUBMITTED'
export type SET_FORM_SHAKING = 'SET_FORM_SHAKING'
export type SET_LOADING = 'SET_LOADING'
export type SET_SUBMITTING = 'SET_SUBMITTING'

export type ProfileActions =
  | { type: SET_VALUES, readonly payload: ProfileFormValues }
  | { type: SET_ERRORS, readonly payload: ProfileFormErrors }
  | { type: SET_SUBMITTED, readonly payload: boolean }
  | { type: SET_FORM_SHAKING, readonly payload: boolean }
  | { type: SET_LOADING, readonly payload: boolean }
  | { type: SET_SUBMITTING, readonly payload: boolean }

const initialProfileStore: ProfileStore = {
  values: {
    firstName: '',
    lastName: '',
    gender: null,
    birthDate: null,
    personalNumber: null,
    email: '',
    phoneNumber: null
  },
  errors: {},
  isSubmitted: false,
  formShaking: false,
  isLoading: true,
  isSubmitting: false
}

export const useProfileReducer = (): [ProfileStore, Dispatch<ProfileActions>] => {
  return useReducer(profileReducer, initialProfileStore)
}

export const profileReducer = (
  state: ProfileStore,
  action: ProfileActions
): ProfileStore => {
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
  case 'SET_SUBMITTING':
    return {
      ...state,
      isSubmitting: action.payload
    }
  default:
    return state
  }
}
