import gsap from 'gsap'

const tiltDegrees = 14
const liftDistance = 10
const glideDuration = 0.55

const keyOffsets: Record<string, number> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1
}

export const radioOptionSelector = '[role="radio"]'

export const checkedRadioSelector = `${radioOptionSelector}[aria-checked="true"]`

export const defaultRadioAccent = 'var(--primary)'

export const getNextRadioIndex = (key: string, index: number, length: number): number | null => {
  if (key === 'Home') return 0
  if (key === 'End') return length - 1

  const offset = keyOffsets[key]
  return offset === undefined ? null : (index + offset + length) % length
}

export const getSwatchBackground = (color: string) =>
  `radial-gradient(circle at 32% 28%, rgb(255 255 255 / 0.75), transparent 42%), radial-gradient(circle at 70% 78%, rgb(0 0 0 / 0.3), transparent 60%), ${color}`

const getThumbRect = (option: HTMLElement) => ({
  x: option.offsetLeft,
  y: option.offsetTop,
  width: option.offsetWidth,
  height: option.offsetHeight
})

const getAccent = (option: HTMLElement) => option.dataset.accent ?? defaultRadioAccent

export const placeRadioThumb = (thumb: HTMLElement, option: HTMLElement | null) =>
  gsap.set(thumb, option
    ? { ...getThumbRect(option), opacity: 1, '--thumb': getAccent(option) }
    : { opacity: 0 })

export const glideRadioThumb = (thumb: HTMLElement, option: HTMLElement | null, wasVisible: boolean) => {
  if (!option) return gsap.to(thumb, { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.in', overwrite: 'auto' })

  gsap.set(thumb, { '--thumb': getAccent(option) }).then()

  if (!wasVisible) {
    return gsap.fromTo(
      thumb,
      { ...getThumbRect(option), opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.4)', overwrite: 'auto' }
    )
  }

  return gsap.timeline()
    .to(thumb, { ...getThumbRect(option), opacity: 1, scale: 1, duration: glideDuration, ease: 'power3.inOut', overwrite: 'auto' }, 0)
    .to(thumb, { keyframes: { scaleX: [1, 1.12, 1], scaleY: [1, 0.82, 1] }, duration: glideDuration, ease: 'power1.inOut' }, 0)
}

export const pulseRadio = (option: Element, repeat = -1) => {
  const pulse = option.querySelector('[data-radio-pulse]')
  if (!pulse) return null

  return gsap.fromTo(
    pulse,
    { scale: 1, opacity: 0.6 },
    { scale: 2.8, opacity: 0, duration: 1.4, ease: 'power2.out', repeat, repeatDelay: 0.25, overwrite: 'auto' }
  )
}

export const flipRadioIndicator = (option: Element) => {
  const indicator = option.querySelector('[data-radio-indicator]')
  const label = option.querySelector('[data-radio-label]')
  const timeline = gsap.timeline()

  if (indicator) {
    timeline.fromTo(
      indicator,
      { rotationY: -180, scale: 0.4, transformPerspective: 160 },
      { rotationY: 0, scale: 1, duration: 0.75, ease: 'back.out(2.2)' }
    ).then()
  }
  if (label) timeline.fromTo(label, { y: 4, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.1).then()

  return timeline
}

export const createRadioTilt = (option: HTMLElement) => {
  gsap.set(option, { transformPerspective: 480 }).then()
  const rotateX = gsap.quickTo(option, 'rotationX', { duration: 0.45, ease: 'power3.out' })
  const rotateY = gsap.quickTo(option, 'rotationY', { duration: 0.45, ease: 'power3.out' })
  const lift = gsap.quickTo(option, 'z', { duration: 0.45, ease: 'power3.out' })

  const move = (event: PointerEvent) => {
    const bounds = option.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rotateY(x * tiltDegrees).then()
    rotateX(-y * tiltDegrees * 1.6).then()
    lift(liftDistance).then()
  }

  const reset = () => {
    rotateX(0).then()
    rotateY(0).then()
    lift(0).then()
  }

  return { move, reset }
}
