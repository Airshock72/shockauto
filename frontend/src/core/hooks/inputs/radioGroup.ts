import { type KeyboardEvent, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import {
  checkedRadioSelector,
  createRadioTilt,
  flipRadioIndicator,
  getNextRadioIndex,
  glideRadioThumb,
  placeRadioThumb,
  pulseRadio,
  radioOptionSelector
} from 'src/core/helpers/radioGroup.ts'
import type { RadioGroupHandle, RadioOption, RadioValue } from 'src/core/types/radioGroup.ts'

gsap.registerPlugin(useGSAP)

interface UseRadioGroupParams<T extends RadioValue> {
  readonly value: T | null
  readonly options: ReadonlyArray<RadioOption<T>>
  readonly disabled: boolean
  readonly onValueChange: (value: T | null) => void
}

const useRadioGroup = <T extends RadioValue>({ value, options, disabled, onValueChange }: UseRadioGroupParams<T>): RadioGroupHandle => {
  const groupRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const hasRenderedRef = useRef(false)
  const hadValueRef = useRef(false)

  const getChecked = () => groupRef.current?.querySelector<HTMLElement>(checkedRadioSelector) ?? null

  useGSAP(
    () => {
      const thumb = thumbRef.current
      if (!thumb) return

      const checked = getChecked()
      const wasVisible = hadValueRef.current
      hadValueRef.current = Boolean(checked)

      if (!hasRenderedRef.current || prefersReducedMotion()) placeRadioThumb(thumb, checked).then()
      else glideRadioThumb(thumb, checked, wasVisible).then()
    },
    { scope: groupRef, dependencies: [value] }
  )

  useGSAP(
    () => {
      const isFirstRender = !hasRenderedRef.current
      hasRenderedRef.current = true
      const checked = getChecked()
      if (!checked || prefersReducedMotion()) return

      if (!isFirstRender) flipRadioIndicator(checked).then()
      pulseRadio(checked)?.then()
    },
    { scope: groupRef, dependencies: [value], revertOnUpdate: true }
  )

  useGSAP(
    (_, contextSafe) => {
      const group = groupRef.current
      if (!group || !contextSafe || disabled || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return

      const cleanups = gsap.utils.toArray<HTMLElement>(radioOptionSelector, group).map((option) => {
        const tilt = createRadioTilt(option)
        const handleMove = contextSafe((event: PointerEvent) => tilt.move(event))
        const handleEnter = contextSafe(() => {
          if (option.getAttribute('aria-checked') !== 'true') pulseRadio(option, 0)?.then()
        })
        const handleLeave = contextSafe(() => tilt.reset())

        option.addEventListener('pointermove', handleMove)
        option.addEventListener('pointerenter', handleEnter)
        option.addEventListener('pointerleave', handleLeave)

        return () => {
          option.removeEventListener('pointermove', handleMove)
          option.removeEventListener('pointerenter', handleEnter)
          option.removeEventListener('pointerleave', handleLeave)
        }
      })

      return () => cleanups.forEach((cleanup) => cleanup())
    },
    { scope: groupRef, dependencies: [options.length, disabled], revertOnUpdate: true }
  )

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    const observer = new ResizeObserver(() => {
      const checked = group.querySelector<HTMLElement>(checkedRadioSelector)
      if (thumbRef.current && checked) placeRadioThumb(thumbRef.current, checked).then()
    })

    observer.observe(group)
    return () => observer.disconnect()
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const radios = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>(radioOptionSelector))
    const currentIndex = radios.findIndex((radio) => radio === document.activeElement)
    const nextIndex = currentIndex === -1 ? null : getNextRadioIndex(event.key, currentIndex, radios.length)
    if (nextIndex === null) return

    event.preventDefault()
    radios[nextIndex].focus()
    onValueChange(options[nextIndex].value)
  }

  return { groupRef, thumbRef, handleKeyDown }
}

export default useRadioGroup
