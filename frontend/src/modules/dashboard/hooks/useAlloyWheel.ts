import useThreeStage from 'src/core/hooks/three/useThreeStage.ts'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import { createAlloyWheel } from 'src/modules/dashboard/helpers/alloyWheel.ts'

const useAlloyWheel = () => {
  const { containerRef } = useThreeStage(
    (stage, contextSafe) => createAlloyWheel(stage, contextSafe, prefersReducedMotion()),
    { fov: 35, maxPixelRatio: 2 }
  )

  return containerRef
}

export default useAlloyWheel
