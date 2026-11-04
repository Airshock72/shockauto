import gsap from 'gsap'
import {
  BoxGeometry,
  CircleGeometry,
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
import { brandColors, createStudioEnvironment, tweenColor } from 'src/core/helpers/three.ts'
import type { ContextSafe, ThreeStage, ThreeStageController } from 'src/core/types/three.ts'

const spokePairs = 5
const treadBlocks = 44
const lugNuts = 5
const idleSpeed = 1.6
const revSpeed = 16
const tiltLimit = 0.45
const hotColor = '#ff4d7a'

export interface AlloyWheelController extends ThreeStageController {
  readonly onFrame: (delta: number) => void
  readonly dispose: () => void
}

const createTire = (rubber: MeshStandardMaterial) => {
  const tire = new Group()
  tire.add(new Mesh(new TorusGeometry(0.9, 0.27, 24, 72), rubber))

  for (let index = 0; index < treadBlocks; index++) {
    const angle = (index / treadBlocks) * Math.PI * 2
    const block = new Mesh(new BoxGeometry(0.08, 0.06, 0.42), rubber)
    block.position.set(Math.cos(angle) * 1.16, Math.sin(angle) * 1.16, 0)
    block.rotation.z = angle
    tire.add(block)
  }

  return tire
}

const createRim = (alloy: MeshPhysicalMaterial, accent: MeshBasicMaterial) => {
  const rim = new Group()

  const barrel = new Mesh(new CylinderGeometry(0.66, 0.66, 0.44, 64, 1, true), alloy)
  barrel.rotation.x = Math.PI / 2
  const lip = new Mesh(new TorusGeometry(0.67, 0.035, 12, 72), alloy)
  lip.position.z = 0.22
  rim.add(barrel, lip)

  for (let index = 0; index < spokePairs * 2; index++) {
    const pairAngle = (Math.floor(index / 2) / spokePairs) * Math.PI * 2
    const angle = pairAngle + (index % 2 === 0 ? -0.11 : 0.11)
    const spoke = new Mesh(new BoxGeometry(0.5, 0.075, 0.06), alloy)
    spoke.position.set(Math.cos(angle) * 0.41, Math.sin(angle) * 0.41, 0.15)
    spoke.rotation.set(0, -0.12, angle)
    rim.add(spoke)
  }

  const hub = new Mesh(new CylinderGeometry(0.18, 0.2, 0.14, 40), alloy)
  hub.rotation.x = Math.PI / 2
  hub.position.z = 0.17
  rim.add(hub)

  for (let index = 0; index < lugNuts; index++) {
    const angle = (index / lugNuts) * Math.PI * 2
    const nut = new Mesh(new CylinderGeometry(0.024, 0.024, 0.05, 6), alloy)
    nut.rotation.x = Math.PI / 2
    nut.position.set(Math.cos(angle) * 0.11, Math.sin(angle) * 0.11, 0.25)
    rim.add(nut)
  }

  const emblem = new Mesh(new CircleGeometry(0.06, 32), accent)
  emblem.position.z = 0.245
  rim.add(emblem)

  return rim
}

const createBrake = (disc: MeshPhysicalMaterial, caliperPaint: MeshPhysicalMaterial) => {
  const rotor = new Mesh(new CylinderGeometry(0.56, 0.56, 0.05, 64), disc)
  rotor.rotation.x = Math.PI / 2
  rotor.position.z = -0.06

  const caliper = new Mesh(new BoxGeometry(0.2, 0.46, 0.18), caliperPaint)
  caliper.position.set(Math.cos(0.6) * 0.5, Math.sin(0.6) * 0.5, 0)
  caliper.rotation.z = 0.6

  return { rotor, caliper }
}

export const createAlloyWheel = ({ renderer, scene, camera, container }: ThreeStage, contextSafe: ContextSafe, reducedMotion: boolean): AlloyWheelController => {
  scene.environment = createStudioEnvironment(renderer)
  camera.position.set(0, 0, 5.2)
  camera.lookAt(0, 0, 0)

  scene.add(new HemisphereLight('#ffffff', '#1e1b4b', 0.6))
  const keyLight = new DirectionalLight('#ffffff', 2.4)
  keyLight.position.set(3, 4, 5)
  const rimLight = new DirectionalLight(brandColors.neon, 2)
  rimLight.position.set(-4, -1, -2)
  scene.add(keyLight, rimLight)

  const rubber = new MeshStandardMaterial({ color: '#15151a', roughness: 0.92 })
  const alloy = new MeshPhysicalMaterial({ color: '#d4d7e0', metalness: 1, roughness: 0.18, clearcoat: 0.7, clearcoatRoughness: 0.1 })
  const disc = new MeshPhysicalMaterial({ color: '#8d919c', metalness: 1, roughness: 0.42 })
  const caliperPaint = new MeshPhysicalMaterial({ color: brandColors.violet, roughness: 0.3, clearcoat: 1, emissive: brandColors.violet, emissiveIntensity: 0.15 })
  const accent = new MeshBasicMaterial({ color: brandColors.neon })

  const assembly = new Group()
  const roller = new Group()
  const spinner = new Group()
  const { rotor, caliper } = createBrake(disc, caliperPaint)
  spinner.add(createTire(rubber), createRim(alloy, accent), rotor)
  roller.add(spinner, caliper)
  assembly.add(roller)
  assembly.rotation.y = -0.5
  scene.add(assembly)

  const motion = { speed: reducedMotion ? 0 : idleSpeed }

  if (!reducedMotion) {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from(roller.position, { x: 6, duration: 1.6 })
      .from(spinner.rotation, { z: -Math.PI * 4, duration: 1.6 }, 0)
      .from(roller.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 1.2, ease: 'back.out(1.6)' }, 0.4)
      .to(roller.position, { keyframes: { y: [0, -0.08, 0.03, 0] }, duration: 0.6, ease: 'sine.inOut' }, 1.3)
      .to(caliperPaint, { emissiveIntensity: 0.6, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true }).then()
  }

  const tiltX = gsap.quickTo(assembly.rotation, 'x', { duration: 0.9, ease: 'power3.out' })
  const tiltY = gsap.quickTo(assembly.rotation, 'y', { duration: 0.9, ease: 'power3.out' })

  const handlePointerMove = contextSafe((event: PointerEvent) => {
    const bounds = container.getBoundingClientRect()
    tiltY(-0.5 + ((event.clientX - bounds.left) / bounds.width - 0.5) * tiltLimit * 2).then()
    tiltX(((event.clientY - bounds.top) / bounds.height - 0.5) * tiltLimit).then()
  })

  const handlePointerEnter = contextSafe(() => {
    gsap.to(motion, { speed: revSpeed, duration: 1.2, ease: 'power2.in', overwrite: 'auto' }).then()
    tweenColor(accent.color, hotColor, { duration: 0.8 }).then()
  })

  const handlePointerLeave = contextSafe(() => {
    tiltX(0).then()
    tiltY(-0.5).then()
    gsap.to(motion, { speed: idleSpeed, duration: 2.4, ease: 'power3.out', overwrite: 'auto' }).then()
    tweenColor(accent.color, brandColors.neon, { duration: 1.2 }).then()
  })

  if (!reducedMotion) {
    container.addEventListener('pointermove', handlePointerMove)
    container.addEventListener('pointerenter', handlePointerEnter)
    container.addEventListener('pointerleave', handlePointerLeave)
  }

  const onFrame = (delta: number) => {
    spinner.rotation.z -= motion.speed * delta
  }

  const dispose = () => {
    container.removeEventListener('pointermove', handlePointerMove)
    container.removeEventListener('pointerenter', handlePointerEnter)
    container.removeEventListener('pointerleave', handlePointerLeave)
  }

  return { onFrame, dispose }
}
