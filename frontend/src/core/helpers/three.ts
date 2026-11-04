import gsap from 'gsap'
import {
  CanvasTexture,
  Color,
  type Material,
  Mesh,
  type Object3D,
  PMREMGenerator,
  SRGBColorSpace,
  type Texture,
  Vector3,
  type WebGLRenderer
} from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

export const brandColors = {
  violet: '#7c5cff',
  neon: '#22d3ee',
  graphite: '#1b1d26'
} as const

let webGLSupport: boolean | null = null

export const isWebGLAvailable = (): boolean => {
  if (webGLSupport !== null) return webGLSupport

  try {
    const context = document.createElement('canvas').getContext('webgl2')
    webGLSupport = Boolean(context)
    context?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webGLSupport = false
  }

  return webGLSupport
}

const isTexture = (value: unknown): value is Texture =>
  typeof value === 'object' && value !== null && 'isTexture' in value

const disposeMaterial = (material: Material) => {
  Object.values(material).forEach((value) => {
    if (isTexture(value)) value.dispose()
  })
  material.dispose()
}

export const disposeObject = (root: Object3D) => {
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return

    object.geometry.dispose()
    const materials: Array<Material> = Array.isArray(object.material) ? object.material : [object.material]
    materials.forEach(disposeMaterial)
  })
}

export const clearObject = (root: Object3D, keep: ReadonlyArray<Material> = []) => {
  root.children.slice().forEach((child) => {
    child.traverse((object) => {
      if (!(object instanceof Mesh)) return

      object.geometry.dispose()
      const materials: Array<Material> = Array.isArray(object.material) ? object.material : [object.material]
      materials.filter((material) => !keep.includes(material)).forEach(disposeMaterial)
    })
    root.remove(child)
  })
}

export const createStudioEnvironment = (renderer: WebGLRenderer): Texture => {
  const generator = new PMREMGenerator(renderer)
  const room = new RoomEnvironment()
  const texture = generator.fromScene(room, 0.04).texture
  room.dispose()
  generator.dispose()
  return texture
}

export const createRadialTexture = (color: string, size = 256): CanvasTexture => {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')

  if (context) {
    const half = size / 2
    const gradient = context.createRadialGradient(half, half, 0, half, half, half)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, 'transparent')
    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

export const tweenColor = (color: Color, target: string, vars: gsap.TweenVars = {}) => {
  const { r, g, b } = new Color(target)
  return gsap.to(color, { r, g, b, duration: 0.8, ease: 'power2.out', overwrite: 'auto', ...vars })
}

const upAxis = new Vector3(0, 1, 0)

export const placeBetween = (mesh: Object3D, from: Vector3, to: Vector3) => {
  const direction = to.clone().sub(from)
  mesh.position.copy(from).addScaledVector(direction, 0.5)
  mesh.scale.y = direction.length()
  mesh.quaternion.setFromUnitVectors(upAxis, direction.normalize())
  return mesh
}
