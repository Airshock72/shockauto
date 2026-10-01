import { type Dispatch, useReducer } from 'react'

export interface ImageSliderStore {
  readonly activeIndex: number
  readonly isPaused: boolean
  readonly failedIndexes: ReadonlySet<number>
  readonly autoplay: boolean
}

export type SET_ACTIVE_INDEX = 'SET_ACTIVE_INDEX'
export type SET_PAUSED = 'SET_PAUSED'
export type ADD_FAILED_INDEX = 'ADD_FAILED_INDEX'

export type ImageSliderActions =
  | { type: SET_ACTIVE_INDEX, readonly payload: number }
  | { type: SET_PAUSED, readonly payload: boolean }
  | { type: ADD_FAILED_INDEX, readonly payload: number }

const initialImageSliderStore: ImageSliderStore = {
  activeIndex: 0,
  isPaused: false,
  failedIndexes: new Set(),
  autoplay: true
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const initImageSliderStore = (store: ImageSliderStore): ImageSliderStore => ({
  ...store,
  autoplay: !prefersReducedMotion()
})

export const useImageSliderReducer = (): [ImageSliderStore, Dispatch<ImageSliderActions>] => {
  return useReducer(imageSliderReducer, initialImageSliderStore, initImageSliderStore)
}

export const imageSliderReducer = (
  state: ImageSliderStore,
  action: ImageSliderActions
): ImageSliderStore => {
  switch (action.type) {
  case 'SET_ACTIVE_INDEX':
    return {
      ...state,
      activeIndex: action.payload
    }
  case 'SET_PAUSED':
    return {
      ...state,
      isPaused: action.payload
    }
  case 'ADD_FAILED_INDEX':
    return {
      ...state,
      failedIndexes: new Set(state.failedIndexes).add(action.payload)
    }
  default:
    return state
  }
}
