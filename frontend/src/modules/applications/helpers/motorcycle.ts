import gsap from 'gsap'
import {
  BoxGeometry,
  CapsuleGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3
} from 'three'
import { brandColors, placeBetween } from 'src/core/helpers/three.ts'
import { createTurntableStage } from 'src/modules/applications/helpers/turntableStage.ts'
import { applyPaint, createPaintMaterial, hasPaintChanged } from 'src/modules/applications/helpers/vehiclePaint.ts'
import type { ShowroomConfig, ShowroomFactory } from 'src/modules/applications/types'

const wheelBase = 0.72
const wheelCenterY = 0.33
const tireRadius = 0.255
const steeringHead = new Vector3(0.5, 1.0, 0)
const swingarmPivot = new Vector3(-0.22, 0.44, 0)
const mufflerEnd = new Vector3(-0.78, 0.6, 0.17)
const idleWheelSpeed = 3
const revWheelSpeed = 22
const exhaustPuffCount = 6

const cameraPosition = new Vector3(3.5, 1.7, 4.1)
const cameraTarget = new Vector3(0, 0.58, 0)

interface MotorcycleMaterials {
  readonly paint: MeshPhysicalMaterial
  readonly chrome: MeshPhysicalMaterial
  readonly frame: MeshPhysicalMaterial
  readonly rubber: MeshStandardMaterial
  readonly leather: MeshPhysicalMaterial
}

const createTube = (points: Array<Vector3>, radius: number, material: MeshPhysicalMaterial) =>
  new Mesh(new TubeGeometry(new CatmullRomCurve3(points), 48, radius, 10), material)

const createRod = (from: Vector3, to: Vector3, radius: number, material: MeshPhysicalMaterial) =>
  placeBetween(new Mesh(new CylinderGeometry(radius, radius, 1, 12), material), from, to)

const createWheel = (x: number, hasDisc: boolean, { chrome, rubber }: MotorcycleMaterials) => {
  const wheel = new Group()
  const spinner = new Group()

  const tire = new Mesh(new TorusGeometry(tireRadius, 0.075, 16, 48), rubber)
  const rim = new Mesh(new TorusGeometry(tireRadius - 0.07, 0.016, 8, 48), chrome)
  const hub = new Mesh(new CylinderGeometry(0.045, 0.045, 0.14, 16), chrome)
  hub.rotation.x = Math.PI / 2
  spinner.add(tire, rim, hub)

  for (let index = 0; index < 6; index++) {
    const spoke = new Mesh(new BoxGeometry(0.022, tireRadius * 1.7, 0.014), chrome)
    spoke.rotation.z = (index / 6) * Math.PI
    spinner.add(spoke)
  }

  if (hasDisc) {
    const disc = new Mesh(new CylinderGeometry(0.13, 0.13, 0.008, 32), chrome)
    disc.rotation.x = Math.PI / 2
    disc.position.z = 0.06
    spinner.add(disc)
  }

  wheel.add(spinner)
  wheel.position.set(x, wheelCenterY, 0)
  return { wheel, spinner }
}

export const createMotorcycleShowroom: ShowroomFactory = (stage, contextSafe, reducedMotion) => {
  const { model: bike, dispose } = createTurntableStage(stage, contextSafe, reducedMotion, { cameraPosition, cameraTarget, radius: 1.55 })

  const materials: MotorcycleMaterials = {
    paint: createPaintMaterial(),
    chrome: new MeshPhysicalMaterial({ color: '#d7dbe3', metalness: 1, roughness: 0.16, clearcoat: 0.6 }),
    frame: new MeshPhysicalMaterial({ color: brandColors.graphite, metalness: 0.8, roughness: 0.35, clearcoat: 0.4 }),
    rubber: new MeshStandardMaterial({ color: '#131317', roughness: 0.9 }),
    leather: new MeshPhysicalMaterial({ color: '#17171c', roughness: 0.5, clearcoat: 0.25 })
  }

  const front = createWheel(wheelBase, true, materials)
  const rear = createWheel(-wheelBase, false, materials)
  const chassis = new Group()
  bike.add(front.wheel, rear.wheel, chassis)

  const frontAxle = new Vector3(wheelBase, wheelCenterY, 0)
  for (const side of [-1, 1]) {
    chassis.add(createRod(steeringHead.clone().setZ(side * 0.08), frontAxle.clone().setZ(side * 0.08), 0.022, materials.chrome))
    chassis.add(createRod(swingarmPivot.clone().setZ(side * 0.08), new Vector3(-wheelBase, wheelCenterY, side * 0.08), 0.02, materials.frame))
  }

  const handlebar = createRod(new Vector3(0.44, 1.14, -0.32), new Vector3(0.44, 1.14, 0.32), 0.014, materials.chrome)
  const riser = createRod(steeringHead, new Vector3(0.44, 1.14, 0), 0.02, materials.frame)
  chassis.add(handlebar, riser)

  for (const side of [-1, 1]) {
    const grip = new Mesh(new CylinderGeometry(0.02, 0.02, 0.1, 12), materials.rubber)
    grip.rotation.x = Math.PI / 2
    grip.position.set(0.44, 1.14, side * 0.3)
    chassis.add(grip)
  }

  const cowl = new Mesh(new SphereGeometry(0.15, 24, 16), materials.paint)
  cowl.scale.set(1.1, 0.85, 0.9)
  cowl.position.set(0.6, 1.0, 0)
  const headlight = new Mesh(
    new CylinderGeometry(0.075, 0.075, 0.04, 24),
    new MeshStandardMaterial({ color: '#ffffff', emissive: '#dff4ff', emissiveIntensity: 2.2 })
  )
  headlight.rotation.z = Math.PI / 2
  headlight.position.set(0.74, 0.99, 0)
  chassis.add(cowl, headlight)

  chassis.add(
    createTube([steeringHead, new Vector3(0.15, 0.62, 0.11), swingarmPivot.clone().setZ(0.11)], 0.024, materials.frame),
    createTube([steeringHead, new Vector3(0.15, 0.62, -0.11), swingarmPivot.clone().setZ(-0.11)], 0.024, materials.frame),
    createTube([steeringHead, new Vector3(0.05, 0.9, 0), new Vector3(-0.62, 0.84, 0)], 0.026, materials.frame)
  )

  const tank = new Mesh(new SphereGeometry(1, 32, 20), materials.paint)
  tank.scale.set(0.3, 0.15, 0.19)
  tank.position.set(0.2, 0.96, 0)
  const seat = new Mesh(new CapsuleGeometry(0.075, 0.4, 6, 16), materials.leather)
  seat.rotation.z = Math.PI / 2 - 0.08
  seat.scale.z = 1.6
  seat.position.set(-0.28, 0.9, 0)
  const tail = new Mesh(new BoxGeometry(0.34, 0.07, 0.16), materials.paint)
  tail.rotation.z = 0.22
  tail.position.set(-0.6, 0.93, 0)
  const taillight = new Mesh(new BoxGeometry(0.02, 0.04, 0.12), new MeshStandardMaterial({ color: '#ff1f3d', emissive: '#ff1f3d', emissiveIntensity: 1.8 }))
  taillight.position.set(-0.77, 0.97, 0)
  chassis.add(tank, seat, tail, taillight)

  const engine = new Group()
  const crankcase = new Mesh(new BoxGeometry(0.34, 0.24, 0.24), materials.frame)
  engine.add(crankcase)
  for (let index = 0; index < 4; index++) {
    const fin = new Mesh(new BoxGeometry(0.26, 0.016, 0.28), materials.chrome)
    fin.position.y = 0.15 + index * 0.035
    engine.add(fin)
  }
  const engineGlow = new Mesh(
    new BoxGeometry(0.2, 0.02, 0.3),
    new MeshBasicMaterial({ color: brandColors.neon, transparent: true, opacity: 0.6 })
  )
  engineGlow.position.y = 0.3
  engine.add(engineGlow)
  engine.position.set(0.05, 0.56, 0)
  engine.rotation.z = -0.12

  const exhaust = createTube([new Vector3(0.18, 0.48, 0.12), new Vector3(0.05, 0.32, 0.16), new Vector3(-0.35, 0.38, 0.17), mufflerEnd], 0.028, materials.chrome)
  const muffler = createRod(new Vector3(-0.45, 0.47, 0.17), mufflerEnd, 0.05, materials.chrome)
  chassis.add(engine, exhaust, muffler)

  const puffs = Array.from({ length: exhaustPuffCount }, () => {
    const puff = new Mesh(new SphereGeometry(0.05, 12, 8), new MeshBasicMaterial({ color: '#c7cbe0', transparent: true, opacity: 0, depthWrite: false }))
    puff.position.copy(mufflerEnd)
    bike.add(puff)
    return puff
  })

  const idleSpeed = reducedMotion ? 0 : idleWheelSpeed
  const wheelState = { speed: idleSpeed }

  if (!reducedMotion) {
    gsap.to(chassis.position, { y: 0.012, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true }).then()
    gsap.to(engineGlow.material, { opacity: 0.15, duration: 1.1, ease: 'sine.inOut', repeat: -1, yoyo: true }).then()
  }

  const emitExhaust = () => {
    puffs.forEach((puff, index) => {
      gsap.timeline({ delay: index * 0.07 })
        .set(puff.position, { x: mufflerEnd.x, y: mufflerEnd.y, z: mufflerEnd.z })
        .fromTo(puff.scale, { x: 0.4, y: 0.4, z: 0.4 }, { x: 2.4, y: 2.4, z: 2.4, duration: 0.9, ease: 'power2.out' })
        .fromTo(puff.material, { opacity: 0.55 }, { opacity: 0, duration: 0.9, ease: 'power2.out' }, '<')
        .to(puff.position, { x: mufflerEnd.x - 0.5 - index * 0.06, y: mufflerEnd.y + 0.18, duration: 0.9, ease: 'power2.out' }, '<').then()
    })
  }

  const rev = () => {
    gsap.timeline()
      .to(wheelState, { speed: revWheelSpeed, duration: 0.25, ease: 'power3.out' })
      .to(wheelState, { speed: idleSpeed, duration: 1.4, ease: 'power2.inOut' })
      .to(bike.rotation, { keyframes: { z: [0, 0.09, -0.015, 0] }, duration: 1.1, ease: 'power2.out' }, 0)
      .to(headlight.material, { keyframes: { emissiveIntensity: [2.2, 5, 2.2] }, duration: 0.5 }, 0)
      .call(emitExhaust, [], 0.05).then()
  }

  let current: ShowroomConfig | null = null

  const apply = contextSafe((config: ShowroomConfig, immediate: boolean) => {
    const previous = current
    current = config
    const duration = immediate || reducedMotion ? 0 : 0.8

    if (!hasPaintChanged(previous, config)) return
    applyPaint(materials.paint, config, duration)
    if (duration > 0) rev()
  })

  const onFrame = (delta: number) => {
    front.spinner.rotation.z -= idleSpeed * delta
    rear.spinner.rotation.z -= wheelState.speed * delta
  }

  return { apply, onFrame, dispose }
}
