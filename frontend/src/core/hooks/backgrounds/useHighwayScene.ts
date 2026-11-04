import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import useTheme from 'src/core/hooks/useTheme.ts'
import useThreeStage from 'src/core/hooks/three/useThreeStage.ts'
import { createHighway } from 'src/core/helpers/highwayBackdrop.ts'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const useHighwayScene = () => {
  const { resolvedTheme } = useTheme()
  const isInitialRef = useRef(true)
  const { containerRef, controllerRef } = useThreeStage(
    (stage, contextSafe) => createHighway(stage, contextSafe, prefersReducedMotion()),
    { fov: 60, far: 120, maxPixelRatio: 1.25 }
  )

  useGSAP(
    () => {
      controllerRef.current?.setTheme(resolvedTheme, isInitialRef.current)
      isInitialRef.current = false
    },
    { dependencies: [resolvedTheme] }
  )

  return containerRef
}

export default useHighwayScene
