import gsap from 'gsap'
import GeorgiaFlag from 'src/assets/media/svgs/flag-ka.svg?react'
import UnitedKingdomFlag from 'src/assets/media/svgs/flag-en.svg?react'
import type { LanguageOption, ThumbPosition } from 'src/core/types/languageSwitcher.ts'

export const languageOptions: Array<LanguageOption> = [
  { code: 'ka', label: 'ქა', name: 'ქართული', Flag: GeorgiaFlag },
  { code: 'en', label: 'En', name: 'English', Flag: UnitedKingdomFlag }
]

const switchOptions = 0.5

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const getThumbPosition = (target: HTMLElement): ThumbPosition => ({
  x: target.offsetLeft,
  width: target.offsetWidth
})

export const animateLanguageSwitch = (thumb: Element, label: Element | null, position: ThumbPosition) => {
  const timeline = gsap.timeline()

  timeline
    .to(thumb, { ...position, duration: switchOptions, ease: 'power3.inOut' }, 0)
    .to(thumb, {
      keyframes: { scaleX: [1, 1.35, 1], scaleY: [1, 0.82, 1] },
      duration: switchOptions,
      ease: 'power1.inOut'
    }, 0).then()

  if (label) {
    timeline.fromTo(
      label,
      { scale: 0.6, opacity: 0.4 },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(3)' },
      switchOptions * 0.4
    ).then()
  }

  return timeline
}
