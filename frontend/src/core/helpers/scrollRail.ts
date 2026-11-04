import gsap from 'gsap'
import {
  BoxGeometry,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  TorusGeometry
} from 'three'
import { brandColors, createStudioEnvironment } from 'src/core/helpers/three.ts'
import type { ContextSafe, ThreeStage } from 'src/core/types/three.ts'
import type { ScrollWheelController, ScrollWheelOptions } from 'src/core/types/scrollRail.ts'

const spokeCount = 5
const fullGlowSpeed = 1400

export const getMaxScroll = () => document.documentElement.scrollHeight - window.innerHeight

export const createScrollWheel = (
  { renderer, scene, camera, container }: ThreeStage,
  _contextSafe: ContextSafe,
  { getTravel, reducedMotion }: ScrollWheelOptions
): ScrollWheelController => {
  scene.environment = createStudioEnvironment(renderer)
  camera.position.set(0, 0, 4.4)
  camera.lookAt(0, 0, 0)
  scene.add(new HemisphereLight('#ffffff', '#1e1b4b', 0.8))
  const keyLight = new DirectionalLight('#ffffff', 2.2)
  keyLight.position.set(2, 3, 4)
  scene.add(keyLight)

  const rubber = new MeshStandardMaterial({ color: '#16161b', roughness: 0.9 })
  const alloy = new MeshPhysicalMaterial({ color: '#dfe3ea', metalness: 1, roughness: 0.18, clearcoat: 0.6 })
  const glowMaterial = new MeshBasicMaterial({ color: brandColors.neon, transparent: true, opacity: 0 })

  const wheel = new Group()
  const spinner = new Group()
  const tire = new Mesh(new TorusGeometry(0.78, 0.26, 20, 48), rubber)
  const rim = new Mesh(new CylinderGeometry(0.55, 0.55, 0.3, 40), alloy)
  rim.rotation.x = Math.PI / 2
  const hub = new Mesh(new CylinderGeometry(0.16, 0.16, 0.36, 20), new MeshPhysicalMaterial({ color: brandColors.violet, roughness: 0.3, clearcoat: 1 }))
  hub.rotation.x = Math.PI / 2
  spinner.add(tire, rim, hub)

  for (let index = 0; index < spokeCount; index++) {
    const angle = (index / spokeCount) * Math.PI * 2
    const spoke = new Mesh(new BoxGeometry(0.12, 0.42, 0.08), rubber)
    spoke.position.set(Math.cos(angle) * 0.34, Math.sin(angle) * 0.34, 0.16)
    spoke.rotation.z = angle - Math.PI / 2
    spinner.add(spoke)
  }

  const glow = new Mesh(new TorusGeometry(0.62, 0.04, 8, 48), glowMaterial)
  glow.position.z = 0.17
  spinner.add(glow)
  wheel.add(spinner)
  scene.add(wheel)

  if (!reducedMotion) {
    gsap.from(wheel.scale, { x: 0, y: 0, z: 0, duration: 0.9, delay: 0.3, ease: 'back.out(2)' }).then()
  }

  const setLean = gsap.quickTo(wheel.rotation, 'y', { duration: 0.5, ease: 'power3.out' })
  const setGlow = gsap.quickTo(glowMaterial, 'opacity', { duration: 0.4, ease: 'power2.out' })
  let lastTravel = getTravel()

  const onFrame = (delta: number) => {
    const travel = getTravel()
    const radius = container.clientHeight / 2 || 1
    spinner.rotation.z = -travel / radius

    if (reducedMotion || delta <= 0) return

    const speed = (travel - lastTravel) / delta
    lastTravel = travel
    const intensity = gsap.utils.clamp(0, 1, Math.abs(speed) / fullGlowSpeed)
    setGlow(0.25 + intensity * 0.75).then()
    setLean(Math.sign(speed) * intensity * 0.7).then()
  }

  return { onFrame }
}
