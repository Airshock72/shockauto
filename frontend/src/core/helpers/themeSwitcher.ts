import gsap from 'gsap'

const shiftDuration = 0.55

// Same shadow structure in both gears so GSAP can tween between them
const knobShadow = (rgb: string) =>
  `0px 2px 4px rgba(0,0,0,0.35), 0px 0px 0px 2px rgba(${rgb},0.75), 0px 0px 12px rgba(${rgb},0.55)`
const iconGlow = (rgb: string, alpha: number) => `drop-shadow(0px 0px 4px rgba(${rgb},${alpha}))`

const dayRgb = '245,158,11'
const nightRgb = '34,211,238'
const idleColor = '#a1a1aa'

export const animateThemeSwitch = (track: HTMLElement, isDark: boolean, instant: boolean) => {
  const select = gsap.utils.selector(track)
  const knob = select('[data-theme-knob]')[0] as HTMLElement | undefined
  if (!knob) return null

  const travel = track.clientWidth - knob.offsetLeft * 2 - knob.offsetWidth
  const timeline = gsap.timeline()

  timeline
    .to(knob, { x: isDark ? travel : 0, duration: shiftDuration, ease: 'back.out(1.8)' }, 0)
    .to(knob, {
      keyframes: { rotate: [0, isDark ? 28 : -28, 0], scale: [1, 0.9, 1] },
      duration: shiftDuration,
      ease: 'power2.out'
    }, 0)
    .to(knob, { boxShadow: knobShadow(isDark ? nightRgb : dayRgb), duration: 0.3 }, shiftDuration * 0.5)
    .to(select('[data-theme-sun]'), {
      color: isDark ? idleColor : `rgb(${dayRgb})`,
      opacity: isDark ? 0.55 : 1,
      scale: isDark ? 0.85 : 1.1,
      rotate: isDark ? -90 : 0,
      filter: iconGlow(dayRgb, isDark ? 0 : 0.85),
      duration: 0.35
    }, shiftDuration * 0.45)
    .to(select('[data-theme-moon]'), {
      color: isDark ? `rgb(${nightRgb})` : idleColor,
      opacity: isDark ? 1 : 0.55,
      scale: isDark ? 1.1 : 0.85,
      rotate: isDark ? 0 : 45,
      filter: iconGlow(nightRgb, isDark ? 0.85 : 0),
      duration: 0.35
    }, shiftDuration * 0.45).then()

  if (instant) timeline.progress(1).then()

  return timeline
}
