import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/core/lib/utils'

const BrandLogo = ({ className }: { readonly className?: string }) => {
  const { t } = useTranslation()

  return (
    <Link
      to='/'
      aria-label='ShockAuto'
      className={cn('group flex min-w-0 items-center gap-3 rounded-xl outline-none focus-visible:ring-4 focus-visible:ring-ring/40', className)}
    >
      <span className='relative shrink-0 transition-transform duration-300 ease-spring group-hover:scale-105'>
        <span className='brand-crystal block size-10 md:size-12'>
          <img src='/logo.svg' alt='' width={48} height={48} className='size-full select-none' draggable={false} />
        </span>
        <span aria-hidden='true' className='brand-sparkle' />
      </span>

      <span className='flex min-w-0 flex-col leading-none'>
        <span
          data-text='ShockAuto'
          className='brand-wordmark self-start font-display text-xl font-bold tracking-tight md:text-2xl'
        >
          <span className='text-foreground'>Shock</span>
          <span className='text-gradient'>Auto</span>
        </span>
        <span className='hidden truncate text-2xs font-medium tracking-futuristic text-muted-foreground uppercase sm:block'>
          {t('header.tagline')}
        </span>
      </span>
    </Link>
  )
}

export default BrandLogo
