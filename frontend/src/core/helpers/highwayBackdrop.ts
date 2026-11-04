import gsap from 'gsap'
import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  Points,
  PointsMaterial,
  Vector3
} from 'three'
import { brandColors } from 'src/core/helpers/three.ts'
import type { ContextSafe, ThreeStage } from 'src/core/types/three.ts'
import type { ResolvedTheme } from 'src/providers/theme/themeContext.ts'

const roadHalfWidth = 14
const roadLength = 70
const roadNear = 6
const gridSpacing = 2
const cruiseSpeed = 9
const trailCount = 16
const trailLength = 3.2
const sparkCount = 260
const cameraTarget = new Vector3(0, 0.4, -roadLength)

export interface HighwayController {
  readonly setTheme: (theme: ResolvedTheme, isInitial: boolean) => void
  readonly onFrame: (delta: number) => void
  readonly dispose: () => void
}

interface Trail {
  readonly mesh: Mesh<BoxGeometry, MeshBasicMaterial>
  readonly speed: number
  readonly direction: number
}

const themeOpacity: Record<ResolvedTheme, { grid: number, trails: number, sparks: number }> = {
  dark: { grid: 0.55, trails: 0.9, sparks: 0.85 },
  light: { grid: 0.32, trails: 0.55, sparks: 0.5 }
}

const createLines = (positions: Array<number>, color: string) => {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  return new LineSegments(geometry, new LineBasicMaterial({ color, transparent: true, opacity: 0 }))
}

const createCrossLines = () => {
  const positions: Array<number> = []
  for (let z = roadNear; z >= -roadLength; z -= gridSpacing) positions.push(-roadHalfWidth, 0, z, roadHalfWidth, 0, z)
  return createLines(positions, brandColors.violet)
}

const createLaneLines = () => {
  const positions: Array<number> = []
  for (let x = -roadHalfWidth; x <= roadHalfWidth; x += gridSpacing) positions.push(x, 0, roadNear + gridSpacing, x, 0, -roadLength)
  return createLines(positions, brandColors.neon)
}

const createSparks = () => {
  const positions: Array<number> = []
  for (let index = 0; index < sparkCount; index++) {
    positions.push(gsap.utils.random(-40, 40), gsap.utils.random(2, 22), gsap.utils.random(-roadLength, -8))
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  return new Points(geometry, new PointsMaterial({ color: brandColors.neon, size: 0.12, transparent: true, opacity: 0, depthWrite: false }))
}

const createTrails = (): Array<Trail> => Array.from({ length: trailCount }, (_, index) => {
  const isOncoming = index % 2 === 0
  const mesh = new Mesh(
    new BoxGeometry(0.06, 0.03, trailLength),
    new MeshBasicMaterial({ color: isOncoming ? '#e6f7ff' : '#ff3b6b', transparent: true, opacity: 0, depthWrite: false })
  )
  const lane = gsap.utils.random(1, 5, 1) * gridSpacing - gridSpacing / 2
  mesh.position.set(isOncoming ? -lane : lane, 0.08, gsap.utils.random(-roadLength, 0))
  return { mesh, speed: gsap.utils.random(14, 30), direction: isOncoming ? 1 : -1 }
})

const wrap = gsap.utils.wrap(-roadLength, trailLength)

export const createHighway = ({ scene, camera }: ThreeStage, contextSafe: ContextSafe, reducedMotion: boolean): HighwayController => {
  camera.position.set(0, 1.6, 6)
  camera.lookAt(cameraTarget)

  const road = new Group()
  const crossLines = createCrossLines()
  const laneLines = createLaneLines()
  const sparks = createSparks()
  const trails = createTrails()
  road.add(crossLines, laneLines, ...trails.map(({ mesh }) => mesh))
  scene.add(road, sparks)

  const motion = { speed: reducedMotion ? 0 : cruiseSpeed }
  let theme: ResolvedTheme = 'dark'

  const setTheme = contextSafe((nextTheme: ResolvedTheme, isInitial: boolean) => {
    theme = nextTheme
    const opacity = themeOpacity[nextTheme]
    const blending = nextTheme === 'dark' ? AdditiveBlending : NormalBlending
    const duration = isInitial ? 1.4 : 0.6

    trails.forEach(({ mesh }) => {
      mesh.material.blending = blending
      mesh.material.needsUpdate = true
      gsap.to(mesh.material, { opacity: opacity.trails, duration, overwrite: 'auto' }).then()
    })
    gsap.to(crossLines.material, { opacity: opacity.grid, duration, overwrite: 'auto' }).then()
    gsap.to(laneLines.material, { opacity: opacity.grid * 0.7, duration, overwrite: 'auto' }).then()
    gsap.to(sparks.material, { opacity: opacity.sparks, duration, overwrite: 'auto' }).then()
  })

  if (!reducedMotion) {
    gsap.to(motion, { speed: cruiseSpeed * 1.8, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 3 }).then()
    gsap.to(sparks.rotation, { y: 0.25, duration: 30, ease: 'sine.inOut', repeat: -1, yoyo: true }).then()
    gsap.to(sparks.material, {
      size: 0.18,
      duration: 1.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      onRepeat: () => gsap.to(sparks.material, { opacity: themeOpacity[theme].sparks * gsap.utils.random(0.5, 1), duration: 0.9, overwrite: 'auto' })
    }).then()
  }

  const swayX = gsap.quickTo(camera.position, 'x', { duration: 1.6, ease: 'power3.out' })
  const swayY = gsap.quickTo(camera.position, 'y', { duration: 1.6, ease: 'power3.out' })
  const bank = gsap.quickTo(road.rotation, 'z', { duration: 1.6, ease: 'power3.out' })

  const handlePointerMove = contextSafe((event: PointerEvent) => {
    const offsetX = event.clientX / window.innerWidth - 0.5
    const offsetY = event.clientY / window.innerHeight - 0.5
    swayX(offsetX * 2.4).then()
    swayY(1.6 - offsetY * 0.8).then()
    bank(offsetX * 0.05).then()
  })

  if (!reducedMotion) window.addEventListener('pointermove', handlePointerMove)

  const onFrame = (delta: number) => {
    crossLines.position.z = (crossLines.position.z + motion.speed * delta) % gridSpacing
    trails.forEach(({ mesh, speed, direction }) => {
      mesh.position.z = wrap(mesh.position.z + (motion.speed + speed) * direction * delta * (direction > 0 ? 1 : 0.35))
    })
    camera.lookAt(cameraTarget)
  }

  const dispose = () => window.removeEventListener('pointermove', handlePointerMove)

  return { setTheme, onFrame, dispose }
}
