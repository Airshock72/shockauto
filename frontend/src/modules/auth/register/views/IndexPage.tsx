import { Link } from 'react-router-dom'
import { Lock, Mail, User } from 'lucide-react'
import Card from 'src/core/components/cards/Card.tsx'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import PasswordStrength from 'src/core/components/inputs/PasswordStrength.tsx'
import Button from 'src/core/components/buttons/Button.tsx'
import Divider from 'src/core/components/dividers/Divider.tsx'
import GoogleIcon from 'src/core/components/icons/GoogleIcon.tsx'
import CarShowcase from 'src/modules/auth/register/views/CarShowcase.tsx'
import useRegister from 'src/modules/auth/register/hooks/useRegister.ts'

const Register = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake
  } = useRegister()

  return (
    <main className='min-h-dvh bg-aurora lg:grid lg:grid-cols-2'>
      <section className='flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10'>
        <Card className='w-full max-w-lg animate-fade-up'>
          <header className='mb-8 space-y-2'>
            <h1 className='text-display-sm font-bold'>ანგარიშის შექმნა</h1>
            <p className='text-sm text-muted-foreground'>შემოუერთდით ShockAuto-ს და იპოვეთ თქვენთვის შესაფერისი მანქანა</p>
          </header>

          <form noValidate onSubmit={handleSubmit} onAnimationEnd={handleFormAnimationEnd} className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <TextInput
                name='firstName'
                label='სახელი'
                placeholder='სახელი'
                autoComplete='given-name'
                leftIcon={<User />}
                value={values.firstName}
                onChange={handleChange}
                error={errors.firstName}
                shake={shouldShake('firstName')}
              />
              <TextInput
                name='lastName'
                label='გვარი'
                placeholder='გვარი'
                autoComplete='family-name'
                leftIcon={<User />}
                value={values.lastName}
                onChange={handleChange}
                error={errors.lastName}
                shake={shouldShake('lastName')}
              />
            </div>

            <TextInput
              type='email'
              name='email'
              label='ელ.ფოსტა'
              placeholder='name@example.com'
              autoComplete='email'
              leftIcon={<Mail />}
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              shake={shouldShake('email')}
            />

            <div className='space-y-3'>
              <TextInput
                type='password'
                name='password'
                label='პაროლი'
                placeholder='შექმენით პაროლი'
                autoComplete='new-password'
                leftIcon={<Lock />}
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                shake={shouldShake('password')}
              />
              <PasswordStrength password={values.password} />
            </div>

            <TextInput
              type='password'
              name='repeatPassword'
              label='გაიმეორეთ პაროლი'
              placeholder='გაიმეორეთ თქვენი პაროლი'
              autoComplete='new-password'
              leftIcon={<Lock />}
              value={values.repeatPassword}
              onChange={handleChange}
              error={errors.repeatPassword}
              shake={shouldShake('repeatPassword')}
            />

            <Button type='submit' variant='primary' size='lg' fullWidth className='mt-2'>
              რეგისტრაცია
            </Button>
          </form>

          <Divider label='ან' className='my-6' />

          <Button variant='outline' size='lg' fullWidth leftIcon={<GoogleIcon />}
          >Google რეგისტრაცია
          </Button>

          <p className='mt-8 text-center text-sm text-muted-foreground'>
            გაქვს ანგარიში? {' '}
            <Link
              to='/login'
              className='font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline'
            >რეგისტრაცია
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
