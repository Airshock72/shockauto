import type { Slide } from 'src/core/types/ImageSlider.ts'
import type { RegisterFormValues } from 'src/modules/auth/register/store/register.ts'
import type { RegisterParams } from 'src/api/auth/types.ts'

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=80`

export const TOP_CARS: Array<Slide> = [
  {
    src: unsplash('1583121274602-3e2820c69888'),
    alt: 'register.showcase.ferrari.alt',
    eyebrow: '· Ferrari',
    title: 'Ferrari LaFerrari',
    subtitle: 'register.showcase.ferrari.subtitle'
  },
  {
    src: unsplash('1612825173281-9a193378527e'),
    alt: 'register.showcase.lamborghini.alt',
    position: '35% center',
    eyebrow: '· Lamborghini',
    title: 'Lamborghini Huracán EVO',
    subtitle: 'register.showcase.lamborghini.subtitle'
  },
  {
    src: unsplash('1503376780353-7e6692767b70'),
    alt: 'register.showcase.porsche.alt',
    eyebrow: '· Porsche',
    title: 'Porsche Panamera Turbo',
    subtitle: 'register.showcase.porsche.subtitle'
  },
  {
    src: unsplash('1603584173870-7f23fdae1b7a'),
    alt: 'register.showcase.audi.alt',
    eyebrow: '· Audi',
    title: 'Audi R8',
    subtitle: 'register.showcase.audi.subtitle'
  },
  {
    src: unsplash('1617814065893-00757125efab'),
    alt: 'register.showcase.mercedesAmg.alt',
    eyebrow: '· Mercedes-AMG',
    title: 'Mercedes-AMG GT',
    subtitle: 'register.showcase.mercedesAmg.subtitle'
  },
  {
    src: unsplash('1549399542-7e3f8b79c341'),
    alt: 'register.showcase.bmw.alt',
    eyebrow: '· BMW',
    title: 'BMW M4',
    subtitle: 'register.showcase.bmw.subtitle'
  },
  {
    src: unsplash('1648413653819-7c0fd93e8e6a'),
    alt: 'register.showcase.mercedesG.alt',
    eyebrow: '· Mercedes-Benz',
    title: 'Mercedes-Benz G-Class',
    subtitle: 'register.showcase.mercedesG.subtitle'
  }
]

export const FIELD_ORDER: Array<keyof RegisterFormValues> = ['firstName', 'lastName', 'email', 'password', 'repeatPassword']

export const transformRegisterUserParams = (values: RegisterFormValues): RegisterParams => ({
  firstName: values.firstName.trim(),
  lastName: values.lastName.trim(),
  email: values.email.trim(),
  password: values.password
})
