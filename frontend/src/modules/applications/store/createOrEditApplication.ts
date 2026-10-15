import { type Dispatch, useReducer } from 'react'
import { ApplicationCategory, type ApplicationPreview, ApplicationStep } from 'src/modules/applications/types'

export interface CreateOrEditApplicationStore {
  readonly category: ApplicationCategory
  readonly activeStep: ApplicationStep
  readonly expandedSteps: ReadonlyArray<ApplicationStep>
  readonly preview: ApplicationPreview
}

export type SET_CATEGORY = 'SET_CATEGORY'
export type SET_ACTIVE_STEP = 'SET_ACTIVE_STEP'
export type TOGGLE_STEP = 'TOGGLE_STEP'

export type CreateOrEditApplicationActions =
  | { type: SET_CATEGORY, readonly payload: ApplicationCategory }
  | { type: SET_ACTIVE_STEP, readonly payload: ApplicationStep }
  | { type: TOGGLE_STEP, readonly payload: ApplicationStep }

const initialCreateOrEditApplicationStore: CreateOrEditApplicationStore = {
  category: ApplicationCategory.Car,
  activeStep: ApplicationStep.Characteristics,
  expandedSteps: [ApplicationStep.Characteristics],
  preview: {
    imageUrl: null,
    title: null,
    price: null,
    specs: {}
  }
}

export const useCreateOrEditApplicationReducer = (): [CreateOrEditApplicationStore, Dispatch<CreateOrEditApplicationActions>] => {
  return useReducer(createOrEditApplicationReducer, initialCreateOrEditApplicationStore)
}

export const createOrEditApplicationReducer = (
  state: CreateOrEditApplicationStore,
  action: CreateOrEditApplicationActions
): CreateOrEditApplicationStore => {
  switch (action.type) {
  case 'SET_CATEGORY':
    return {
      ...state,
      category: action.payload
    }
  case 'SET_ACTIVE_STEP':
    return {
      ...state,
      activeStep: action.payload,
      expandedSteps: state.expandedSteps.includes(action.payload)
        ? state.expandedSteps
        : [...state.expandedSteps, action.payload]
    }
  case 'TOGGLE_STEP':
    return {
      ...state,
      activeStep: action.payload,
      expandedSteps: state.expandedSteps.includes(action.payload)
        ? state.expandedSteps.filter((step) => step !== action.payload)
        : [...state.expandedSteps, action.payload]
    }
  default:
    return state
  }
}
