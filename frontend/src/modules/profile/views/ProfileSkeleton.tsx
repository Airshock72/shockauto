import { useTranslation } from 'react-i18next'
import Card from 'src/core/components/cards/Card.tsx'
import { Skeleton } from 'src/core/components/ui/skeleton.tsx'

const sectionFieldLabelWidths = [['w-16', 'w-14', 'w-12', 'w-32', 'w-28'], ['w-20', 'w-36']]

const ProfileSkeleton = () => {
  const { t } = useTranslation()

  return (
    <div
      role='status'
      aria-live='polite'
      aria-busy='true'
      className='mx-auto grid w-full max-w-5xl animate-fade-up grid-cols-1 items-start gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]'
    >
      <span className='sr-only'>{t('common.loading')}</span>

      <div className='space-y-4'>
        <Card className='overflow-hidden p-0 sm:p-0'>
          <Skeleton className='h-20 rounded-none' />
          <div className='-mt-11 flex flex-col items-center px-6 pb-6'>
            <Skeleton className='size-22 rounded-full ring-4 ring-card' />
            <Skeleton className='mt-3 h-5 w-36' />
            <Skeleton className='mt-2 h-3.5 w-44' />
          </div>
        </Card>

        <div className='space-y-3'>
          <Skeleton className='mx-1 h-3 w-24' />
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className='flex items-center gap-4 rounded-xl border bg-card/60 p-5 shadow-soft'>
              <Skeleton className='size-12 shrink-0 rounded-xl' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-28' />
                <Skeleton className='h-3 w-4/5' />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className='space-y-8'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-56 max-w-full rounded-lg' />
          <Skeleton className='h-3.5 w-full max-w-sm' />
        </div>

        {sectionFieldLabelWidths.map((widths, sectionIndex) => (
          <div key={sectionIndex} className='space-y-5'>
            <div className='flex items-center gap-2.5'>
              <Skeleton className='size-7 rounded-lg' />
              <Skeleton className='h-4 w-32' />
            </div>
            <div className='grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2'>
              {widths.map((width, index) => (
                <div key={index} className='flex flex-col gap-1.5 short:gap-1'>
                  <div className='flex h-5 items-center short:h-4'>
                    <Skeleton className={`h-3.5 ${width}`} />
                  </div>
                  <Skeleton className='h-11 w-full rounded-lg short:h-10' />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className='flex justify-end border-t pt-6'>
          <Skeleton className='h-12 w-full rounded-xl sm:w-40' />
        </div>
      </Card>
    </div>
  )
}

export default ProfileSkeleton
