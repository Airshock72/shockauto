import type { KeyboardEvent } from 'react'
import type { Slide } from 'src/core/types/ImageSlider.ts'
import { useImageSliderReducer } from 'src/core/store/imageSlider.ts'

const useImageSlider = (slides: Array<Slide>) => {
  const [state, dispatch] = useImageSliderReducer()

  const activeSlide = slides[state.activeIndex]

  const goTo = (index: number) => {
    dispatch({ type: 'SET_ACTIVE_INDEX', payload: (index + slides.length) % slides.length })
  }

  const setPaused = (isPaused: boolean) => dispatch({ type: 'SET_PAUSED', payload: isPaused })

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') goTo(state.activeIndex + 1)
    if (event.key === 'ArrowLeft') goTo(state.activeIndex - 1)
  }

  const handleImageError = (index: number) => dispatch({ type: 'ADD_FAILED_INDEX', payload: index })

  return {
    state,
    activeSlide,
    goTo,
    setPaused,
    handleKeyDown,
    handleImageError
  }
}

export default useImageSlider
