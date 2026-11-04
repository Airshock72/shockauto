import { cn } from 'src/core/lib/utils'
import { backdropOrbs } from 'src/core/helpers/animatedBackdrop.ts'
import useAnimatedBackdrop from 'src/core/hooks/backgrounds/useAnimatedBackdrop.ts'
import useHighwayScene from 'src/core/hooks/backgrounds/useHighwayScene.ts'

const AnimatedBackdrop = () => {
  const backdropRef = useAnimatedBackdrop()
  const highwayRef = useHighwayScene()

  return (
    <div ref={backdropRef} aria-hidden='true' className='pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background'>
      {backdropOrbs.map(({ className }, index) => (
        <div key={index} data-backdrop-layer className='absolute inset-0'>
          <div data-backdrop-orb className={cn('backdrop-orb', className)} />
        </div>
      ))}

      <div ref={highwayRef} className='backdrop-highway' />

      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)] opacity-70' />
    </div>
  )
}

export default AnimatedBackdrop
