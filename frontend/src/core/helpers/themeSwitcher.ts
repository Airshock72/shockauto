import gsap from 'gsap'

const knobShadow = (rgb: string) =>
  `0px 2px 4px rgba(0,0,0,0.35), 0px 0px 0px 2px rgba(${rgb},0.75), 0px 0px 12px rgba(${rgb},0.55)`
const iconGlow = (rgb: string, alpha: number) => `drop-shadow(0px 0px 4px rgba(${rgb},${alpha}))`

const nightRgb = '34,211,238'

export const animateThemeSwitch = (track: HTMLElement, isDark: boolean, instant: boolean) => {
  const select = gsap.utils.selector(track)
  const knob = select('[data-theme-knob]')[0] as HTMLElement | undefined
  if (!knob) return null

  const travel = track.clientWidth - knob.offsetLeft * 2 - knob.offsetWidth
  const timeline = gsap.timeline()

  timeline
    .to(knob, { x: isDark ? travel : 0, duration: 0.55, ease: 'back.out(1.8)' }, 0)
    .to(knob, {
      keyframes: { rotate: [0, isDark ? 28 : -28, 0], scale: [1, 0.9, 1] },
      duration: 0.55,
      ease: 'power2.out'
    }, 0)
    .to(knob, { boxShadow: knobShadow(isDark ? nightRgb : '245,158,11'), duration: 0.3 }, 0.55 * 0.5)
    .to(select('[data-theme-sun]'), {
      color: isDark ? '#a1a1aa' : `rgb(${'245,158,11'})`,
      opacity: isDark ? 0.55 : 1,
      scale: isDark ? 0.85 : 1.1,
      rotate: isDark ? -90 : 0,
      filter: iconGlow('245,158,11', isDark ? 0 : 0.85),
      duration: 0.35
    }, 0.55 * 0.45)
    .to(select('[data-theme-moon]'), {
      color: isDark ? `rgb(${nightRgb})` : '#a1a1aa',
      opacity: isDark ? 1 : 0.55,
      scale: isDark ? 1.1 : 0.85,
      rotate: isDark ? 0 : 45,
      filter: iconGlow(nightRgb, isDark ? 0.85 : 0),
      duration: 0.35
    }, 0.55 * 0.45).then()

  if (instant) timeline.progress(1).then()

  return timeline
}
