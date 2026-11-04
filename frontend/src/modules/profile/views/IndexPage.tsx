import { useTranslation } from 'react-i18next'
import { Contact, IdCard, KeyRound, Mail, Phone, Save, ShieldCheck, Trash, User, UserRound } from 'lucide-react'
import Card from 'src/core/components/cards/Card.tsx'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import DatePicker from 'src/core/components/inputs/DatePicker.tsx'
import Button from 'src/core/components/buttons/Button.tsx'
import { normalizeDigits, normalizeEmail } from 'src/core/helpers/normalizers.ts'
import useProfile from 'src/modules/profile/hooks/useProfile.ts'
import { getMaxBirthDate, minBirthDate } from 'src/modules/profile/helpers'
import GenderSelect from 'src/modules/profile/views/GenderSelect.tsx'
import ActionCard from 'src/modules/profile/views/ActionCard.tsx'
import ProfileSkeleton from 'src/modules/profile/views/ProfileSkeleton.tsx'
import ProfileIdentity from 'src/modules/profile/views/ProfileIdentity.tsx'
import FormSection from 'src/modules/profile/views/FormSection.tsx'
import useProfileReveal from 'src/modules/profile/hooks/useProfileReveal.ts'
import ChangePasswordModal from 'src/modules/profile/views/ChangePasswordModal.tsx'
import DeleteAccountAlert from 'src/modules/profile/views/DeleteAccountAlert.tsx'

const IndexPage = () => {
  const { t } = useTranslation()
  const {
    userId,
    values,
    errors,
    isLoading,
    isSubmitting,
    handleChange,
    handleBirthDateChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake,
    isChangePasswordOpen,
    openChangePassword,
    closeChangePassword,
    isDeleteAccountOpen,
    openDeleteAccount,
    closeDeleteAccount
  } = useProfile()
  const pageRef = useProfileReveal(!isLoading)

  if (isLoading) {
    return (
      <main className='container flex-1 py-8 md:py-12'>
        <ProfileSkeleton />
      </main>
    )
  }

  return (
    <main ref={pageRef} className='container flex-1 py-8 md:py-12'>
      <div className='mx-auto grid w-full max-w-5xl grid-cols-1 items-start gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]'>
        <aside className='space-y-4 lg:sticky lg:top-24'>
          <ProfileIdentity firstName={values.firstName} lastName={values.lastName} email={values.email} />

          <div className='space-y-3'>
            <h2 className='flex items-center gap-2 px-1 text-2xs font-medium tracking-futuristic text-muted-foreground uppercase'>
              <ShieldCheck aria-hidden='true' className='size-3.5' />
              {t('profile.sections.security')}
            </h2>
            <ActionCard
              icon={KeyRound}
              title={t('profile.changePassword.title')}
              description={t('profile.changePassword.description')}
              aria-haspopup='dialog'
              onClick={openChangePassword}
              style={{ animationDelay: '250ms' }}
            />
            <ActionCard
              tone='destructive'
              icon={Trash}
              title={t('profile.deleteAccount.title')}
              description={t('profile.deleteAccount.description')}
              aria-haspopup='dialog'
              onClick={openDeleteAccount}
              style={{ animationDelay: '350ms' }}
            />
          </div>
        </aside>

        <Card data-reveal className='neon-edge relative'>
          <header className='mb-8 space-y-1'>
            <h1 className='text-display-sm font-bold'>{t('profile.title')}</h1>
            <p className='text-sm text-muted-foreground'>{t('profile.subtitle')}</p>
          </header>

          <form noValidate onSubmit={handleSubmit} onAnimationEnd={handleFormAnimationEnd}>
            <fieldset disabled={isSubmitting} className='min-w-0 space-y-8'>
              <FormSection icon={UserRound} title={t('profile.sections.personal')}>
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
                  max={getMaxBirthDate()}
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
              </FormSection>

              <FormSection icon={Contact} title={t('profile.sections.contact')}>
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
              </FormSection>

              <div className='flex justify-end border-t pt-6'>
                <Button type='submit' variant='primary' size='lg' loading={isSubmitting} leftIcon={<Save />} className='w-full sm:w-auto sm:min-w-40'>
                  {t('profile.save')}
                </Button>
              </div>
            </fieldset>
          </form>
        </Card>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={closeChangePassword}
      />

      <DeleteAccountAlert
        userId={userId}
        isOpen={isDeleteAccountOpen}
        onClose={closeDeleteAccount}
      />
    </main>
  )
}

export default IndexPage
