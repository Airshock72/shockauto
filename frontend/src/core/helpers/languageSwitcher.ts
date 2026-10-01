import gsap from 'gsap'
import type { Language } from 'src/i18n'

export interface LanguageOption {
  readonly code: Language
  readonly label: string
}

export const LANGUAGE_OPTIONS: Array<LanguageOption> = [
  { code: 'ka', label: 'ქა' },
  { code: 'en', label: 'En' }
]

export interface ThumbPosition {
  readonly x: number
  readonly width: number
}

const SWITCH_DURATION = 0.5

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const animateLanguageSwitch = (thumb: Element, label: Element | null, position: ThumbPosition) => {
  const timeline = gsap.timeline()

  timeline
    .to(thumb, { ...position, duration: SWITCH_DURATION, ease: 'power3.inOut' }, 0)
    .to(thumb, {
      keyframes: { scaleX: [1, 1.35, 1], scaleY: [1, 0.82, 1] },
      duration: SWITCH_DURATION,
      ease: 'power1.inOut'
    }, 0)

  if (label) {
    timeline.fromTo(
        label,
        {scale: 0.6, opacity: 0.4},
        {scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(3)'},
        SWITCH_DURATION * 0.4
    ).then()
  }

  return timeline
}
