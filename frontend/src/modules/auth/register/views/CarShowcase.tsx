import ImageSlider from 'src/core/components/sliders/ImageSlider.tsx'
import { TOP_CARS } from 'src/modules/auth/register/helpers'

const CarShowcase = () => {
  return <ImageSlider
    slides={TOP_CARS}
    interval={5000}
    className='size-full'
  />
}

export default CarShowcase
