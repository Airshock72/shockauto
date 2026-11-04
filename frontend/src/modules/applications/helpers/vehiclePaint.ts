import gsap from 'gsap'
import { MeshPhysicalMaterial } from 'three'
import { tweenColor } from 'src/core/helpers/three.ts'
import type { ShowroomConfig } from 'src/modules/applications/types'

export const createPaintMaterial = () =>
  new MeshPhysicalMaterial({ metalness: 0.35, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.08 })

export const hasPaintChanged = (previous: ShowroomConfig | null, next: ShowroomConfig) =>
  !previous || previous.paint !== next.paint || previous.isMetallic !== next.isMetallic

export const applyPaint = (material: MeshPhysicalMaterial, { paint, isMetallic }: ShowroomConfig, duration: number) => {
  tweenColor(material.color, paint, { duration }).then()
  gsap.to(material, {
    metalness: isMetallic ? 0.85 : 0.35,
    roughness: isMetallic ? 0.22 : 0.3,
    duration,
    overwrite: 'auto'
  }).then()
}
