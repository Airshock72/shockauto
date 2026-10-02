import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Lock, Mail } from 'lucide-react'
import Card from 'src/core/components/cards/Card.tsx'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import PasswordStrength from 'src/core/components/inputs/PasswordStrength.tsx'
import Button from 'src/core/components/buttons/Button.tsx'
import Divider from 'src/core/components/dividers/Divider.tsx'
import GoogleIcon from 'src/core/components/icons/GoogleIcon.tsx'
import CarShowcase from 'src/modules/auth/login/views/CarShowcase.tsx'
import useLogin from 'src/modules/auth/login/hooks/useLogin.ts'
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

  return (
    <main className='min-h-dvh bg-aurora lg:grid lg:grid-cols-2'>
      <section className='flex items-center justify-center px-4 pt-20 pb-10 sm:px-6 lg:px-10'>
        <Card className='w-full max-w-lg animate-fade-up'>
          <header className='mb-8 space-y-2'>
            <h1 className='text-display-sm font-bold text-center'>{t('login.title')}</h1>
            <p className='text-sm text-muted-foreground text-center'>{t('login.subtitle')}</p>
          </header>

          <form noValidate onSubmit={handleSubmit} onAnimationEnd={handleFormAnimationEnd} className='space-y-4'>
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

            <div className='space-y-3'>
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

            <Button type='submit' variant='primary' size='lg' fullWidth loading={isLoading} className='mt-2'>
              {t('login.submit')}
            </Button>
          </form>

          <Divider label={t('common.or')} className='my-6' />

          <Button variant='outline' size='lg' fullWidth leftIcon={<GoogleIcon />}
          >{t('login.google')}
          </Button>

          <p className='mt-8 text-center text-sm text-muted-foreground'>
            {t('login.noAccount')} {' '}
            <Link
              to='/register'
              className='font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline'
            >{t('login.register')}
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

export default Login
