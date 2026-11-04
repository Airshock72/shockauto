import gsap from 'gsap'
import {
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PlaneGeometry,
  TorusGeometry
} from 'three'
import { brandColors, createRadialTexture, createStudioEnvironment } from 'src/core/helpers/three.ts'
import type { ContextSafe, ThreeStage } from 'src/core/types/three.ts'
import type { TurntableOptions, TurntableStage } from 'src/modules/applications/types'

const turntableDuration = 26
const dragSensitivity = 0.012

export const createTurntableStage = (
  { renderer, scene, camera, container }: ThreeStage,
  contextSafe: ContextSafe,
  reducedMotion: boolean,
  { cameraPosition, cameraTarget, radius }: TurntableOptions
): TurntableStage => {
  scene.environment = createStudioEnvironment(renderer)
  scene.environmentIntensity = 0.85
  camera.position.copy(cameraPosition)
  camera.lookAt(cameraTarget)

  scene.add(new HemisphereLight('#ffffff', '#1e1b4b', 0.7))
  const keyLight = new DirectionalLight('#ffffff', 2.2)
  keyLight.position.set(4, 6, 3)
  const rimLight = new DirectionalLight(brandColors.neon, 1.4)
  rimLight.position.set(-5, 2.5, -4)
  scene.add(keyLight, rimLight)

  const stageRig = new Group()
  const spinRig = new Group()
  const dragRig = new Group()
  const model = new Group()
  stageRig.add(spinRig)
  spinRig.add(dragRig)
  dragRig.add(model)
  scene.add(stageRig)

  const platform = new Mesh(
    new CylinderGeometry(radius, radius + 0.08, 0.08, 72),
    new MeshPhysicalMaterial({ color: brandColors.graphite, metalness: 0.7, roughness: 0.35, clearcoat: 0.6 })
  )
  platform.position.y = -0.04
  const ring = new Mesh(
    new TorusGeometry(radius + 0.02, 0.018, 8, 120),
    new MeshBasicMaterial({ color: brandColors.neon, transparent: true, opacity: 0.85 })
  )
  ring.rotation.x = Math.PI / 2
  const shadow = new Mesh(
    new PlaneGeometry(radius * 2.1, radius * 1.2),
    new MeshBasicMaterial({ map: createRadialTexture('rgba(0,0,0,0.75)'), transparent: true, depthWrite: false })
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.004
  spinRig.add(platform, ring)
  dragRig.add(shadow)

  const turntable = reducedMotion
    ? null
    : gsap.to(spinRig.rotation, { y: `+=${Math.PI * 2}`, duration: turntableDuration, ease: 'none', repeat: -1 })

  if (!reducedMotion) {
    gsap.timeline()
      .from(model.position, { y: 1.6, duration: 1.1, ease: 'bounce.out' })
      .from(model.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 0.9, ease: 'back.out(1.8)' }, 0)
      .from(ring.material, { opacity: 0, duration: 1.2, ease: 'power2.out' }, 0)
      .from(spinRig.rotation, { y: -Math.PI * 0.6, duration: 1.6, ease: 'power3.out' }, 0)
      .to(ring.material, { opacity: 0.35, duration: 1.6, ease: 'sine.inOut', repeat: -1, yoyo: true }).then()
  }

  const tiltX = gsap.quickTo(stageRig.rotation, 'x', { duration: 0.8, ease: 'power3.out' })
  const tiltY = gsap.quickTo(stageRig.rotation, 'y', { duration: 0.8, ease: 'power3.out' })
  const dragTo = gsap.quickTo(dragRig.rotation, 'y', { duration: 0.6, ease: 'power3.out' })
  let dragStartX: number | null = null
  let dragStartRotation = 0

  const handlePointerDown = contextSafe((event: PointerEvent) => {
    dragStartX = event.clientX
    dragStartRotation = dragRig.rotation.y
    container.setPointerCapture(event.pointerId)
    if (turntable) gsap.to(turntable, { timeScale: 0, duration: 0.4, overwrite: 'auto' }).then()
  })

  const handlePointerMove = contextSafe((event: PointerEvent) => {
    if (dragStartX !== null) {
      dragTo(dragStartRotation + (event.clientX - dragStartX) * dragSensitivity).then()
      return
    }
    if (reducedMotion) return

    const bounds = container.getBoundingClientRect()
    tiltY(((event.clientX - bounds.left) / bounds.width - 0.5) * 0.3).then()
    tiltX(((event.clientY - bounds.top) / bounds.height - 0.5) * 0.12).then()
  })

  const handlePointerUp = contextSafe((event: PointerEvent) => {
    if (dragStartX === null) return

    dragStartX = null
    if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId)
    if (turntable) gsap.to(turntable, { timeScale: 1, duration: 1.2, ease: 'power2.in', overwrite: 'auto' }).then()
  })

  const handlePointerLeave = contextSafe(() => {
    tiltX(0).then()
    tiltY(0).then()
  })

  container.addEventListener('pointerdown', handlePointerDown)
  container.addEventListener('pointermove', handlePointerMove)
  container.addEventListener('pointerup', handlePointerUp)
  container.addEventListener('pointercancel', handlePointerUp)
  container.addEventListener('pointerleave', handlePointerLeave)

  const dispose = () => {
    container.removeEventListener('pointerdown', handlePointerDown)
    container.removeEventListener('pointermove', handlePointerMove)
    container.removeEventListener('pointerup', handlePointerUp)
    container.removeEventListener('pointercancel', handlePointerUp)
    container.removeEventListener('pointerleave', handlePointerLeave)
  }

  return { model, dispose }
}
