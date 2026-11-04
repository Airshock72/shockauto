import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import useThreeStage from 'src/core/hooks/three/useThreeStage.ts'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import { showroomFactories } from 'src/modules/applications/helpers/vehicleShowroom.ts'
import type { ApplicationCategory, ShowroomConfig } from 'src/modules/applications/types'

gsap.registerPlugin(useGSAP)

const useVehicleShowroom = (category: ApplicationCategory, config: ShowroomConfig) => {
  const isFirstApplyRef = useRef(true)
  const { containerRef, controllerRef } = useThreeStage(
    (stage, contextSafe) => showroomFactories[category](stage, contextSafe, prefersReducedMotion()),
    { fov: 30, maxPixelRatio: 1.75 }
  )

  const { paint, isMetallic, upholstery, interiorMaterial, steeringSide, doorCount, driveType, hasThirdRowSeats } = config

  useGSAP(
    () => {
      const controller = controllerRef.current
      if (!controller) return

      controller.apply(
        { paint, isMetallic, upholstery, interiorMaterial, steeringSide, doorCount, driveType, hasThirdRowSeats },
        isFirstApplyRef.current
      )
      isFirstApplyRef.current = false
    },
    { dependencies: [paint, isMetallic, upholstery, interiorMaterial, steeringSide, doorCount, driveType, hasThirdRowSeats] }
  )

  return containerRef
}

export default useVehicleShowroom
