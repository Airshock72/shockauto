import type { Slide } from 'src/core/types/ImageSlider.ts'
import type { RegisterFormValues } from 'src/modules/auth/register/store/register.ts'

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=80`

export const TOP_CARS: Array<Slide> = [
  {
    src: unsplash('1583121274602-3e2820c69888'),
    alt: 'Red Ferrari LaFerrari parked in a bright garage',
    eyebrow: '· Ferrari',
    title: 'Ferrari LaFerrari',
    subtitle: 'Hybrid V12 hypercar with 950 hp and a soundtrack from Maranello.'
  },
  {
    src: unsplash('1612825173281-9a193378527e'),
    alt: 'Orange Lamborghini Huracán EVO Spyder parked in a garage',
    position: '35% center',
    eyebrow: '· Lamborghini',
    title: 'Lamborghini Huracán EVO',
    subtitle: 'Naturally aspirated V10 with 640 hp and an open-top roar.'
  },
  {
    src: unsplash('1503376780353-7e6692767b70'),
    alt: 'Black Porsche Panamera Turbo driving on a highway',
    eyebrow: '· Porsche',
    title: 'Porsche Panamera Turbo',
    subtitle: 'Four-door comfort with genuine 911 DNA.'
  },
  {
    src: unsplash('1603584173870-7f23fdae1b7a'),
    alt: 'Matte grey Audi R8 on a winding road at golden hour',
    eyebrow: '· Audi',
    title: 'Audi R8',
    subtitle: 'Mid-engine V10 with quattro all-wheel drive.'
  },
  {
    src: unsplash('1617814065893-00757125efab'),
    alt: 'Matte black Mercedes-AMG GT parked on a harbor quay in Monaco',
    eyebrow: '· Mercedes-AMG',
    title: 'Mercedes-AMG GT',
    subtitle: 'Hand-built biturbo V8 from Affalterbach.'
  },
  {
    src: unsplash('1549399542-7e3f8b79c341'),
    alt: 'Red BMW M4 on a palm-lined street',
    eyebrow: '· BMW',
    title: 'BMW M4',
    subtitle: 'Twin-turbo inline-six tuned for the track and the street.'
  },
  {
    src: unsplash('1648413653819-7c0fd93e8e6a'),
    alt: 'Black Mercedes-Benz G-Class on a wet asphalt track',
    eyebrow: '· Mercedes-Benz',
    title: 'Mercedes-Benz G-Class',
    subtitle: 'An off-road icon, refined for the city.'
  }
]

export const FIELD_ORDER: Array<keyof RegisterFormValues> = ['firstName', 'lastName', 'email', 'password', 'repeatPassword']
