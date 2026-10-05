import gsap from 'gsap'

const switchDuration = 0.6

export const animateThemeSwitch = (track: HTMLElement, isDark: boolean, instant: boolean) => {
  const select = gsap.utils.selector(track)
  const thumb = select('[data-theme-thumb]')[0] as HTMLElement | undefined
  if (!thumb) return null

  const travel = track.clientWidth - thumb.offsetWidth - thumb.offsetLeft * 2
  const timeline = gsap.timeline({ defaults: { duration: switchDuration, ease: 'power3.inOut' } })

  timeline
    .to(thumb, { x: isDark ? travel : 0, rotate: isDark ? 360 : 0 }, 0)
    .to(thumb, { keyframes: { scaleX: [1, 1.18, 1], scaleY: [1, 0.88, 1] }, ease: 'power1.inOut' }, 0)
    .to(select('[data-theme-night]'), { opacity: isDark ? 1 : 0 }, 0)
    .to(select('[data-theme-sun]'), { opacity: isDark ? 0 : 1, scale: isDark ? 0.4 : 1 }, 0)
    .to(select('[data-theme-moon]'), { opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.4 }, 0)
    .to(select('[data-theme-clouds]'), { x: isDark ? 24 : 0, opacity: isDark ? 0 : 1 }, 0)
    .to(select('[data-theme-star]'), {
      opacity: isDark ? 1 : 0,
      scale: isDark ? 1 : 0,
      duration: 0.35,
      ease: isDark ? 'back.out(3)' : 'power2.in',
      stagger: 0.05
    }, isDark ? switchDuration  * 0.45 : 0).then()

  if (instant) timeline.progress(1).then()

  return timeline
}

export const stars = [
  { className: 'top-2 left-2.5 size-1' },
  { className: 'top-4.5 left-5 size-0.5' },
  { className: 'top-1.5 left-7 size-0.5' },
  { className: 'bottom-2 left-3.5 size-0.5' },
  { className: 'top-3 left-9.5 size-[3px]' }
]
