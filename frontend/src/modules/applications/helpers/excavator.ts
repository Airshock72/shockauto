import gsap from 'gsap'
import {
  BoxGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Shape,
  SphereGeometry,
  Vector3
} from 'three'
import { brandColors, placeBetween } from 'src/core/helpers/three.ts'
import { createTurntableStage } from 'src/modules/applications/helpers/turntableStage.ts'
import { applyPaint, createPaintMaterial, hasPaintChanged } from 'src/modules/applications/helpers/vehiclePaint.ts'
import type { ShowroomConfig, ShowroomFactory } from 'src/modules/applications/types'

const trackLength = 2.1
const trackHeight = 0.42
const trackWidth = 0.34
const trackGauge = 0.62
const cleatCount = 26
const houseY = 0.62
const boomLength = 1.55
const armLength = 1.05

const cameraPosition = new Vector3(6.6, 3.4, 7.4)
const cameraTarget = new Vector3(0.35, 1.05, 0)

const restPose = { swing: 0, boom: 0.55, arm: -1.55, bucket: -0.6 }
const digPose = { swing: 0.55, boom: 0.2, arm: -1.0, bucket: 0.5 }
const scoopPose = { swing: 0.55, boom: 0.25, arm: -1.9, bucket: -1.3 }
const dumpPose = { swing: -0.6, boom: 0.75, arm: -1.2, bucket: 0.7 }

interface ExcavatorMaterials {
  readonly paint: MeshPhysicalMaterial
  readonly steel: MeshPhysicalMaterial
  readonly chrome: MeshPhysicalMaterial
  readonly rubber: MeshStandardMaterial
  readonly glass: MeshPhysicalMaterial
}

const getTrackPoint = (t: number): [number, number] => {
  const radius = trackHeight / 2
  const straight = trackLength - trackHeight
  const perimeter = 2 * straight + 2 * Math.PI * radius
  let distance = (((t % 1) + 1) % 1) * perimeter

  if (distance < straight) return [-straight / 2 + distance, radius]
  distance -= straight
  if (distance < Math.PI * radius) {
    const angle = Math.PI / 2 - distance / radius
    return [straight / 2 + Math.cos(angle) * radius, Math.sin(angle) * radius]
  }
  distance -= Math.PI * radius
  if (distance < straight) return [straight / 2 - distance, -radius]
  distance -= straight
  const angle = -Math.PI / 2 - distance / radius
  return [-straight / 2 + Math.cos(angle) * radius, Math.sin(angle) * radius]
}

const createTrack = (side: number, { steel, rubber }: ExcavatorMaterials) => {
  const track = new Group()
  const radius = trackHeight / 2
  const straight = trackLength - trackHeight

  const shape = new Shape()
    .moveTo(-straight / 2, -radius)
    .lineTo(straight / 2, -radius)
    .absarc(straight / 2, 0, radius, -Math.PI / 2, Math.PI / 2, false)
    .lineTo(-straight / 2, radius)
    .absarc(-straight / 2, 0, radius, Math.PI / 2, Math.PI * 1.5, false)
  const belt = new Mesh(new ExtrudeGeometry(shape, { depth: trackWidth, bevelEnabled: false, curveSegments: 20 }), rubber)
  belt.position.z = -trackWidth / 2
  track.add(belt)

  for (const x of [-straight / 2, straight / 2]) {
    const sprocket = new Mesh(new CylinderGeometry(radius * 0.72, radius * 0.72, trackWidth + 0.02, 20), steel)
    sprocket.rotation.x = Math.PI / 2
    sprocket.position.x = x
    track.add(sprocket)
  }

  const cleats = Array.from({ length: cleatCount }, () => {
    const cleat = new Mesh(new BoxGeometry(0.05, 0.035, trackWidth + 0.03), steel)
    track.add(cleat)
    return cleat
  })

  track.position.set(0, trackHeight / 2, side * trackGauge)
  return { track, cleats }
}

const createBoomShape = () => {
  const shape = new Shape()
    .moveTo(0, -0.1)
    .quadraticCurveTo(boomLength * 0.55, 0.12, boomLength, -0.08)
    .lineTo(boomLength, 0.08)
    .quadraticCurveTo(boomLength * 0.5, 0.38, 0, 0.12)
    .closePath()
  const geometry = new ExtrudeGeometry(shape, { depth: 0.2, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 })
  geometry.translate(0, 0, -0.1)
  return geometry
}

const createBucket = ({ steel, paint }: ExcavatorMaterials) => {
  const bucket = new Group()
  const shape = new Shape()
    .moveTo(0, 0)
    .lineTo(0.12, -0.05)
    .quadraticCurveTo(0.42, -0.1, 0.46, -0.42)
    .lineTo(0.36, -0.44)
    .quadraticCurveTo(0.3, -0.18, 0, -0.16)
    .closePath()
  const shell = new Mesh(new ExtrudeGeometry(shape, { depth: 0.46, bevelEnabled: false }), paint)
  shell.position.z = -0.23
  bucket.add(shell)

  for (let index = 0; index < 5; index++) {
    const tooth = new Mesh(new BoxGeometry(0.03, 0.09, 0.05), steel)
    tooth.position.set(0.42, -0.47, -0.18 + index * 0.09)
    tooth.rotation.z = 0.25
    bucket.add(tooth)
  }

  return bucket
}

export const createExcavatorShowroom: ShowroomFactory = (stage, contextSafe, reducedMotion) => {
  const { model: machine, dispose } = createTurntableStage(stage, contextSafe, reducedMotion, { cameraPosition, cameraTarget, radius: 2.7 })

  const materials: ExcavatorMaterials = {
    paint: createPaintMaterial(),
    steel: new MeshPhysicalMaterial({ color: '#3a3d48', metalness: 0.85, roughness: 0.4 }),
    chrome: new MeshPhysicalMaterial({ color: '#dfe3ea', metalness: 1, roughness: 0.12 }),
    rubber: new MeshStandardMaterial({ color: '#151519', roughness: 0.95 }),
    glass: new MeshPhysicalMaterial({ color: '#0d1222', metalness: 0.2, roughness: 0.05, transparent: true, opacity: 0.5, depthWrite: false })
  }

  const tracks = [-1, 1].map((side) => createTrack(side, materials))
  const slewRing = new Mesh(new CylinderGeometry(0.42, 0.46, 0.12, 32), materials.steel)
  slewRing.position.y = houseY - 0.06
  machine.add(...tracks.map(({ track }) => track), slewRing)

  const house = new Group()
  house.position.y = houseY
  machine.add(house)

  const body = new Mesh(new BoxGeometry(1.5, 0.48, 1.2), materials.paint)
  body.position.set(-0.25, 0.26, 0)
  const counterweight = new Mesh(new CylinderGeometry(0.6, 0.6, 0.5, 32, 1, false, Math.PI, Math.PI), materials.steel)
  counterweight.rotation.y = Math.PI / 2
  counterweight.scale.set(1, 1, 0.45)
  counterweight.position.set(-1.0, 0.26, 0)
  const grilleStripe = new Mesh(new BoxGeometry(0.9, 0.025, 0.01), new MeshBasicMaterial({ color: brandColors.neon }))
  grilleStripe.position.set(-0.4, 0.36, 0.605)

  const cabFrame = new Mesh(new BoxGeometry(0.62, 0.78, 0.56), materials.glass)
  cabFrame.position.set(0.18, 0.89, -0.28)
  const cabRoof = new Mesh(new BoxGeometry(0.68, 0.05, 0.62), materials.paint)
  cabRoof.position.set(0.18, 1.3, -0.28)
  const cabPillar = new Mesh(new BoxGeometry(0.04, 0.78, 0.04), materials.steel)
  cabPillar.position.set(0.48, 0.89, -0.01)

  const beacon = new Mesh(new SphereGeometry(0.06, 16, 10), new MeshStandardMaterial({ color: '#ffb020', emissive: '#ff9500', emissiveIntensity: 0.4 }))
  beacon.position.set(-0.05, 1.36, -0.45)
  house.add(body, counterweight, grilleStripe, cabFrame, cabRoof, cabPillar, beacon)

  const boomPivot = new Group()
  boomPivot.position.set(0.45, 0.4, 0.28)
  house.add(boomPivot)
  const boom = new Mesh(createBoomShape(), materials.paint)
  const boomCylinder = placeBetween(new Mesh(new CylinderGeometry(0.035, 0.035, 1, 12), materials.chrome), new Vector3(0.1, -0.12, 0.13), new Vector3(0.8, 0.12, 0.13))
  boomPivot.add(boom, boomCylinder)

  const armPivot = new Group()
  armPivot.position.x = boomLength
  boomPivot.add(armPivot)
  const arm = new Mesh(new BoxGeometry(armLength, 0.14, 0.16), materials.paint)
  arm.position.x = armLength / 2
  const armCylinder = placeBetween(new Mesh(new CylinderGeometry(0.03, 0.03, 1, 12), materials.chrome), new Vector3(-0.15, 0.14, 0), new Vector3(0.6, 0.12, 0))
  armPivot.add(arm, armCylinder)

  const bucketPivot = new Group()
  bucketPivot.position.x = armLength
  bucketPivot.add(createBucket(materials))
  armPivot.add(bucketPivot)

  const setPose = (pose: typeof restPose) => {
    house.rotation.y = pose.swing
    boomPivot.rotation.z = pose.boom
    armPivot.rotation.z = pose.arm
    bucketPivot.rotation.z = pose.bucket
  }
  setPose(restPose)

  const toPose = (timeline: gsap.core.Timeline, pose: typeof restPose, duration: number, position?: gsap.Position) => timeline
    .to(house.rotation, { y: pose.swing, duration, ease: 'power2.inOut' }, position)
    .to(boomPivot.rotation, { z: pose.boom, duration, ease: 'power2.inOut' }, '<')
    .to(armPivot.rotation, { z: pose.arm, duration, ease: 'power2.inOut' }, '<0.08')
    .to(bucketPivot.rotation, { z: pose.bucket, duration, ease: 'power2.inOut' }, '<0.08')

  if (!reducedMotion) {
    const digCycle = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 1.4 })
    toPose(digCycle, digPose, 1.3).then()
    toPose(digCycle, scoopPose, 0.9).then()
    toPose(digCycle, dumpPose, 1.6, '+=0.15').then()
    toPose(digCycle, restPose, 1.3, '+=0.35').then()

    gsap.to(beacon.material, { emissiveIntensity: 3, duration: 0.45, ease: 'sine.inOut', repeat: -1, yoyo: true }).then()
  }

  const trackState = { offset: 0, speed: reducedMotion ? 0 : 0.015 }

  const shudder = () => {
    gsap.timeline()
      .to(machine.position, { keyframes: { y: [0, 0.06, 0, 0.025, 0] }, duration: 0.7, ease: 'power2.out' })
      .to(trackState, { keyframes: { speed: [0.015, 0.12, 0.015] }, duration: 1.2, ease: 'sine.inOut' }, 0)
      .to(grilleStripe.scale, { keyframes: { x: [1, 1.15, 1] }, duration: 0.5 }, 0).then()
  }

  let current: ShowroomConfig | null = null

  const apply = contextSafe((config: ShowroomConfig, immediate: boolean) => {
    const previous = current
    current = config
    const duration = immediate || reducedMotion ? 0 : 0.8

    if (!hasPaintChanged(previous, config)) return
    applyPaint(materials.paint, config, duration)
    if (duration > 0) shudder()
  })

  const onFrame = (delta: number) => {
    trackState.offset += trackState.speed * delta
    tracks.forEach(({ cleats }) => {
      cleats.forEach((cleat, index) => {
        const t = index / cleatCount + trackState.offset
        const [x, y] = getTrackPoint(t)
        const [nextX, nextY] = getTrackPoint(t + 0.001)
        cleat.position.set(x, y, 0)
        cleat.rotation.z = Math.atan2(nextY - y, nextX - x)
      })
    })
  }

  return { apply, onFrame, dispose }
}
