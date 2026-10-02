import { useTranslation } from 'react-i18next'
import ImageSlider from 'src/core/components/sliders/ImageSlider.tsx'
import { LOGIN_CARS } from 'src/modules/auth/login/helpers'

const CarShowcase = () => {
  const { t } = useTranslation()

  const slides = LOGIN_CARS.map((slide) => ({
    ...slide,
    alt: t(slide.alt),
    subtitle: slide.subtitle && t(slide.subtitle)
  }))

  return <ImageSlider
    slides={slides}
    interval={5000}
    className='size-full'
  />
}

export default CarShowcase
