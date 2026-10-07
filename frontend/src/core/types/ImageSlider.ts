export interface Slide {
  readonly src: string
  readonly alt: string
  readonly position?: string
  readonly eyebrow?: string
  readonly title?: string
  readonly subtitle?: string
  readonly accent?: string
}

export interface ImageSliderProps {
  readonly slides: Array<Slide>
  readonly interval?: number
  readonly className?: string
  readonly onSlideChange?: (slide: Slide) => void
}
