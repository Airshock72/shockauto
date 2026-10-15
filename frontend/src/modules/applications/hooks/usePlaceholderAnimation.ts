import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import type { ApplicationCategory } from 'src/modules/applications/types'

gsap.registerPlugin(useGSAP)

const driveDistance = 16
const driveDuration = 5
const pixelsPerSvgUnit = 4
const puffInterval = 0.18

const usePlaceholderAnimation = (category: ApplicationCategory, hasImage: boolean) => {
  const iconRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const icon = iconRef.current
      const vehicle = icon?.querySelector<HTMLElement>('[data-vehicle]')
      const body = vehicle?.querySelector('svg')
      if (!icon || !vehicle || !body) return

      if (prefersReducedMotion()) {
        gsap.set(icon, { opacity: 1 }).then()
        return
      }

      const wheels = Array.from(body.querySelectorAll('circle'))
      const puffs = gsap.utils.toArray<HTMLElement>('[data-puff]', icon)

      wheels.forEach((wheel) => {
        const circumference = 2 * Math.PI * wheel.r.baseVal.value
        gsap.set(wheel, { strokeDasharray: `${circumference * 0.2} ${circumference * 0.05}` }).then()
      })

      const setWheelOffset = gsap.quickSetter(wheels, 'strokeDashoffset')
      const setTilt = gsap.quickSetter(body, 'rotate', 'deg')
      let lastX = 0
      let velocity = 0
      let puffIndex = 0

      const handleDrive = () => {
        const x = Number(gsap.getProperty(vehicle, 'x'))
        velocity = x - lastX
        lastX = x
        setWheelOffset(-x / pixelsPerSvgUnit)
        setTilt(gsap.utils.clamp(-4, 4, -velocity * 6))
      }

      const emitPuff = () => {
        if (Math.abs(velocity) < 0.04 || !puffs.length) return

        const puff = puffs[puffIndex++ % puffs.length]
        const direction = Math.sign(velocity)
        const rearX = lastX - direction * 30

        gsap.fromTo(
          puff,
          { x: rearX, y: 0, scale: 0.3, opacity: 0.7 },
          { x: rearX - direction * 18, y: -12, scale: 1.6, opacity: 0, duration: 0.8, ease: 'power2.out' }
        ).then()
      }

      gsap.timeline()
        .fromTo(
          icon,
          { opacity: 0, x: -48, y: 8, scale: 0.6, rotate: -12, filter: 'blur(8px)' },
          { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)', duration: 0.8, ease: 'back.out(1.6)' }
        )
        .addLabel('drive')
        .to('[data-vehicle], [data-shadow]', {
          keyframes: { x: [0, driveDistance, 0, -driveDistance, 0], easeEach: 'sine.inOut' },
          duration: driveDuration,
          ease: 'none',
          repeat: -1,
          onUpdate: handleDrive
        }, 'drive')
        .to(body, { y: -1.5, duration: 0.16, ease: 'sine.inOut', repeat: -1, yoyo: true }, 'drive')
        .to('[data-shadow]', { scaleX: 0.88, opacity: 0.7, duration: 0.16, ease: 'sine.inOut', repeat: -1, yoyo: true }, 'drive')
        .to({}, { duration: puffInterval, repeat: -1, onRepeat: emitPuff }, 'drive').then()
    },
    { dependencies: [category, hasImage], scope: iconRef, revertOnUpdate: true }
  )

  return iconRef
}

export default usePlaceholderAnimation
