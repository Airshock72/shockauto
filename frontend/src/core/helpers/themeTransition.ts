import { flushSync } from 'react-dom'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

export interface SpreadOrigin {
  readonly x: number
  readonly y: number
}

const spreadDuration = 1100
const frameCount = 48
const pointCount = 192
const treadPattern = [1, 1, 0, 0]
const maxTreadDepth = 26
const spinTurns = 0.35
const spreadingClass = 'theme-spreading'

const launchEase = (progress: number) =>
  progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2

const organicWobble = (angle: number, time: number) =>
  0.07 * Math.sin(3 * angle + time * 9) + 0.045 * Math.sin(7 * angle - time * 13) + 0.025 * Math.sin(13 * angle + time * 21)

const treadPolygon = ({ x, y }: SpreadOrigin, radius: number, rotation: number, time: number) => {
  const treadDepth = Math.min(maxTreadDepth, radius * 0.18)
  const points: Array<string> = []

  for (let index = 0; index < pointCount; index++) {
    const angle = (index / pointCount) * Math.PI * 2 + rotation
    const isBlock = treadPattern[index % treadPattern.length] === 1
    const edge = radius * (1 + organicWobble(angle - rotation, time)) - (isBlock ? 0 : treadDepth)
    const distance = Math.max(0, edge)

    points.push(`${(x + Math.cos(angle) * distance).toFixed(1)}px ${(y + Math.sin(angle) * distance).toFixed(1)}px`)
  }

  return `polygon(${points.join(',')})`
}

const buildSpreadFrames = (origin: SpreadOrigin) => {
  const farthestCorner = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y)
  )
  const finalRadius = (farthestCorner + maxTreadDepth) / 0.86

  return Array.from({ length: frameCount + 1 }, (_, frame) => {
    const time = frame / frameCount
    const radius = finalRadius * launchEase(time)

    return { clipPath: treadPolygon(origin, radius, time * spinTurns * Math.PI * 2, time) }
  })
}

export const getElementCenter = (element: Element): SpreadOrigin => {
  const rect = element.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

export const spreadThemeChange = (origin: SpreadOrigin, applyTheme: () => void) => {
  if (!document.startViewTransition || prefersReducedMotion()) {
    applyTheme()
    return
  }

  const root = document.documentElement
  root.classList.add(spreadingClass)

  const transition = document.startViewTransition(() => flushSync(applyTheme))

  transition.ready
    .then(() => {
      root.animate(buildSpreadFrames(origin), {
        duration: spreadDuration,
        easing: 'linear',
        pseudoElement: '::view-transition-new(root)'
      })
    })
    .catch(() => undefined)

  transition.finished.finally(() => root.classList.remove(spreadingClass)).catch(() => undefined)
}
