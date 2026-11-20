import { ImagePlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Card from 'src/core/components/cards/Card.tsx'
import { cn } from 'src/core/lib/utils'
import TruncatedText from 'src/core/components/tooltips/TruncatedText.tsx'
import { Skeleton } from 'src/core/components/ui/skeleton.tsx'
import { isWebGLAvailable } from 'src/core/helpers/three.ts'
import { categoryPlaceholderIcons, dustPuffCount, specOptions } from 'src/modules/applications/helpers'
import usePlaceholderAnimation from 'src/modules/applications/hooks/usePlaceholderAnimation.ts'
import VehicleShowroom from 'src/modules/applications/views/VehicleShowroom.tsx'
import type { ApplicationPreviewCardProps } from 'src/modules/applications/types'

const ApplicationPreviewCard = ({ category, preview, showroom, isVertical }: ApplicationPreviewCardProps) => {
  const { t } = useTranslation()
  const { imageUrl, title, price, specs, swatches } = preview
  const PlaceholderIcon = categoryPlaceholderIcons[category]
  const hasShowroom = isWebGLAvailable()
  const placeholderRef = usePlaceholderAnimation(category, Boolean(imageUrl))

  return (
    <Card className={cn('flex h-full animate-fade-up flex-col overflow-hidden p-0 sm:p-0', !isVertical && 'sm:flex-row')} style={{ animationDelay: '200ms' }}>
      <div className={cn('relative aspect-video shrink-0 overflow-hidden bg-muted', !isVertical && 'sm:aspect-auto sm:w-2/5')}>
        {imageUrl
          ? <img src={imageUrl} alt={title ?? ''} className='size-full animate-fade-in object-cover' />
          : (
            <div className='relative flex size-full items-center justify-center bg-linear-to-br from-primary/15 via-transparent to-neon/15'>
              {hasShowroom
                ? <VehicleShowroom key={category} category={category} config={showroom} />
                : (
                  <>
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
                  </>
                )}
              <span className='pointer-events-none absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-card/80 px-2.5 py-1 text-2xs text-muted-foreground backdrop-blur'>
                <ImagePlus aria-hidden='true' className='size-3.5' />
                {t('applications.preview.noImage')}
              </span>
            </div>
          )}
      </div>

      <div className={cn('min-w-0 flex-1', isVertical ? 'space-y-4 p-5' : 'space-y-3 p-4')}>
        <div className={cn(isVertical ? 'space-y-2' : 'flex items-center justify-between gap-3')}>
          {title
            ? <h2 className='min-w-0 animate-fade-in text-base font-semibold'><TruncatedText text={title} /></h2>
            : <Skeleton className='h-6 w-1/2 rounded-lg' />}
          {price
            ? <p className='shrink-0 animate-fade-in text-lg font-bold text-gradient'>{price}</p>
            : <Skeleton className='h-7 w-1/4 shrink-0 rounded-lg' />}
        </div>

        <div className={cn('grid rounded-xl border bg-card/60 shadow-soft', isVertical ? 'grid-cols-1 gap-2 p-3' : 'grid-cols-2 gap-1.5 p-2 xl:grid-cols-4')}>
          {specOptions.map(({ value, label, icon: Icon }, index) => (
            <div
              key={value}
              className='flex animate-fade-up items-center gap-2 rounded-lg p-1'
              style={{ animationDelay: `${300 + index * 60}ms` }}
            >
              <span className='flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <Icon aria-hidden='true' />
              </span>
              <span className='min-w-0 flex-1'>
                <TruncatedText text={t(label)} className='text-2xs text-muted-foreground' />
                {specs[value]
                  ? (
                    <span key={specs[value]} className='flex animate-fade-in items-center gap-1.5 text-xs font-medium'>
                      {swatches[value] && (
                        <span
                          aria-hidden='true'
                          className='size-2.5 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.2)]'
                          style={{ backgroundColor: swatches[value] }}
                        />
                      )}
                      <TruncatedText text={specs[value]} />
                    </span>
                  )
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
