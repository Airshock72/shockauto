import { useTranslation } from 'react-i18next'
import ImageSlider from 'src/core/components/sliders/ImageSlider.tsx'
import { TOP_CARS } from 'src/modules/auth/register/helpers'

const CarShowcase = () => {
  const { t } = useTranslation()

  const slides = TOP_CARS.map((slide) => ({
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
