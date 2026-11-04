import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Lock, Mail } from 'lucide-react'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import PasswordStrength from 'src/core/components/inputs/PasswordStrength.tsx'
import Button from 'src/core/components/buttons/Button.tsx'
import Divider from 'src/core/components/dividers/Divider.tsx'
import GoogleIcon from 'src/assets/media/svgs/google.svg?react'
import CarShowcase from 'src/modules/auth/login/views/CarShowcase.tsx'
import useLogin from 'src/modules/auth/login/hooks/useLogin.ts'
import useCarAccent from 'src/core/hooks/useCarAccent.ts'
import AuthShell from 'src/modules/auth/shared/views/AuthShell.tsx'
import { normalizeEmail } from 'src/core/helpers/normalizers.ts'

const Login = () => {
  const { t } = useTranslation()
  const {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake
  } = useLogin()
  const { pageRef, handleSlideChange } = useCarAccent()

  return (
    <AuthShell
      pageRef={pageRef}
      title={t('login.title')}
      subtitle={t('login.subtitle')}
      showcase={<CarShowcase onSlideChange={handleSlideChange} />}
      footer={(
        <>
          {t('login.noAccount')} {' '}
          <Link
            to='/register'
            className='font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline'
          >{t('login.register')}
          </Link>
        </>
      )}
    >
      <form data-reveal noValidate onSubmit={handleSubmit} onAnimationEnd={handleFormAnimationEnd} className='space-y-4'>
        <TextInput
          type='email'
          name='email'
          label={t('login.email')}
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
          <TextInput
            type='password'
            name='password'
            label={t('login.password')}
            placeholder={t('login.passwordPlaceholder')}
            autoComplete='current-password'
            leftIcon={<Lock />}
            value={values.password}
            onChange={handleChange}
            error={errors.password && t(errors.password)}
            shake={shouldShake('password')}
          />
          <PasswordStrength password={values.password} />
          <div className='flex justify-end'>
            <Link
              to='/reset-password'
              className='text-sm font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80'
            >{t('login.forgotPassword')}
            </Link>
          </div>
        </div>

        <Button type='submit' variant='primary' size='lg' fullWidth loading={isLoading} className='mt-2 short:mt-1 short:h-10'>
          {t('login.submit')}
        </Button>
      </form>

      <div data-reveal>
        <Divider label={t('common.or')} className='my-6 short:my-1.5' />
      </div>

      <Button data-reveal variant='outline' size='lg' fullWidth leftIcon={<GoogleIcon aria-hidden='true' />} className='short:h-10'
      >{t('login.google')}
      </Button>
    </AuthShell>
  )
}

export default Login
