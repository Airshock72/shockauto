export type SlideDirection = 1 | -1

export const CLIP_FULL = 'inset(0% 0% 0% 0%)'

export const SLIDE_DURATION = 1.1
export const SNAP_DURATION = 0.5
export const SWIPE_THRESHOLD = 0.18
export const FLICK_VELOCITY = 0.5
export const DRAG_DEAD_ZONE = 6

export const INCOMING_SCALE = 1.2
export const INCOMING_SHIFT = 10
export const OUTGOING_SHIFT = 12

export const clipFrom = (direction: SlideDirection, progress: number): string => {
  const hidden = `${((1 - progress) * 100).toFixed(2)}%`
  return direction === 1 ? `inset(0% 0% 0% ${hidden})` : `inset(0% ${hidden} 0% 0%)`
}

export const directionBetween = (from: number, to: number, count: number): SlideDirection => {
  if (from === count - 1 && to === 0) return 1
  if (from === 0 && to === count - 1) return -1
  return to > from ? 1 : -1
}

export const wrapIndex = (index: number, count: number) => (index + count) % count

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
