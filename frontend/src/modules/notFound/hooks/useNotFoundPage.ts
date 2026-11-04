import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import useThreeStage from 'src/core/hooks/three/useThreeStage.ts'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import { createWrongTurnScene } from 'src/modules/notFound/helpers'

gsap.registerPlugin(useGSAP)

const useNotFoundPage = () => {
  const pageRef = useRef<HTMLElement>(null)
  const { containerRef: sceneRef } = useThreeStage(
    (stage, contextSafe) => createWrongTurnScene(stage, contextSafe, prefersReducedMotion()),
    { fov: 32, maxPixelRatio: 1.75 }
  )

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('[data-reveal]', { opacity: 0, y: 14, filter: 'blur(6px)', duration: 0.7, delay: 0.5, stagger: 0.1, ease: 'expo.out' }).then()
    },
    { scope: pageRef }
  )

  return { pageRef, sceneRef }
}

export default useNotFoundPage
