import { Rotate3d } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import useVehicleShowroom from 'src/modules/applications/hooks/useVehicleShowroom.ts'
import type { VehicleShowroomProps } from 'src/modules/applications/types'

const VehicleShowroom = ({ category, config }: VehicleShowroomProps) => {
  const { t } = useTranslation()
  const containerRef = useVehicleShowroom(category, config)

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden='true'
        className='absolute inset-0 animate-fade-in cursor-grab touch-pan-y active:cursor-grabbing'
      />
      <span className='pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-card/80 px-2.5 py-1 text-2xs text-muted-foreground backdrop-blur'>
        <Rotate3d aria-hidden='true' className='size-3.5' />
        {t('applications.preview.dragHint')}
      </span>
    </>
  )
}

export default VehicleShowroom
