import { Check } from 'lucide-react'
import { cn } from 'src/core/lib/utils'

interface CircularProgressProps {
  readonly value: number
  readonly max: number
  readonly className?: string
}

const radius = 9
const circumference = 2 * Math.PI * radius

const CircularProgress = ({ value, max, className }: CircularProgressProps) => {
  const ratio = max > 0 ? Math.min(value / max, 1) : 0
  const isComplete = max > 0 && value >= max

  return (
    <span
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn('relative flex size-6 shrink-0 items-center justify-center', className)}
    >
      <svg viewBox='0 0 24 24' aria-hidden='true' className='absolute inset-0 size-full -rotate-90'>
        <circle cx='12' cy='12' r={radius} fill='none' strokeWidth='2.5' className='stroke-border' />
        <circle
          cx='12'
          cy='12'
          r={radius}
          fill='none'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
          className='stroke-primary transition-[stroke-dashoffset] duration-500 ease-fluid'
        />
      </svg>
      {isComplete && <Check aria-hidden='true' strokeWidth={3} className='relative size-3 animate-scale-in text-primary' />}
    </span>
  )
}

export default CircularProgress
