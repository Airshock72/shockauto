import { ImagePlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Card from 'src/core/components/cards/Card.tsx'
import { Skeleton } from 'src/core/components/ui/skeleton.tsx'
import { categoryPlaceholderIcons, dustPuffCount, specOptions } from 'src/modules/applications/helpers'
import usePlaceholderAnimation from 'src/modules/applications/hooks/usePlaceholderAnimation.ts'
import type { ApplicationPreviewCardProps } from 'src/modules/applications/types'

const ApplicationPreviewCard = ({ category, preview }: ApplicationPreviewCardProps) => {
  const { t } = useTranslation()
  const { imageUrl, title, price, specs } = preview
  const PlaceholderIcon = categoryPlaceholderIcons[category]
  const placeholderRef = usePlaceholderAnimation(category, Boolean(imageUrl))

  return (
    <Card className='animate-fade-up overflow-hidden p-0 sm:p-0' style={{ animationDelay: '200ms' }}>
      <div className='relative aspect-video overflow-hidden bg-muted'>
        {imageUrl
          ? <img src={imageUrl} alt={title ?? ''} className='size-full animate-fade-in object-cover' />
          : (
            <div className='relative flex size-full items-center justify-center bg-linear-to-br from-primary/15 via-transparent to-neon/15'>
              <Skeleton className='absolute inset-0 rounded-none opacity-60' />
              <span ref={placeholderRef} aria-hidden='true' className='relative flex flex-col items-center opacity-0 will-change-transform'>
                {Array.from({ length: dustPuffCount }, (_, index) => (
                  <span key={index} data-puff className='absolute bottom-4 left-1/2 -ml-1.5 size-3 rounded-full bg-primary/30 opacity-0 blur-[2px]' />
                ))}
                <span data-vehicle className='relative will-change-transform'>
                  <PlaceholderIcon
                    strokeWidth={1.25}
                    className='size-24 text-primary/70 drop-shadow-[0_0_18px_var(--neon)]'
                  />
                </span>
                <span data-shadow className='-mt-4 h-1.5 w-16 rounded-full bg-primary/25 blur-sm' />
              </span>
              <span className='absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-card/80 px-2.5 py-1 text-2xs text-muted-foreground backdrop-blur'>
                <ImagePlus aria-hidden='true' className='size-3.5' />
                {t('applications.preview.noImage')}
              </span>
            </div>
          )}
      </div>

      <div className='space-y-4 p-5'>
        <div className='space-y-2'>
          {title
            ? <h2 className='animate-fade-in truncate text-lg font-semibold'>{title}</h2>
            : <Skeleton className='h-6 w-3/4 rounded-lg' />}
          {price
            ? <p className='animate-fade-in text-xl font-bold text-gradient'>{price}</p>
            : <Skeleton className='h-7 w-1/3 rounded-lg' />}
        </div>

        <div className='grid grid-cols-2 gap-2 rounded-xl border bg-card/60 p-3 shadow-soft'>
          {specOptions.map(({ value, label, icon: Icon }, index) => (
            <div
              key={value}
              className='flex animate-fade-up items-center gap-2.5 rounded-lg p-1.5 last:col-span-2'
              style={{ animationDelay: `${300 + index * 60}ms` }}
            >
              <span className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <Icon aria-hidden='true' />
              </span>
              <span className='min-w-0 flex-1'>
                <span className='block truncate text-2xs text-muted-foreground'>{t(label)}</span>
                {specs[value]
                  ? <span className='block animate-fade-in truncate text-xs font-medium'>{specs[value]}</span>
                  : <Skeleton className='mt-1 h-3 w-3/4' />}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default ApplicationPreviewCard
