import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Lock, Mail, User } from 'lucide-react'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import PasswordStrength from 'src/core/components/inputs/PasswordStrength.tsx'
import Button from 'src/core/components/buttons/Button.tsx'
import Divider from 'src/core/components/dividers/Divider.tsx'
import GoogleIcon from 'src/assets/media/svgs/google.svg?react'
import CarShowcase from 'src/modules/auth/register/views/CarShowcase.tsx'
import useRegister from 'src/modules/auth/register/hooks/useRegister.ts'
import useCarAccent from 'src/core/hooks/useCarAccent.ts'
import AuthShell from 'src/modules/auth/shared/views/AuthShell.tsx'
import { normalizeEmail } from 'src/core/helpers/normalizers.ts'

const Register = () => {
  const { t } = useTranslation()
  const {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake
  } = useRegister()
  const { pageRef, handleSlideChange } = useCarAccent()

  return (
    <AuthShell
      pageRef={pageRef}
      title={t('register.title')}
      subtitle={t('register.subtitle')}
      showcase={<CarShowcase onSlideChange={handleSlideChange} />}
      className='md:max-w-xl'
      footer={(
        <>
          {t('register.haveAccount')} {' '}
          <Link
            to='/login'
            className='font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline'
          >{t('register.login')}
          </Link>
        </>
      )}
    >
      <form data-reveal noValidate onSubmit={handleSubmit} onAnimationEnd={handleFormAnimationEnd} className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 short:gap-3'>
          <TextInput
            name='firstName'
            label={t('register.firstName')}
            placeholder={t('register.firstName')}
            autoComplete='given-name'
            leftIcon={<User />}
            value={values.firstName}
            onChange={handleChange}
            error={errors.firstName && t(errors.firstName)}
            shake={shouldShake('firstName')}
          />
          <TextInput
            name='lastName'
            label={t('register.lastName')}
            placeholder={t('register.lastName')}
            autoComplete='family-name'
            leftIcon={<User />}
            value={values.lastName}
            onChange={handleChange}
            error={errors.lastName && t(errors.lastName)}
            shake={shouldShake('lastName')}
          />
        </div>

        <TextInput
          type='email'
          name='email'
          label={t('register.email')}
          placeholder='name@example.com'
          autoComplete='email'
          leftIcon={<Mail />}
          normalizer={normalizeEmail}
          value={values.email}
          onChange={handleChange}
          error={errors.email && t(errors.email)}
          shake={shouldShake('email')}
        />

        <div className='space-y-3 md:space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 short:gap-3'>
            <TextInput
              type='password'
              name='password'
              label={t('register.password')}
              placeholder={t('register.passwordPlaceholder')}
              autoComplete='new-password'
              leftIcon={<Lock />}
              value={values.password}
              onChange={handleChange}
              error={errors.password && t(errors.password)}
              shake={shouldShake('password')}
            />
            <TextInput
              type='password'
              name='repeatPassword'
              label={t('register.repeatPassword')}
              placeholder={t('register.repeatPasswordPlaceholder')}
              autoComplete='new-password'
              leftIcon={<Lock />}
              value={values.repeatPassword}
              onChange={handleChange}
              error={errors.repeatPassword && t(errors.repeatPassword)}
              shake={shouldShake('repeatPassword')}
            />
          </div>
          <PasswordStrength password={values.password} />
        </div>

        <Button type='submit' variant='primary' size='lg' fullWidth loading={isLoading} className='mt-2 short:mt-1 short:h-10'>
          {t('register.submit')}
        </Button>
      </form>

      <div data-reveal>
        <Divider label={t('common.or')} className='my-6 short:my-1.5 tight:my-1' />
      </div>

      <Button data-reveal variant='outline' size='lg' fullWidth leftIcon={<GoogleIcon aria-hidden='true' />} className='short:h-10'
      >{t('register.google')}
      </Button>
    </AuthShell>
  )
}

export default Register
