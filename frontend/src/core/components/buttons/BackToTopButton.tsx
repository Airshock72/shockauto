import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/core/lib/utils'
import useBackToTop from 'src/core/hooks/buttons/useBackToTop.ts'
import {
  progressRadius,
  smokePuffCount,
  spokeAngles,
  wheelCenter,
  wheelRimRadius,
  wheelTireRadius
} from 'src/core/helpers/backToTop.ts'

const BackToTopButton = () => {
  const { t } = useTranslation()
  const { buttonRef, progressRef, arrowRef, handleClick } = useBackToTop()

  return (
    <button
      ref={buttonRef}
      type='button'
      aria-label={t('common.backToTop')}
      title={t('common.backToTop')}
      onClick={handleClick}
      className={cn(
        'group invisible fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 size-14 rounded-full opacity-0 outline-none sm:right-10 sm:bottom-6',
        'transition-[scale,filter] duration-300 ease-spring hover:scale-110 hover:drop-shadow-[0_0_14px_var(--neon)] active:scale-95',
        'focus-visible:ring-4 focus-visible:ring-primary/30'
      )}
    >
      {Array.from({ length: smokePuffCount }, (_, index) => (
        <span
          key={index}
          data-smoke
          aria-hidden='true'
          className='invisible absolute bottom-0 left-1/2 -ml-2 size-4 rounded-full bg-muted-foreground/40 opacity-0 blur-[3px]'
        />
      ))}

      <svg viewBox='0 0 64 64' aria-hidden='true' className='relative size-full drop-shadow-[0_6px_10px_rgb(0_0_0/0.3)]'>
        <defs>
          <linearGradient id='back-to-top-progress' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' style={{ stopColor: 'var(--primary)' }} />
            <stop offset='100%' style={{ stopColor: 'var(--neon)' }} />
          </linearGradient>
          <linearGradient id='back-to-top-rim' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stopColor='#f4f5f8' />
            <stop offset='55%' stopColor='#a9afbd' />
            <stop offset='100%' stopColor='#e3e6ec' />
          </linearGradient>
          <radialGradient id='back-to-top-cap'>
            <stop offset='0%' style={{ stopColor: 'var(--neon)' }} />
            <stop offset='100%' style={{ stopColor: 'var(--primary)' }} />
          </radialGradient>
        </defs>

        <circle cx={wheelCenter} cy={wheelCenter} r={progressRadius} fill='none' strokeWidth='2.5' className='stroke-border' />
        <circle
          ref={progressRef}
          cx={wheelCenter}
          cy={wheelCenter}
          r={progressRadius}
          fill='none'
          strokeWidth='2.5'
          strokeLinecap='round'
          stroke='url(#back-to-top-progress)'
          transform={`rotate(-90 ${wheelCenter} ${wheelCenter})`}
        />

        <g data-wheel-spin>
          <g data-wheel-burnout>
            <circle cx={wheelCenter} cy={wheelCenter} r={wheelTireRadius} fill='#17171d' />
            <circle
              cx={wheelCenter}
              cy={wheelCenter}
              r={wheelTireRadius - 1.5}
              fill='none'
              stroke='#ffffff'
              strokeOpacity='0.14'
              strokeWidth='2.5'
              strokeDasharray='2.2 2.8'
            />
            <circle cx={wheelCenter} cy={wheelCenter} r={wheelRimRadius} fill='#2b2c36' />
          </g>
        </g>

        <path
          d={`M ${wheelCenter - 9} ${wheelCenter + 8} A 12 12 0 0 1 ${wheelCenter - 9} ${wheelCenter - 8}`}
          fill='none'
          strokeWidth='4'
          strokeLinecap='round'
          style={{ stroke: 'var(--primary)' }}
        />

        <g data-wheel-spin>
          <g data-wheel-burnout>
            {spokeAngles.map((angle) => (
              <line
                key={angle}
                x1={wheelCenter}
                y1={wheelCenter}
                x2={wheelCenter}
                y2={wheelCenter - wheelRimRadius + 1}
                stroke='url(#back-to-top-rim)'
                strokeWidth='3.6'
                strokeLinecap='round'
                transform={`rotate(${angle} ${wheelCenter} ${wheelCenter})`}
              />
            ))}
            <circle cx={wheelCenter} cy={wheelCenter} r={wheelRimRadius} fill='none' stroke='url(#back-to-top-rim)' strokeWidth='2.6' />
          </g>
        </g>

        <circle cx={wheelCenter} cy={wheelCenter} r='7.5' fill='url(#back-to-top-cap)' />
      </svg>

      <span ref={arrowRef} aria-hidden='true' className='pointer-events-none absolute inset-0 flex items-center justify-center text-primary-foreground'>
        <ArrowUp strokeWidth={3} className='size-3 transition-[translate] duration-300 ease-spring group-hover:-translate-y-0.5' />
      </span>
    </button>
  )
}

export default BackToTopButton
