import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Lock, Mail, User } from 'lucide-react'
import Card from 'src/core/components/cards/Card.tsx'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import PasswordStrength from 'src/core/components/inputs/PasswordStrength.tsx'
import Button from 'src/core/components/buttons/Button.tsx'
import Divider from 'src/core/components/dividers/Divider.tsx'
import GoogleIcon from 'src/core/components/icons/GoogleIcon.tsx'
import CarShowcase from 'src/modules/auth/register/views/CarShowcase.tsx'
import useRegister from 'src/modules/auth/register/hooks/useRegister.ts'
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

  return (
    <main className='min-h-dvh bg-aurora lg:grid lg:grid-cols-2'>
      <section className='flex items-center justify-center px-4 pt-20 pb-10 sm:px-6 md:min-h-dvh lg:px-10 short:pt-14 short:pb-4 tight:pb-3'>
        <Card className='w-full max-w-lg animate-fade-up md:max-w-xl short:px-6 short:py-5 tight:py-4'>
          <header className='mb-8 space-y-2 short:mb-4 short:space-y-1 tight:mb-3'>
            <h1 className='text-display-sm font-bold text-center short:text-2xl tight:text-xl'>{t('register.title')}</h1>
            <p className='text-sm text-muted-foreground text-center tight:text-xs'>{t('register.subtitle')}</p>
          </header>

          <form noValidate onSubmit={handleSubmit} onAnimationEnd={handleFormAnimationEnd} className='space-y-4'>
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

          <Divider label={t('common.or')} className='my-6 short:my-1.5 tight:my-1' />

          <Button variant='outline' size='lg' fullWidth leftIcon={<GoogleIcon />} className='short:h-10'
          >{t('register.google')}
          </Button>

          <p className='mt-8 text-center text-sm text-muted-foreground short:mt-4 tight:mt-2'>
            {t('register.haveAccount')} {' '}
            <Link
              to='/login'
              className='font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline'
            >{t('register.login')}
            </Link>
          </p>
        </Card>
      </section>

      <aside className='hidden p-4 lg:block'>
        <div className='sticky top-4 h-[calc(100dvh-2rem)]'>
          <CarShowcase />
        </div>
      </aside>
    </main>
  )
}

export default Register
