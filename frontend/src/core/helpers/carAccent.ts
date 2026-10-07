import gsap from 'gsap'

export const defaultCarAccent = '#7c5cff'

export const animateCarAccent = (page: HTMLElement, accent: string, instant: boolean) => {
  if (instant) return gsap.set(page, { '--car': accent })

  return gsap.to(page, { '--car': accent, duration: 1.2, ease: 'power2.inOut', overwrite: true })
}
