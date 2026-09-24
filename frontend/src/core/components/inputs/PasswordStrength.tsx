import { Check } from 'lucide-react'
import { cn } from 'src/core/lib/utils'
import { getPasswordStrength, PASSWORD_RULES, type PasswordStrength as Strength } from 'src/core/helpers/validators.ts'

interface PasswordStrengthProps {
  readonly password: string
  readonly className?: string
}

const STRENGTH_META: Record<Strength, { readonly bars: number, readonly label: string, readonly color: string, readonly text: string }> = {
  empty: { bars: 0, label: 'შეიყვანეთ პაროლი', color: 'bg-transparent', text: 'text-muted-foreground' },
  weak: { bars: 1, label: 'სუსტი', color: 'bg-destructive', text: 'text-destructive' },
  medium: { bars: 2, label: 'საშუალო', color: 'bg-warning', text: 'text-warning' },
  strong: { bars: 3, label: 'ძლიერი', color: 'bg-success', text: 'text-success' }
}

const BAR_COUNT = 3

const PasswordStrength = ({ password, className }: PasswordStrengthProps) => {
  const strength = getPasswordStrength(password)
  const meta = STRENGTH_META[strength]

  return (
    <div className={cn('space-y-3', className)}>
      <div className='flex items-center gap-3'>
        <div className='grid flex-1 grid-cols-3 gap-1.5' aria-hidden='true'>
          {Array.from({ length: BAR_COUNT }, (_, index) => (
            <span key={index} className='h-1.5 overflow-hidden rounded-full bg-muted'>
              <span
                className={cn(
                  'block h-full origin-left rounded-full transition-[transform,background-color] duration-300 ease-fluid',
                  meta.color,
                  index < meta.bars ? 'scale-x-100' : 'scale-x-0'
                )}
              />
            </span>
          ))}
        </div>
        <span className={cn('min-w-16 text-right text-xs font-medium transition-colors', meta.text)} aria-live='polite'>
          {meta.label}
        </span>
      </div>

      <ul className='grid grid-cols-1 gap-x-4 gap-y-1.5 xs:grid-cols-2'>
        {PASSWORD_RULES.map((rule) => {
          const passed = rule.test(password)

          return (
            <li
              key={rule.id}
              className={cn(
                'flex items-center gap-2 text-xs transition-colors duration-200',
                passed ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center rounded-[5px] border transition-all duration-200 ease-spring',
                  passed ? 'scale-100 border-success bg-success text-success-foreground' : 'scale-95 border-input bg-card'
                )}
                aria-hidden='true'
              >
                <Check className={cn('size-3 stroke-3 transition-opacity', passed ? 'opacity-100' : 'opacity-0')} />
              </span>
              {rule.label}
              <span className='sr-only'>{passed ? '(met)' : '(not met)'}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PasswordStrength
