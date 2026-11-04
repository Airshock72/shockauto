import { useTranslation } from 'react-i18next'
import { Mail } from 'lucide-react'
import Card from 'src/core/components/cards/Card.tsx'
import { getInitials } from 'src/core/helpers/auth.ts'
import type { ProfileIdentityProps } from 'src/modules/profile/types'

const ProfileIdentity = ({ firstName, lastName, email }: ProfileIdentityProps) => {
  const { t } = useTranslation()
  const fullName = `${firstName} ${lastName}`.trim()

  return (
    <Card data-reveal className='relative overflow-hidden p-0 text-center sm:p-0'>
      <div aria-hidden='true' className='h-20 bg-linear-to-br from-primary/35 via-primary/10 to-neon/30'>
        <div className='size-full bg-[repeating-linear-gradient(115deg,transparent_0_14px,color-mix(in_oklch,var(--card)_18%,transparent)_14px_16px)]' />
      </div>

      <div className='-mt-11 flex flex-col items-center px-6 pb-6'>
        <span data-avatar className='relative grid size-22 place-items-center rounded-full p-1'>
          <span
            data-avatar-ring
            aria-hidden='true'
            className='absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--primary),var(--neon),transparent_60%,var(--primary))]'
          />
          <span className='relative grid size-full place-items-center rounded-full bg-card'>
            <span className='font-display text-2xl font-bold text-gradient'>{getInitials(fullName || email)}</span>
          </span>
        </span>

        <h2 className='mt-3 max-w-full truncate text-lg font-semibold'>{fullName || t('profile.title')}</h2>
        <p className='mt-1 flex max-w-full items-center gap-1.5 text-xs text-muted-foreground'>
          <Mail aria-hidden='true' className='size-3.5 shrink-0' />
          <span className='truncate'>{email}</span>
        </p>
      </div>
    </Card>
  )
}

export default ProfileIdentity
