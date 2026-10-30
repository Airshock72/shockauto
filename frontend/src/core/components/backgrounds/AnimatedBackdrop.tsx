import { cn } from 'src/core/lib/utils'
import { backdropOrbs, backdropSparks, backdropStreakTops } from 'src/core/helpers/animatedBackdrop.ts'
import useAnimatedBackdrop from 'src/core/hooks/backgrounds/useAnimatedBackdrop.ts'

const AnimatedBackdrop = () => {
  const backdropRef = useAnimatedBackdrop()

  return (
    <div ref={backdropRef} aria-hidden='true' className='pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background'>
      {backdropOrbs.map(({ className }, index) => (
        <div key={index} data-backdrop-layer className='absolute inset-0'>
          <div data-backdrop-orb className={cn('backdrop-orb', className)} />
        </div>
      ))}

      <div className='backdrop-road opacity-60 dark:opacity-80' />

      {backdropStreakTops.map((top) => (
        <span key={top} data-backdrop-streak className='backdrop-streak' style={{ top }} />
      ))}

      {backdropSparks.map(({ top, left, delay }) => (
        <span key={`${top}-${left}`} className='backdrop-spark' style={{ top, left, animationDelay: delay }} />
      ))}

      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)] opacity-70' />
    </div>
  )
}

export default AnimatedBackdrop
