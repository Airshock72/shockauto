import { useTranslation } from 'react-i18next'
import { IdCard, KeyRound, Mail, Phone, Save, Trash, User, UserPen } from 'lucide-react'
import Card from 'src/core/components/cards/Card.tsx'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import DatePicker from 'src/core/components/inputs/DatePicker.tsx'
import Button from 'src/core/components/buttons/Button.tsx'
import Divider from 'src/core/components/dividers/Divider.tsx'
import { normalizeDigits, normalizeEmail } from 'src/core/helpers/normalizers.ts'
import { getTodayIso } from 'src/core/helpers/datePicker.ts'
import useProfile from 'src/modules/profile/hooks/useProfile.ts'
import { minBirthDate } from 'src/modules/profile/helpers'
import GenderSelect from 'src/modules/profile/views/GenderSelect.tsx'
import ActionCard from 'src/modules/profile/views/ActionCard.tsx'
import ProfileSkeleton from 'src/modules/profile/views/ProfileSkeleton.tsx'

const IndexPage = () => {
  const { t } = useTranslation()
  const {
    values,
    errors,
    isLoading,
    handleChange,
    handleBirthDateChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake
  } = useProfile()

  if (isLoading) {
    return (
      <main className='container flex-1 py-8 md:py-12'>
        <ProfileSkeleton />
      </main>
    )
  }

  return (
    <main className='container flex-1 py-8 md:py-12'>
      <Card className='neon-edge relative mx-auto w-full max-w-3xl animate-fade-up'>
        <header className='mb-8 flex items-center gap-4'>
          <span className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-neon text-primary-foreground shadow-[0_0_14px_-3px_var(--neon)]'>
            <UserPen aria-hidden='true' />
          </span>
          <div className='space-y-1'>
            <h1 className='text-display-sm font-bold'>{t('profile.title')}</h1>
            <p className='text-sm text-muted-foreground'>{t('profile.subtitle')}</p>
          </div>
        </header>

        <form noValidate onSubmit={handleSubmit} onAnimationEnd={handleFormAnimationEnd}>
          <div className='grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2'>
            <TextInput
              name='firstName'
              label={`${t('profile.firstName')} *`}
              placeholder={t('profile.firstName')}
              autoComplete='given-name'
              leftIcon={<User />}
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName && t(errors.firstName)}
              shake={shouldShake('firstName')}
            />
            <TextInput
              name='lastName'
              label={`${t('profile.lastName')} *`}
              placeholder={t('profile.lastName')}
              autoComplete='family-name'
              leftIcon={<User />}
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName && t(errors.lastName)}
              shake={shouldShake('lastName')}
            />
            <GenderSelect
              name='gender'
              label={`${t('profile.gender')} *`}
              value={values.gender ?? ''}
              onChange={handleChange}
              error={errors.gender && t(errors.gender)}
              shake={shouldShake('gender')}
            />
            <DatePicker
              name='birthDate'
              label={`${t('profile.birthDate')} *`}
              placeholder={t('profile.birthDatePlaceholder')}
              min={minBirthDate}
              max={getTodayIso()}
              value={values.birthDate ?? ''}
              onValueChange={handleBirthDateChange}
              error={errors.birthDate && t(errors.birthDate)}
              shake={shouldShake('birthDate')}
            />
            <TextInput
              name='personalNumber'
              label={t('profile.personalNumber')}
              placeholder='01234567890'
              inputMode='numeric'
              maxLength={11}
              leftIcon={<IdCard />}
              normalizer={normalizeDigits}
              value={values.personalNumber ?? ''}
              onChange={handleChange}
              error={errors.personalNumber && t(errors.personalNumber)}
              shake={shouldShake('personalNumber')}
            />
            <TextInput
              type='email'
              name='email'
              label={`${t('profile.email')} *`}
              placeholder='name@example.com'
              autoComplete='email'
              disabled
              leftIcon={<Mail />}
              normalizer={normalizeEmail}
              value={values.email}
              onChange={handleChange}
              error={errors.email && t(errors.email)}
              shake={shouldShake('email')}
            />
            <TextInput
              type='tel'
              name='phoneNumber'
              label={t('profile.phoneNumber')}
              placeholder='5XXXXXXXX'
              autoComplete='tel-national'
              inputMode='numeric'
              maxLength={9}
              leftIcon={<Phone />}
              normalizer={normalizeDigits}
              value={values.phoneNumber ?? ''}
              onChange={handleChange}
              error={errors.phoneNumber && t(errors.phoneNumber)}
              shake={shouldShake('phoneNumber')}
            />
          </div>

          <Divider className='my-8' />

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <ActionCard
              icon={KeyRound}
              title={t('profile.changePassword.title')}
              description={t('profile.changePassword.description')}
              style={{ animationDelay: '150ms' }}
            />
            <ActionCard
              tone='destructive'
              icon={Trash}
              title={t('profile.deleteAccount.title')}
              description={t('profile.deleteAccount.description')}
              style={{ animationDelay: '250ms' }}
            />
          </div>

          <Divider className='my-8' />

          <div className='flex justify-end'>
            <Button type='submit' variant='primary' size='lg' leftIcon={<Save />} className='w-full sm:w-auto sm:min-w-40'>
              {t('profile.save')}
            </Button>
          </div>
        </form>
      </Card>
    </main>
  )
}

export default IndexPage
