import { Banknote, Car, Cog, Engine, Gauge, Images, MapPin, Motorbike, Palette, Phone, SlidersHorizontal, Tractor } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SteeringWheelIcon from 'src/assets/media/svgs/steering-wheel.svg?react'
import {
  ApplicationCategory,
  ApplicationSpec,
  ApplicationStep,
  type CategoryOption,
  type SpecOption,
  type StepOption
} from 'src/modules/applications/types'

export const categoryOptions: Array<CategoryOption> = [
  { value: ApplicationCategory.Car, label: 'applications.categories.car', icon: Car },
  { value: ApplicationCategory.SpecialEquipment, label: 'applications.categories.specialEquipment', icon: Tractor },
  { value: ApplicationCategory.Motorcycle, label: 'applications.categories.motorcycle', icon: Motorbike }
]

export const categoryPlaceholderIcons: Record<ApplicationCategory, LucideIcon> = {
  [ApplicationCategory.Car]: Car,
  [ApplicationCategory.SpecialEquipment]: Tractor,
  [ApplicationCategory.Motorcycle]: Motorbike
}

export const stepOptions: Array<StepOption> = [
  {
    value: ApplicationStep.Characteristics,
    title: 'applications.steps.characteristics.title',
    description: 'applications.steps.characteristics.description',
    icon: SlidersHorizontal
  },
  {
    value: ApplicationStep.Location,
    title: 'applications.steps.location.title',
    description: 'applications.steps.location.description',
    icon: MapPin
  },
  {
    value: ApplicationStep.Media,
    title: 'applications.steps.media.title',
    description: 'applications.steps.media.description',
    icon: Images
  },
  {
    value: ApplicationStep.Price,
    title: 'applications.steps.price.title',
    description: 'applications.steps.price.description',
    icon: Banknote
  },
  {
    value: ApplicationStep.Contact,
    title: 'applications.steps.contact.title',
    description: 'applications.steps.contact.description',
    icon: Phone
  }
]

export const specOptions: Array<SpecOption> = [
  { value: ApplicationSpec.Engine, label: 'applications.specs.engine', icon: Engine },
  { value: ApplicationSpec.Mileage, label: 'applications.specs.mileage', icon: Gauge },
  { value: ApplicationSpec.Transmission, label: 'applications.specs.transmission', icon: Cog },
  { value: ApplicationSpec.SteeringWheel, label: 'applications.specs.steeringWheel', icon: SteeringWheelIcon },
  { value: ApplicationSpec.Color, label: 'applications.specs.color', icon: Palette }
]

export const getStepIndex = (step: ApplicationStep): number =>
  stepOptions.findIndex(({ value }) => value === step)

export const dustPuffCount = 5
