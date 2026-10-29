import { Banknote, CalendarDays, Car, Cog, Engine, Gauge, Images, MapPin, Motorbike, Palette, Phone, SlidersHorizontal, Tractor } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SteeringWheelIcon from 'src/assets/media/svgs/steering-wheel.svg?react'
import type { ApplicationFormValues } from 'src/modules/applications/store/createOrEditApplication.ts'
import {
  ApplicationCategory,
  ApplicationSpec,
  ApplicationStep,
  type CategoryOption,
  type SpecOption,
  type StepOption,
  type StepProgress
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
  { value: ApplicationSpec.Year, label: 'applications.specs.year', icon: CalendarDays },
  { value: ApplicationSpec.Engine, label: 'applications.specs.engine', icon: Engine },
  { value: ApplicationSpec.Mileage, label: 'applications.specs.mileage', icon: Gauge },
  { value: ApplicationSpec.Transmission, label: 'applications.specs.transmission', icon: Cog },
  { value: ApplicationSpec.SteeringWheel, label: 'applications.specs.steeringWheel', icon: SteeringWheelIcon },
  { value: ApplicationSpec.Color, label: 'applications.specs.color', icon: Palette }
]

export const getStepIndex = (step: ApplicationStep): number =>
  stepOptions.findIndex(({ value }) => value === step)

export const dustPuffCount = 5

export const minYearDate = '1900-01-01'

export const trimMaxLength = 32

export const toYear = (value: string): number | null => value ? Number(value) : null

export const stepRequiredFields: Record<ApplicationStep, Array<keyof ApplicationFormValues>> = {
  [ApplicationStep.Characteristics]: ['manufacturerId', 'modelId', 'year'],
  [ApplicationStep.Location]: [],
  [ApplicationStep.Media]: [],
  [ApplicationStep.Price]: [],
  [ApplicationStep.Contact]: []
}

export const getStepProgress = (step: ApplicationStep, values: ApplicationFormValues): StepProgress => {
  const fields = stepRequiredFields[step]
  return { filled: fields.filter((field) => values[field] !== null).length, total: fields.length }
}

export const isStepCompleted = ({ filled, total }: StepProgress): boolean => total > 0 && filled === total
