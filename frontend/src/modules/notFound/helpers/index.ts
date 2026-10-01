import gsap from 'gsap'

export interface Point {
  x: number
  y: number
}

export interface CableSample extends Point {
  s: number
}

export const SVG_NS = 'http://www.w3.org/2000/svg'

// Cable drag tuning (SVG units)
export const MAX_PULL = 70 // how far the cable can be pulled
export const FALLOFF = 150 // how much of the cable bends around the grab point
export const PIN_LENGTH = 60 // cable eases out of the plug over this length
export const CABLE_RELEASE_EASE = 'elastic.out(1, 0.3)' // wobble on release

export const ZERO: Point = { x: 0, y: 0 }

export const REDUCED_MOTION_OFF = '(prefers-reduced-motion: no-preference)'

// Ambient loop timing (seconds)
const LOOP_DURATION = 5
const PULSE_ARRIVAL = 2.75
const KEY_PRESS_START = 2.9
const KEY_PRESS_STAGGER = 0.4

/*
 * One 5s loop:
 *   0 → 2.75s   electric pulse runs down the cable
 *   2.75s       spark at the plug
 *   2.9 → 4.2s  keys press in sequence 4 → 0 → 4
 */
export const createKeypadLoop = (svg: SVGSVGElement) => {
  const pulse = svg.querySelector('.kp-pulse')
  const spark = svg.querySelector('.kp-spark')
  const keys = gsap.utils.toArray<SVGGElement>(svg.querySelectorAll('.kp-key'))

  gsap.set(spark, { transformOrigin: '50% 50%' }).then()
  gsap.set(keys, { filter: 'brightness(1)' }).then()

  const timeline = gsap.timeline({ repeat: -1 })

  timeline
    .set(pulse, { strokeDashoffset: 3, opacity: 1 }, 0)
    .to(pulse, { strokeDashoffset: 100, duration: PULSE_ARRIVAL, ease: 'none' }, 0)
    .set(pulse, { opacity: 0 }, PULSE_ARRIVAL + 0.05)
    .fromTo(spark, { scale: 0.2, opacity: 0 }, {
      scale: 1,
      opacity: 0.9,
      duration: 0.1,
      ease: 'none'
    }, PULSE_ARRIVAL - 0.05)
    .to(spark, { scale: 2.2, opacity: 0, duration: 0.5, ease: 'power2. out' }, PULSE_ARRIVAL + 0.05).then()

  keys.forEach((key, index) => {
    const at = KEY_PRESS_START + index * KEY_PRESS_STAGGER
    const glow = key.querySelector('.kp-digit-glow')

    timeline
      .to(key, { y: 6, filter: 'brightness(1.15)', duration: 0.2, ease: 'power4.out' }, at)
      .to(key, { y: 0, filter: 'brightness(1)', duration: 0.3, ease: 'power4.out' }, at + 0.2).then()

    if (glow) {
      timeline
        .to(glow, { opacity: 1, duration: 0.2, ease: 'power4.out' }, at)
        .to(glow, { opacity: 0, duration: 0.7, ease: 'power4.out' }, at + 0.2).then()
    }
  })

  // Pad the timeline so every loop lasts exactly LOOP_DURATION
  timeline.set({}, {}, LOOP_DURATION).then()

  return timeline
}

// Keypad gently floating (the cable sways with it)
export const createKeypadFloat = (svg: SVGSVGElement) =>
  gsap.to(svg, { y: -8, rotation: -0.6, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 })

// Heading, description and button fade up one after another
export const createPageReveal = (targets: Array<Element>) =>
  gsap.from(targets, { opacity: 0, y: 8, duration: 0.45, delay: 0.15, stagger: 0.15, ease: 'expo.out' })

// Clicked key: press down, bounce slightly back up, settle
export const createKeyPress = (button: Element) =>
  gsap
    .timeline()
    .to(button, { y: 7, filter: 'brightness(1.2)', duration: 0.09, ease: 'power2.out' })
    .to(button, { y: -2, filter: 'brightness(1.05)', duration: 0.16, ease: 'power2.out' })
    .to(button, { y: 0, filter: 'brightness(1)', duration: 0.2, ease: 'power2.out' })

export const toSvgPoint = (svg: SVGSVGElement, clientX: number, clientY: number): Point | null => {
  const matrix = svg.getScreenCTM()
  if (!matrix) return null

  const point = new DOMPoint(clientX, clientY).matrixTransform(matrix.inverse())
  return { x: point.x, y: point.y }
}

// Soft limit: the further you pull, the harder it gets
export const limitPull = ({ x, y }: Point): Point => {
  const length = Math.hypot(x, y)
  if (length === 0) return ZERO

  const scale = (MAX_PULL * Math.tanh(length / MAX_PULL)) / length
  return { x: x * scale, y: y * scale }
}

// Dense samples near the plug (visible curve), sparse along the long straight part
export const sampleCable = (path: SVGPathElement): Array<CableSample> => {
  const total = path.getTotalLength()
  const samples: Array<CableSample> = []

  for (let s = 0; s < total; s += s < 700 ? 5 : 50) {
    const { x, y } = path.getPointAtLength(s)
    samples.push({ x, y, s })
  }

  const end = path.getPointAtLength(total)
  samples.push({ x: end.x, y: end.y, s: total })

  return samples
}

export const findNearestSample = (samples: Array<CableSample>, point: Point): CableSample =>
  samples.reduce((best, sample) =>
    Math.hypot(sample.x - point.x, sample.y - point.y) < Math.hypot(best.x - point.x, best.y - point.y) ? sample : best
  )

// Bends the sampled cable around the grab point, keeping the plug end pinned
export const buildCablePath = (samples: Array<CableSample>, offset: Point, grabS: number): string =>
  samples
    .map(({ x, y, s }, index) => {
      const t = Math.min(1, s / PIN_LENGTH)
      const pin = t * t * (3 - 2 * t) // smoothstep — no kink at the plug
      const weight = Math.exp(-(((s - grabS) / FALLOFF) ** 2)) * pin
      const command = index === 0 ? 'M' : 'L'
      return `${command}${(x + offset.x * weight).toFixed(1)} ${(y + offset.y * weight).toFixed(1)}`
    })
    .join(' ')

export const createRipple = (box: DOMRect): SVGRectElement => {
  const ripple = document.createElementNS(SVG_NS, 'rect')
  ripple.setAttribute('x', String(box.x))
  ripple.setAttribute('y', String(box.y))
  ripple.setAttribute('width', String(box.width))
  ripple.setAttribute('height', String(box.height))
  ripple.setAttribute('rx', '11')
  ripple.setAttribute('class', 'kp-ripple')
  return ripple
}
