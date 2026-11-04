import type { ThreeStageController } from 'src/core/types/three.ts'

export interface WrongTurnController extends ThreeStageController {
  readonly onFrame: (delta: number) => void
  readonly dispose: () => void
}
