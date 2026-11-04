import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import { radioOptionSelector } from 'src/core/helpers/radioGroup.ts'
import { materialAnimations } from 'src/modules/applications/helpers/materialSwatch.ts'
import type { InteriorMaterial } from 'src/modules/applications/types'

gsap.registerPlugin(useGSAP)

const loopDelay = 0.8

const useMaterialSwatch = (material: InteriorMaterial, checked: boolean) => {
  const swatchRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    (_, contextSafe) => {
      const swatch = swatchRef.current
      if (!swatch || !contextSafe || prefersReducedMotion()) return

      const timeline = materialAnimations[material](swatch)

      if (checked) {
        timeline.repeat(-1).repeatDelay(loopDelay).play(0).then()
        return
      }

      timeline.pause(0).then()
      const option = swatch.closest(radioOptionSelector)
      if (!option) return

      const handleEnter = contextSafe(() => timeline.restart())
      option.addEventListener('pointerenter', handleEnter)
      return () => option.removeEventListener('pointerenter', handleEnter)
    },
    { scope: swatchRef, dependencies: [material, checked], revertOnUpdate: true }
  )

  return swatchRef
}

export default useMaterialSwatch
