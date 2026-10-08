import { type Dispatch, useReducer } from 'react'

export interface ProfileFormValues {
  readonly firstName: string
  readonly lastName: string
  readonly gender: string
  readonly birthDate: string
  readonly personalNumber: string
  readonly email: string
  readonly phoneNumber: string
}

export type ProfileFormErrors = Partial<Record<keyof ProfileFormValues, string>>

export interface ProfileStore {
  readonly values: ProfileFormValues
  readonly errors: ProfileFormErrors
  readonly isSubmitted: boolean
  readonly formShaking: boolean
}

export type SET_VALUES = 'SET_VALUES'
export type SET_ERRORS = 'SET_ERRORS'
export type SET_SUBMITTED = 'SET_SUBMITTED'
export type SET_FORM_SHAKING = 'SET_FORM_SHAKING'

export type ProfileActions =
  | { type: SET_VALUES, readonly payload: ProfileFormValues }
  | { type: SET_ERRORS, readonly payload: ProfileFormErrors }
  | { type: SET_SUBMITTED, readonly payload: boolean }
  | { type: SET_FORM_SHAKING, readonly payload: boolean }

const initialProfileStore: ProfileStore = {
  values: {
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    personalNumber: '',
    email: '',
    phoneNumber: ''
  },
  errors: {},
  isSubmitted: false,
  formShaking: false
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
  default:
    return state
  }
}
