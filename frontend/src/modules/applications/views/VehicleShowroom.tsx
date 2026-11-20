import useVehicleShowroom from 'src/modules/applications/hooks/useVehicleShowroom.ts'
import type { VehicleShowroomProps } from 'src/modules/applications/types'

const VehicleShowroom = ({ category, config }: VehicleShowroomProps) => {
  const containerRef = useVehicleShowroom(category, config)

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      className='absolute inset-0 animate-fade-in cursor-grab touch-pan-y active:cursor-grabbing'
    />
  )
}

export default VehicleShowroom
