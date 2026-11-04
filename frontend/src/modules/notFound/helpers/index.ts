import gsap from 'gsap'
import {
  BoxGeometry,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Path,
  PlaneGeometry,
  Shape,
  TorusGeometry,
  Vector3
} from 'three'
import { brandColors, createRadialTexture, createStudioEnvironment } from 'src/core/helpers/three.ts'
import type { ContextSafe, ThreeStage } from 'src/core/types/three.ts'
import type { WrongTurnController } from 'src/modules/notFound/types'

const digitScale = 1.45
const digitDepth = 0.5
const digitOffsetX = 2.05
const wheelRadius = 0.78
const wheelTube = 0.3
const wheelCenterY = wheelRadius + wheelTube
const treadCount = 28
const laneDashCount = 12
const laneDashGap = 1.6
const laneHalfLength = (laneDashCount * laneDashGap) / 2
const idleSpinSpeed = 1.6
const burnoutSpinSpeed = 26
const roadSpeedRatio = 0.6

const cameraPosition = new Vector3(0, 1.9, 9.6)
const cameraTarget = new Vector3(0, 1.05, 0)

const createFourGeometry = () => {
  const shape = new Shape()
    .moveTo(0.55, 0)
    .lineTo(0.85, 0)
    .lineTo(0.85, 0.35)
    .lineTo(1, 0.35)
    .lineTo(1, 0.6)
    .lineTo(0.85, 0.6)
    .lineTo(0.85, 1.5)
    .lineTo(0.6, 1.5)
    .lineTo(0, 0.6)
    .lineTo(0, 0.35)
    .lineTo(0.55, 0.35)
    .closePath()
  shape.holes.push(new Path().moveTo(0.55, 0.6).lineTo(0.55, 1.1).lineTo(0.24, 0.6).closePath())

  const geometry = new ExtrudeGeometry(shape, { depth: digitDepth / digitScale, bevelThickness: 0.04, bevelSize: 0.035, bevelSegments: 4 })
  geometry.scale(digitScale, digitScale, digitScale)
  geometry.translate(-digitScale / 2, 0, -digitDepth / 2)
  return geometry
}

const createWheel = (rubber: MeshStandardMaterial, chrome: MeshPhysicalMaterial, glowMaterial: MeshBasicMaterial) => {
  const spinner = new Group()
  spinner.add(new Mesh(new TorusGeometry(wheelRadius, wheelTube, 24, 64), rubber))

  for (let index = 0; index < treadCount; index++) {
    const angle = (index / treadCount) * Math.PI * 2
    const block = new Mesh(new BoxGeometry(0.12, 0.08, wheelTube * 1.5), rubber)
    block.position.set(Math.cos(angle) * (wheelRadius + wheelTube - 0.02), Math.sin(angle) * (wheelRadius + wheelTube - 0.02), 0)
    block.rotation.z = angle
    spinner.add(block)
  }

  const rim = new Mesh(new CylinderGeometry(wheelRadius - 0.04, wheelRadius - 0.04, 0.36, 48, 1, true), chrome)
  rim.rotation.x = Math.PI / 2
  const hub = new Mesh(new CylinderGeometry(0.16, 0.16, 0.42, 24), chrome)
  hub.rotation.x = Math.PI / 2
  spinner.add(rim, hub)

  for (let index = 0; index < 5; index++) {
    const spoke = new Mesh(new BoxGeometry(0.11, wheelRadius * 0.9, 0.08), chrome)
    const angle = (index / 5) * Math.PI * 2
    spoke.position.set(Math.cos(angle) * wheelRadius * 0.45, Math.sin(angle) * wheelRadius * 0.45, 0.12)
    spoke.rotation.z = angle - Math.PI / 2
    spinner.add(spoke)
  }

  const glow = new Mesh(new TorusGeometry(wheelRadius - 0.06, 0.02, 8, 64), glowMaterial)
  glow.position.z = 0.2
  spinner.add(glow)
  return spinner
}

const createCone = (orange: MeshStandardMaterial, white: MeshStandardMaterial) => {
  const cone = new Group()
  const base = new Mesh(new BoxGeometry(0.5, 0.05, 0.5), orange)
  base.position.y = 0.025
  const body = new Mesh(new ConeGeometry(0.2, 0.7, 24), orange)
  body.position.y = 0.4
  const stripe = new Mesh(new CylinderGeometry(0.11, 0.135, 0.1, 24), white)
  stripe.position.y = 0.45
  cone.add(base, body, stripe)
  return cone
}

export const createWrongTurnScene = (
  { renderer, scene, camera, container }: ThreeStage,
  contextSafe: ContextSafe,
  reducedMotion: boolean
): WrongTurnController => {
  scene.environment = createStudioEnvironment(renderer)
  scene.environmentIntensity = 0.9
  camera.position.copy(cameraPosition)
  camera.lookAt(cameraTarget)

  scene.add(new HemisphereLight('#ffffff', '#1e1b4b', 0.8))
  const keyLight = new DirectionalLight('#ffffff', 2.4)
  keyLight.position.set(3, 6, 5)
  const rimLight = new DirectionalLight(brandColors.neon, 1.6)
  rimLight.position.set(-4, 3, -5)
  scene.add(keyLight, rimLight)

  const rig = new Group()
  scene.add(rig)

  const digitMaterial = new MeshPhysicalMaterial({ color: brandColors.violet, metalness: 0.55, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.06 })
  const fourGeometry = createFourGeometry()
  const digits = [-1, 1].map((side) => {
    const digit = new Mesh(fourGeometry, digitMaterial)
    digit.position.x = side * digitOffsetX
    digit.rotation.y = -side * 0.12
    rig.add(digit)
    return digit
  })

  const glowMaterial = new MeshBasicMaterial({ color: brandColors.neon, transparent: true, opacity: 0.9 })
  const wheel = new Group()
  const spinner = createWheel(
    new MeshStandardMaterial({ color: '#16161b', roughness: 0.92 }),
    new MeshPhysicalMaterial({ color: '#d9dde6', metalness: 1, roughness: 0.18, clearcoat: 0.6 }),
    glowMaterial
  )
  wheel.add(spinner)
  wheel.position.y = wheelCenterY
  rig.add(wheel)

  const coneOrange = new MeshStandardMaterial({ color: '#ff6a1a', roughness: 0.55, emissive: '#ff4d00', emissiveIntensity: 0.15 })
  const coneWhite = new MeshStandardMaterial({ color: '#ffffff', roughness: 0.4 })
  const cones = [-1, 1].map((side) => {
    const cone = createCone(coneOrange, coneWhite)
    cone.position.set(side * 3.55, 0, 0.6)
    cone.rotation.y = side * 0.4
    rig.add(cone)
    return cone
  })

  const shadow = new Mesh(
    new PlaneGeometry(9, 2.6),
    new MeshBasicMaterial({ map: createRadialTexture('rgba(0,0,0,0.6)'), transparent: true, depthWrite: false })
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.002
  const dashMaterial = new MeshBasicMaterial({ color: brandColors.neon, transparent: true, opacity: 0.55, depthWrite: false })
  const dashes = Array.from({ length: laneDashCount }, (_, index) => {
    const dash = new Mesh(new PlaneGeometry(0.8, 0.06), dashMaterial)
    dash.rotation.x = -Math.PI / 2
    dash.position.set(index * laneDashGap - laneHalfLength, 0.001, 1.25)
    rig.add(dash)
    return dash
  })
  rig.add(shadow)

  const motion = { spin: reducedMotion ? 0 : idleSpinSpeed }

  if (!reducedMotion) {
    gsap.timeline()
      .from(digits.map(({ position }) => position), { y: 4, duration: 1.1, ease: 'bounce.out', stagger: 0.18 })
      .from(wheel.position, { x: -7, duration: 1.4, ease: 'power3.out' }, 0.2)
      .from(spinner.rotation, { z: 14, duration: 1.4, ease: 'power3.out' }, '<')
      .from(cones.map(({ scale }) => scale), { x: 0, y: 0, z: 0, duration: 0.6, ease: 'back.out(2.5)', stagger: 0.1 }, 0.9)
      .from(dashMaterial, { opacity: 0, duration: 0.8 }, 0.4).then()

    digits.forEach((digit, index) => {
      gsap.to(digit.rotation, { x: 0.06, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.4 + index * 0.6 }).then()
    })
    gsap.to(glowMaterial, { opacity: 0.35, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true }).then()
  }

  const burnout = contextSafe(() => {
    if (reducedMotion) return

    gsap.timeline()
      .to(motion, { spin: burnoutSpinSpeed, duration: 0.3, ease: 'power3.out' })
      .to(motion, { spin: idleSpinSpeed, duration: 1.8, ease: 'power2.inOut' })
      .to(wheel.position, { keyframes: { y: [wheelCenterY, wheelCenterY + 0.12, wheelCenterY] }, duration: 0.4, ease: 'sine.inOut' }, 0)
      .to(digits.map(({ position }) => position), { keyframes: { y: [0, 0.45, 0] }, duration: 0.7, ease: 'power2.out', stagger: 0.12 }, 0.1)
      .to(cones.map(({ rotation }) => rotation), { keyframes: { z: [0, 0.6, -0.15, 0] }, duration: 1.1, ease: 'power2.out', stagger: 0.08 }, 0.15).then()
  })

  const tiltX = gsap.quickTo(rig.rotation, 'x', { duration: 0.9, ease: 'power3.out' })
  const tiltY = gsap.quickTo(rig.rotation, 'y', { duration: 0.9, ease: 'power3.out' })

  const handlePointerMove = contextSafe((event: PointerEvent) => {
    if (reducedMotion) return

    const bounds = container.getBoundingClientRect()
    tiltY(((event.clientX - bounds.left) / bounds.width - 0.5) * 0.5).then()
    tiltX(((event.clientY - bounds.top) / bounds.height - 0.5) * 0.16).then()
  })

  const handlePointerLeave = contextSafe(() => {
    tiltX(0).then()
    tiltY(0).then()
  })

  container.addEventListener('pointerdown', burnout)
  container.addEventListener('pointermove', handlePointerMove)
  container.addEventListener('pointerleave', handlePointerLeave)

  const onFrame = (delta: number) => {
    spinner.rotation.z -= motion.spin * delta
    const travel = motion.spin * roadSpeedRatio * delta
    dashes.forEach((dash) => {
      dash.position.x -= travel
      if (dash.position.x < -laneHalfLength) dash.position.x += laneDashCount * laneDashGap
    })
  }

  const dispose = () => {
    container.removeEventListener('pointerdown', burnout)
    container.removeEventListener('pointermove', handlePointerMove)
    container.removeEventListener('pointerleave', handlePointerLeave)
  }

  return { onFrame, dispose }
}
