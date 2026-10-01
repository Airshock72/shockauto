import { useRef } from 'react'
import type { PointerEvent } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  buildCablePath,
  CABLE_RELEASE_EASE,
  type CableSample,
  createKeyPress,
  createKeypadFloat,
  createKeypadLoop,
  createPageReveal,
  createRipple,
  findNearestSample,
  limitPull,
  REDUCED_MOTION_OFF,
  sampleCable,
  toSvgPoint,
  ZERO
} from 'src/modules/notFound/helpers'

gsap.registerPlugin(useGSAP)

const useKeypadInteractions = () => {
  const pageRef = useRef<HTMLElement>(null)

  const cable = useRef({
    originalD: '',
    samples: [] as Array<CableSample>,
    grabS: 0,
    grabStart: ZERO,
    offset: { ...ZERO }, // mutable — tweened by GSAP on release
    dragging: false
  })

  const getSvg = () => pageRef.current?.querySelector('svg') ?? null

  const { contextSafe } = useGSAP(
    () => {
      const svg = getSvg()
      if (!svg) return

      gsap.set(svg.querySelectorAll('.kp-key-btn'), { filter: 'brightness(1)' }).then()

      const media = gsap.matchMedia()
      media.add(REDUCED_MOTION_OFF, () => {
        createKeypadLoop(svg).then()
        createKeypadFloat(svg).then()
        createPageReveal(gsap.utils.toArray('.nf-reveal', pageRef.current)).then()
      })
    },
    { scope: pageRef }
  )

  const renderCable = () => {
    const svg = getSvg()
    if (!svg) return

    const { offset, samples, grabS, originalD } = cable.current
    const isResting = Math.hypot(offset.x, offset.y) < 0.05
    const d = isResting ? originalD : buildCablePath(samples, offset, grabS)

    svg.querySelectorAll('.kp-cable').forEach((path) => path.setAttribute('d', d))
  }

  // Elastic spring back to rest — gives the cable a little wobble on release
  const releaseCable = () => {
    contextSafe(() => {
      gsap.to(cable.current.offset, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: CABLE_RELEASE_EASE,
        onUpdate: renderCable,
        onComplete: renderCable
      }).then()
    })()
  }

  const grabCable = (event: PointerEvent<HTMLDivElement>, svg: SVGSVGElement) => {
    const state = cable.current
    const point = toSvgPoint(svg, event.clientX, event.clientY)
    const path = svg.querySelector<SVGPathElement>('.kp-cable')
    if (!point || !path) return

    if (!state.samples.length) {
      state.originalD = path.getAttribute('d') ?? ''
      state.samples = sampleCable(path)
    }

    gsap.killTweensOf(state.offset)
    state.dragging = true
    state.grabS = findNearestSample(state.samples, point).s
    state.grabStart = { x: point.x - state.offset.x, y: point.y - state.offset.y }

    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.classList.add('kp-dragging')
  }

  const pressKey = contextSafe((keyHit: Element, svg: SVGSVGElement) => {
    const button = keyHit.querySelector('.kp-key-btn')
    const face = keyHit.querySelector<SVGRectElement>('.kp-key-face')
    if (!button || !face) return

    gsap.killTweensOf(button)
    createKeyPress(button).then()

    // Ripple ring expanding from the key
    const ripple = createRipple(face.getBBox())
    svg.appendChild(ripple)

    gsap.fromTo(
      ripple,
      { scale: 1, opacity: 0.8, transformOrigin: '50% 50%' },
      { scale: 1.45, opacity: 0, duration: 0.6, ease: 'expo.out', onComplete: () => ripple.remove() }
    ).then()
  })

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const svg = getSvg()
    if (!svg || !(event.target instanceof Element)) return

    const keyHit = event.target.closest('.kp-key-hit')
    if (keyHit) {
      pressKey(keyHit, svg)
      return
    }

    if (event.target.closest('.kp-cable-hit')) grabCable(event, svg)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = cable.current
    const svg = getSvg()
    if (!state.dragging || !svg) return

    const point = toSvgPoint(svg, event.clientX, event.clientY)
    if (!point) return

    const pull = limitPull({ x: point.x - state.grabStart.x, y: point.y - state.grabStart.y })
    state.offset.x = pull.x
    state.offset.y = pull.y
    renderCable()
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const state = cable.current
    if (!state.dragging) return

    state.dragging = false
    event.currentTarget.classList.remove('kp-dragging')
    releaseCable()
  }

  return {
    pageRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  }
}

export default useKeypadInteractions
