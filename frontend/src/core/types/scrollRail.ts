import type { PointerEvent, RefObject } from 'react'
import type { ThreeStageController } from 'src/core/types/three.ts'

export interface ScrollWheelOptions {
  readonly getTravel: () => number
  readonly reducedMotion: boolean
}

export interface ScrollWheelController extends ThreeStageController {
  readonly onFrame: (delta: number) => void
}

export interface ScrollRail {
  readonly railRef: RefObject<HTMLDivElement | null>
  readonly thumbRef: RefObject<HTMLDivElement | null>
  readonly fillRef: RefObject<HTMLSpanElement | null>
  readonly wheelRef: RefObject<HTMLDivElement | null>
  readonly handleRailPointerDown: (event: PointerEvent<HTMLDivElement>) => void
  readonly handleThumbPointerDown: (event: PointerEvent<HTMLDivElement>) => void
  readonly handleThumbPointerMove: (event: PointerEvent<HTMLDivElement>) => void
  readonly handleThumbPointerUp: (event: PointerEvent<HTMLDivElement>) => void
}
