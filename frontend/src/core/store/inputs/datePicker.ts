import { type Dispatch, useReducer } from 'react'

export type DatePickerView = 'days' | 'years'

export interface DatePickerStore {
  readonly isOpen: boolean
  readonly view: DatePickerView
  readonly viewYear: number
  readonly viewMonth: number
}

interface ViewDate {
  readonly year: number
  readonly month: number
}

export type OPEN = 'OPEN'
export type CLOSE = 'CLOSE'
export type SET_VIEW = 'SET_VIEW'
export type SET_VIEW_DATE = 'SET_VIEW_DATE'

export type DatePickerActions =
  | { type: OPEN, readonly payload: ViewDate }
  | { type: CLOSE }
  | { type: SET_VIEW, readonly payload: DatePickerView }
  | { type: SET_VIEW_DATE, readonly payload: ViewDate }

const initialDatePickerStore: DatePickerStore = {
  isOpen: false,
  view: 'days',
  viewYear: new Date().getFullYear(),
  viewMonth: new Date().getMonth()
}

export const useDatePickerReducer = (): [DatePickerStore, Dispatch<DatePickerActions>] => {
  return useReducer(datePickerReducer, initialDatePickerStore)
}

export const datePickerReducer = (
  state: DatePickerStore,
  action: DatePickerActions
): DatePickerStore => {
  switch (action.type) {
  case 'OPEN':
    return {
      ...state,
      isOpen: true,
      view: 'days',
      viewYear: action.payload.year,
      viewMonth: action.payload.month
    }
  case 'CLOSE':
    return {
      ...state,
      isOpen: false
    }
  case 'SET_VIEW':
    return {
      ...state,
      view: action.payload
    }
  case 'SET_VIEW_DATE':
    return {
      ...state,
      view: 'days',
      viewYear: action.payload.year,
      viewMonth: action.payload.month
    }
  default:
    return state
  }
}
