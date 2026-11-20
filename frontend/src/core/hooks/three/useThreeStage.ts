import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ACESFilmicToneMapping, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { disposeObject, isWebGLAvailable } from 'src/core/helpers/three.ts'
import type { ThreeStageController, ThreeStageHandle, ThreeStageOptions, ThreeStageSetup } from 'src/core/types/three.ts'

gsap.registerPlugin(useGSAP)

const useThreeStage = <TController extends ThreeStageController>(
  setup: ThreeStageSetup<TController>,
  { fov = 35, near = 0.1, far = 100, maxPixelRatio = 2, antialias = true }: ThreeStageOptions = {}
): ThreeStageHandle<TController> => {
  const containerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<TController>(null)

  useGSAP(
    (_, contextSafe) => {
      const container = containerRef.current
      if (!container || !contextSafe || !isWebGLAvailable()) return

      let renderer: WebGLRenderer
      try {
        renderer = new WebGLRenderer({ antialias, alpha: true, powerPreference: 'high-performance' })
      } catch (error) {
        console.warn('WebGL renderer could not be created', error)
        return
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio))
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping = ACESFilmicToneMapping
      renderer.domElement.className = 'block size-full'
      container.appendChild(renderer.domElement)

      const scene = new Scene()
      const camera = new PerspectiveCamera(fov, 1, near, far)
      const controller = setup({ renderer, scene, camera, container }, contextSafe)
      controllerRef.current = controller

      const resize = () => {
        const { clientWidth: width, clientHeight: height } = container
        if (!width || !height) return

        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      let isVisible = true
      const resizeObserver = new ResizeObserver(resize)
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting
      })
      resizeObserver.observe(container)
      visibilityObserver.observe(container)
      resize()

      const render = (_time: number, deltaTime: number) => {
        if (!isVisible) return

        controller.onFrame?.(deltaTime / 1000)
        renderer.render(scene, camera)
      }
      gsap.ticker.add(render)

      return () => {
        gsap.ticker.remove(render)
        resizeObserver.disconnect()
        visibilityObserver.disconnect()
        controllerRef.current = null
        controller.dispose?.()
        disposeObject(scene)
        scene.environment?.dispose()
        renderer.dispose()
        renderer.forceContextLoss()
        renderer.domElement.remove()
      }
    },
    { scope: containerRef }
  )

  return { containerRef, controllerRef }
}

export default useThreeStage
