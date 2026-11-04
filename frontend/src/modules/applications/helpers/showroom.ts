import gsap from 'gsap'
import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Shape,
  TorusGeometry,
  Vector3
} from 'three'
import { brandColors, clearObject, tweenColor } from 'src/core/helpers/three.ts'
import { createTurntableStage } from 'src/modules/applications/helpers/turntableStage.ts'
import { applyPaint, createPaintMaterial, hasPaintChanged } from 'src/modules/applications/helpers/vehiclePaint.ts'
import {
  type CabinProfile,
  DoorCount,
  DriveType,
  InteriorMaterial,
  type ShowroomConfig,
  type ShowroomFactory,
  SteeringSide,
  type UpholsteryFinish
} from 'src/modules/applications/types'

const bodyWidth = 1.7
const bodyBevel = 0.06
const cabinWidth = 1.42
const cabinBase = 0.9
const wheelBase = 1.32
const wheelTrack = 0.82
const wheelCenterY = 0.36
const archRadius = 0.43
const turntableRadius = 2.6
const wheelSpinSpeed = 14

const cameraPosition = new Vector3(5.4, 2.5, 6.1)
const cameraTarget = new Vector3(0, 0.62, 0)

export const cabinProfiles: Record<DoorCount, CabinProfile> = {
  [DoorCount.TwoThree]: {
    outline: [[-1.75, cabinBase], [-0.85, 1.34], [0.2, 1.34], [1.1, cabinBase]],
    roof: { from: -0.82, to: 0.18, height: 1.34 },
    doorSeams: [0.95, -0.55],
    rearSeatX: -0.7,
    thirdRowX: -1.3
  },
  [DoorCount.FourFive]: {
    outline: [[-1.6, cabinBase], [-1.15, 1.42], [0.4, 1.42], [1.2, cabinBase]],
    roof: { from: -1.12, to: 0.38, height: 1.42 },
    doorSeams: [1.0, 0.1, -0.8],
    rearSeatX: -0.72,
    thirdRowX: -1.3
  },
  [DoorCount.MoreThanFive]: {
    outline: [[-2.0, cabinBase], [-1.92, 1.62], [0.45, 1.62], [1.3, cabinBase]],
    roof: { from: -1.9, to: 0.43, height: 1.62 },
    doorSeams: [1.1, 0.2, -0.75, -1.6],
    rearSeatX: -0.62,
    thirdRowX: -1.45
  }
}

export const upholsteryFinishes: Record<InteriorMaterial, UpholsteryFinish> = {
  [InteriorMaterial.Fabric]: { roughness: 0.95, sheen: 0.6, clearcoat: 0 },
  [InteriorMaterial.Leather]: { roughness: 0.38, sheen: 0, clearcoat: 0.35 },
  [InteriorMaterial.ArtificialLeather]: { roughness: 0.3, sheen: 0, clearcoat: 0.6 },
  [InteriorMaterial.Combined]: { roughness: 0.6, sheen: 0.3, clearcoat: 0.15 },
  [InteriorMaterial.Alcantara]: { roughness: 1, sheen: 1, clearcoat: 0 }
}

const drivenAxles: Record<DriveType, ReadonlyArray<number>> = {
  [DriveType.Front]: [1],
  [DriveType.Rear]: [-1],
  [DriveType.AllWheel]: [1, -1]
}

const getSteeringZ = (side: SteeringSide | null) => side === SteeringSide.Right ? 0.36 : -0.36

const createBodyGeometry = () => {
  const shape = new Shape()
    .moveTo(-2.1, 0.28)
    .lineTo(-2.1, 0.84)
    .quadraticCurveTo(-2.08, 0.95, -1.92, 0.96)
    .lineTo(1.6, 0.91)
    .quadraticCurveTo(2.12, 0.88, 2.14, 0.62)
    .lineTo(2.1, 0.28)

  for (const axleX of [wheelBase, -wheelBase]) {
    shape
      .lineTo(axleX + archRadius, 0.28)
      .lineTo(axleX + archRadius, wheelCenterY)
      .absarc(axleX, wheelCenterY, archRadius, 0, Math.PI, false)
      .lineTo(axleX - archRadius, 0.28)
  }
  shape.closePath()

  const geometry = new ExtrudeGeometry(shape, { depth: bodyWidth, bevelThickness: bodyBevel, bevelSize: bodyBevel, bevelSegments: 4, curveSegments: 24 })
  geometry.translate(0, 0, -bodyWidth / 2)
  return geometry
}

const createCabinGeometry = ({ outline }: CabinProfile) => {
  const [[startX, startY], ...rest] = outline
  const shape = new Shape().moveTo(startX, startY)
  rest.forEach(([x, y]) => shape.lineTo(x, y))
  shape.closePath()

  const geometry = new ExtrudeGeometry(shape, { depth: cabinWidth, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 3 })
  geometry.translate(0, 0, -cabinWidth / 2)
  return geometry
}

const createSeat = (material: MeshPhysicalMaterial, x: number, z: number, width: number, backHeight = 0.34) => {
  const seat = new Group()
  const cushion = new Mesh(new BoxGeometry(0.42, 0.08, width), material)
  const backrest = new Mesh(new BoxGeometry(0.09, backHeight, width), material)
  cushion.position.set(0, 0.98, 0)
  backrest.position.set(-0.19, 0.98 + backHeight / 2, 0)
  backrest.rotation.z = 0.16
  seat.add(cushion, backrest)
  seat.position.set(x, 0, z)
  return seat
}

interface WheelRig {
  readonly group: Group
  readonly spinner: Group
  readonly glow: Mesh<TorusGeometry, MeshBasicMaterial>
  readonly axle: number
  readonly state: { speed: number }
}

const createWheel = (axle: number, side: number, materials: { tire: MeshStandardMaterial, rim: MeshPhysicalMaterial, caliper: MeshPhysicalMaterial }): WheelRig => {
  const group = new Group()
  const spinner = new Group()

  const tire = new Mesh(new TorusGeometry(0.255, 0.09, 16, 40), materials.tire)
  const rim = new Mesh(new CylinderGeometry(0.2, 0.2, 0.16, 32), materials.rim)
  rim.rotation.x = Math.PI / 2
  spinner.add(tire, rim)

  for (let index = 0; index < 5; index++) {
    const spoke = new Mesh(new BoxGeometry(0.035, 0.36, 0.03), materials.rim)
    spoke.rotation.z = (index / 5) * Math.PI * 2
    spoke.position.z = side * 0.085
    spinner.add(spoke)
  }

  const caliper = new Mesh(new BoxGeometry(0.1, 0.16, 0.06), materials.caliper)
  caliper.position.set(0.12, 0.1, side * 0.02)

  const glow = new Mesh(
    new TorusGeometry(0.33, 0.012, 8, 48),
    new MeshBasicMaterial({ color: brandColors.neon, transparent: true, opacity: 0, depthWrite: false })
  )
  glow.position.z = side * 0.1

  group.add(spinner, caliper, glow)
  group.position.set(axle * wheelBase, wheelCenterY, side * wheelTrack)
  return { group, spinner, glow, axle, state: { speed: 0 } }
}

export const createShowroom: ShowroomFactory = (stage, contextSafe, reducedMotion) => {
  const { model: car, dispose } = createTurntableStage(stage, contextSafe, reducedMotion, { cameraPosition, cameraTarget, radius: turntableRadius })

  const paint = createPaintMaterial()
  const upholstery = new MeshPhysicalMaterial({ roughness: 0.6, sheenColor: '#ffffff', sheenRoughness: 0.6 })
  const glass = new MeshPhysicalMaterial({ color: '#0d1222', metalness: 0.2, roughness: 0.05, transparent: true, opacity: 0.42, depthWrite: false, side: DoubleSide })
  const trim = new MeshStandardMaterial({ color: '#16171d', roughness: 0.55, metalness: 0.2 })
  const wheelMaterials = {
    tire: new MeshStandardMaterial({ color: '#141418', roughness: 0.9 }),
    rim: new MeshPhysicalMaterial({ color: '#cfd3dc', metalness: 1, roughness: 0.2, clearcoat: 0.6 }),
    caliper: new MeshPhysicalMaterial({ color: brandColors.violet, roughness: 0.35, clearcoat: 1 })
  }

  const body = new Mesh(createBodyGeometry(), paint)
  const grille = new Mesh(new BoxGeometry(0.04, 0.2, 0.95), trim)
  grille.position.set(2.17, 0.5, 0)
  car.add(body, grille)

  for (const side of [-1, 1]) {
    const headlight = new Mesh(new BoxGeometry(0.05, 0.08, 0.38), new MeshStandardMaterial({ color: '#ffffff', emissive: '#dff4ff', emissiveIntensity: 2.2 }))
    headlight.position.set(2.13, 0.72, side * 0.56)
    const taillight = new Mesh(new BoxGeometry(0.05, 0.07, 0.42), new MeshStandardMaterial({ color: '#ff1f3d', emissive: '#ff1f3d', emissiveIntensity: 1.8 }))
    taillight.position.set(-2.17, 0.8, side * 0.58)
    car.add(headlight, taillight)
  }

  const wheels = [1, -1].flatMap((axle) => [1, -1].map((side) => createWheel(axle, side, wheelMaterials)))
  wheels.forEach(({ group }) => car.add(group))

  const cabinPivot = new Group()
  const cabin = new Group()
  cabinPivot.position.y = cabinBase
  cabin.position.y = -cabinBase
  cabinPivot.add(cabin)
  car.add(cabinPivot)

  const steering = new Group()
  const steeringWheel = new Mesh(new TorusGeometry(0.12, 0.018, 12, 32), trim)
  steeringWheel.rotation.y = Math.PI / 2
  const steeringColumn = new Mesh(new CylinderGeometry(0.015, 0.015, 0.18, 8), trim)
  steeringColumn.rotation.z = Math.PI / 2
  steeringColumn.position.x = 0.09
  steering.add(steeringWheel, steeringColumn)
  steering.position.set(0.62, 1.12, getSteeringZ(null))
  steering.rotation.z = -0.35

  const buildCabin = (config: ShowroomConfig) => {
    cabin.remove(steering)
    clearObject(cabin, [paint, upholstery, glass, trim])
    const profile = cabinProfiles[config.doorCount ?? DoorCount.FourFive]

    const greenhouse = new Mesh(createCabinGeometry(profile), glass)
    const roof = new Mesh(new BoxGeometry(profile.roof.to - profile.roof.from, 0.06, cabinWidth + 0.06), paint)
    roof.position.set((profile.roof.from + profile.roof.to) / 2, profile.roof.height + 0.06, 0)

    const dashboard = new Mesh(new BoxGeometry(0.3, 0.1, cabinWidth - 0.1), trim)
    dashboard.position.set(0.8, 1.0, 0)

    cabin.add(
      greenhouse,
      roof,
      dashboard,
      createSeat(upholstery, 0.12, -0.36, 0.42),
      createSeat(upholstery, 0.12, 0.36, 0.42),
      createSeat(upholstery, profile.rearSeatX, 0, 1.1)
    )
    if (config.hasThirdRowSeats) cabin.add(createSeat(upholstery, profile.thirdRowX, 0, 1.1, 0.24))

    for (const x of profile.doorSeams) {
      for (const side of [-1, 1]) {
        const seam = new Mesh(new BoxGeometry(0.012, 0.5, 0.004), trim)
        seam.position.set(x, 0.68, side * (bodyWidth / 2 + bodyBevel + 0.002))
        cabin.add(seam)
      }
    }

    steering.position.z = getSteeringZ(config.steeringSide)
    cabin.add(steering)
  }

  let current: ShowroomConfig | null = null

  const applyUpholstery = (config: ShowroomConfig, duration: number) => {
    const finish = upholsteryFinishes[config.interiorMaterial ?? InteriorMaterial.Leather]
    tweenColor(upholstery.color, config.upholstery, { duration }).then()
    gsap.to(upholstery, { ...finish, duration, overwrite: 'auto' }).then()
  }

  const applyDrive = (config: ShowroomConfig, duration: number) => {
    const axles = config.driveType ? drivenAxles[config.driveType] : []
    wheels.forEach(({ glow, axle, state, spinner }) => {
      const isDriven = axles.includes(axle)
      gsap.to(glow.material, { opacity: isDriven ? 0.95 : 0, duration, overwrite: 'auto' }).then()
      gsap.to(state, { speed: isDriven && !reducedMotion ? wheelSpinSpeed : 0, duration: duration * 2, ease: 'power2.inOut', overwrite: 'auto' }).then()
      if (isDriven && duration > 0) {
        gsap.fromTo(glow.scale, { x: 1.4, y: 1.4 }, { x: 1, y: 1, duration: 0.6, ease: 'back.out(3)' }).then()
      } else if (duration === 0) {
        spinner.rotation.z = 0
      }
    })
  }

  const applySteering = (config: ShowroomConfig, duration: number) => {
    gsap.to(steering.position, { z: getSteeringZ(config.steeringSide), duration, ease: 'power3.inOut', overwrite: 'auto' }).then()
    if (duration > 0) gsap.fromTo(steeringWheel.rotation, { x: 0 }, { x: Math.PI * 2, duration: duration * 1.2, ease: 'power2.inOut' }).then()
  }

  const morphCabin = (config: ShowroomConfig, duration: number) => {
    if (duration === 0) {
      buildCabin(config)
      return
    }

    gsap.timeline()
      .to(cabinPivot.scale, { y: 0.02, x: 0.9, duration: duration * 0.4, ease: 'power2.in' })
      .call(() => buildCabin(config))
      .to(cabinPivot.scale, { y: 1, x: 1, duration: duration * 0.9, ease: 'back.out(2.4)' })
      .to(car.position, { keyframes: { y: [0, 0.08, 0] }, duration: 0.5, ease: 'sine.inOut' }, '<').then()
  }

  const apply = contextSafe((config: ShowroomConfig, immediate: boolean) => {
    const previous = current
    current = config
    const duration = immediate || reducedMotion ? 0 : 0.8

    if (hasPaintChanged(previous, config)) applyPaint(paint, config, duration)
    if (!previous || previous.upholstery !== config.upholstery || previous.interiorMaterial !== config.interiorMaterial) applyUpholstery(config, duration)
    if (!previous || previous.driveType !== config.driveType) applyDrive(config, duration)
    if (!previous || previous.doorCount !== config.doorCount || previous.hasThirdRowSeats !== config.hasThirdRowSeats) morphCabin(config, duration)
    else if (previous.steeringSide !== config.steeringSide) applySteering(config, duration)
  })

  const onFrame = (delta: number) => {
    wheels.forEach(({ spinner, state }) => {
      spinner.rotation.z -= state.speed * delta
    })
  }

  return { apply, onFrame, dispose }
}
