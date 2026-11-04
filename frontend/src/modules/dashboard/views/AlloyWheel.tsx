import { cn } from 'src/core/lib/utils'
import useAlloyWheel from 'src/modules/dashboard/hooks/useAlloyWheel.ts'

interface AlloyWheelProps {
  readonly className?: string
}

const AlloyWheel = ({ className }: AlloyWheelProps) => {
  const containerRef = useAlloyWheel()

  return <div ref={containerRef} aria-hidden='true' className={cn('relative', className)} />
}

export default AlloyWheel
