import type { Slide } from 'src/core/types/ImageSlider.ts'
import type { LoginFormValues } from 'src/modules/auth/login/store/login.ts'
import type { LoginParams } from 'src/api/auth/types.ts'

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=80`

export const LOGIN_CARS: Array<Slide> = [
  {
    src: unsplash('1621135802920-133df287f89c'),
    accent: '#1e7bff',
    alt: 'login.showcase.mclaren.alt',
    eyebrow: '· McLaren',
    title: 'McLaren 720S',
    subtitle: 'login.showcase.mclaren.subtitle'
  },
  {
    src: unsplash('1600712242805-5f78671b24da'),
    accent: '#c9b48a',
    alt: 'login.showcase.bugatti.alt',
    eyebrow: '· Bugatti',
    title: 'Bugatti Chiron',
    subtitle: 'login.showcase.bugatti.subtitle'
  },
  {
    src: unsplash('1618843479313-40f8afb4b4d8'),
    accent: '#facc15',
    alt: 'login.showcase.astonMartin.alt',
    eyebrow: '· Aston Martin',
    title: 'Aston Martin DBS',
    subtitle: 'login.showcase.astonMartin.subtitle'
  },
  {
    src: unsplash('1606664515524-ed2f786a0bd6'),
    accent: '#94a3b8',
    alt: 'login.showcase.rollsRoyce.alt',
    eyebrow: '· Rolls-Royce',
    title: 'Rolls-Royce Wraith',
    subtitle: 'login.showcase.rollsRoyce.subtitle'
  },
  {
    src: unsplash('1494976388531-d1058494cdd8'),
    accent: '#64748b',
    alt: 'login.showcase.mustang.alt',
    eyebrow: '· Ford',
    title: 'Ford Mustang',
    subtitle: 'login.showcase.mustang.subtitle'
  },
  {
    src: unsplash('1552519507-da3b142c6e3d'),
    accent: '#0ea5e9',
    alt: 'login.showcase.corvette.alt',
    eyebrow: '· Chevrolet',
    title: 'Chevrolet Corvette',
    subtitle: 'login.showcase.corvette.subtitle'
  },
  {
    src: unsplash('1542362567-b07e54358753'),
    accent: '#cbd5e1',
    alt: 'login.showcase.nissan.alt',
    eyebrow: '· Nissan',
    title: 'Nissan GT-R',
    subtitle: 'login.showcase.nissan.subtitle'
  }
]

export const FIELD_ORDER: Array<keyof LoginFormValues> = ['email', 'password']

export const transformLoginParams = (values: LoginFormValues): LoginParams => ({
  email: values.email.trim(),
  password: values.password
})
