import type { RefObject } from 'react'
import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three'

export type ContextSafe = <T extends (...args: Array<never>) => unknown>(callback: T) => T

export interface ThreeStage {
  readonly renderer: WebGLRenderer
  readonly scene: Scene
  readonly camera: PerspectiveCamera
  readonly container: HTMLDivElement
}

export interface ThreeStageController {
  readonly onFrame?: (delta: number) => void
  readonly dispose?: () => void
}

export interface ThreeStageOptions {
  readonly fov?: number
  readonly near?: number
  readonly far?: number
  readonly maxPixelRatio?: number
  readonly antialias?: boolean
}

export type ThreeStageSetup<TController extends ThreeStageController> = (stage: ThreeStage, contextSafe: ContextSafe) => TController

export interface ThreeStageHandle<TController extends ThreeStageController> {
  readonly containerRef: RefObject<HTMLDivElement | null>
  readonly controllerRef: RefObject<TController | null>
}
