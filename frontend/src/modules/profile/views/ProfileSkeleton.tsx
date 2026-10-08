import { useTranslation } from 'react-i18next'
import Card from 'src/core/components/cards/Card.tsx'
import Divider from 'src/core/components/dividers/Divider.tsx'
import { Skeleton } from 'src/core/components/ui/skeleton.tsx'

const fieldLabelWidths = ['w-16', 'w-14', 'w-12', 'w-32', 'w-28', 'w-20', 'w-36']

const ProfileSkeleton = () => {
  const { t } = useTranslation()

  return (
    <Card role='status' aria-live='polite' aria-busy='true' className='neon-edge relative mx-auto w-full max-w-3xl animate-fade-up'>
      <span className='sr-only'>{t('common.loading')}</span>

      <div className='mb-8 flex items-center gap-4'>
        <Skeleton className='size-12 shrink-0 rounded-xl' />
        <div className='flex-1 space-y-1'>
          <Skeleton className='h-8 w-56 max-w-full rounded-lg' />
          <div className='flex h-5 items-center'>
            <Skeleton className='h-3.5 w-full max-w-sm' />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2'>
        {fieldLabelWidths.map((width, index) => (
          <div key={index} className='flex flex-col gap-1.5 short:gap-1'>
            <div className='flex h-5 items-center short:h-4'>
              <Skeleton className={`h-3.5 ${width}`} />
            </div>
            <Skeleton className='h-11 w-full rounded-lg short:h-10' />
          </div>
        ))}
      </div>

      <Divider className='my-8' />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className='flex items-center gap-4 rounded-xl border bg-card/60 p-5 shadow-soft'>
            <Skeleton className='size-12 shrink-0 rounded-xl' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-3 w-4/5' />
            </div>
            <Skeleton className='size-4.5 shrink-0 rounded-sm' />
          </div>
        ))}
      </div>

      <Divider className='my-8' />

      <div className='flex justify-end'>
        <Skeleton className='h-12 w-full rounded-xl sm:w-40' />
      </div>
    </Card>
  )
}

export default ProfileSkeleton
