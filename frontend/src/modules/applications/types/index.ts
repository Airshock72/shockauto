import type { ComponentProps, ComponentType, ReactNode, RefObject } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import type { Manufacturers } from 'src/modules/lists/manufacturers/types'
import type { Models } from 'src/modules/lists/models/types'
import type { ApplicationFormValues } from 'src/modules/applications/store/createOrEditApplication.ts'

export enum ApplicationCategory {
  Car = 'Car',
  SpecialEquipment = 'SpecialEquipment',
  Motorcycle = 'Motorcycle'
}

export enum ApplicationStep {
  Characteristics = 'Characteristics',
  Location = 'Location',
  Media = 'Media',
  Price = 'Price',
  Contact = 'Contact'
}

export enum ApplicationSpec {
  Year = 'Year',
  Engine = 'Engine',
  Mileage = 'Mileage',
  Transmission = 'Transmission',
  SteeringWheel = 'SteeringWheel',
  Color = 'Color'
}

export type SpecIcon = LucideIcon | ComponentType<ComponentProps<'svg'>>

export interface CategoryOption {
  readonly value: ApplicationCategory
  readonly label: string
  readonly icon: LucideIcon
}

export interface StepOption {
  readonly value: ApplicationStep
  readonly title: string
  readonly description: string
  readonly icon: LucideIcon
}

export interface SpecOption {
  readonly value: ApplicationSpec
  readonly label: string
  readonly icon: SpecIcon
}

export interface StepProgress {
  readonly filled: number
  readonly total: number
}

export interface ApplicationPreview {
  readonly imageUrl: string | null
  readonly title: string | null
  readonly price: string | null
  readonly specs: Partial<Record<ApplicationSpec, string>>
}

export interface CreateOrEditApplication {
  readonly category: ApplicationCategory
  readonly activeStep: ApplicationStep
  readonly expandedSteps: ReadonlyArray<ApplicationStep>
  readonly preview: ApplicationPreview
  readonly values: ApplicationFormValues
  readonly stepProgress: Record<ApplicationStep, StepProgress>
  readonly manufacturers: Manufacturers
  readonly models: Models
  readonly changeCategory: (category: ApplicationCategory) => void
  readonly selectStep: (step: ApplicationStep) => void
  readonly toggleStep: (step: ApplicationStep) => void
  readonly handleManufacturerChange: (manufacturerId: ID | null) => void
  readonly handleModelChange: (modelId: ID | null) => void
  readonly handleYearChange: (year: number | null) => void
  readonly handleTrimChange: (trim: string) => void
}

export interface CharacteristicsFieldsProps {
  readonly values: ApplicationFormValues
  readonly manufacturers: Manufacturers
  readonly models: Models
  readonly onManufacturerChange: (manufacturerId: ID | null) => void
  readonly onModelChange: (modelId: ID | null) => void
  readonly onYearChange: (year: number | null) => void
  readonly onTrimChange: (trim: string) => void
}

export interface ApplicationStepperProps {
  readonly activeStep: ApplicationStep
  readonly stepProgress: Record<ApplicationStep, StepProgress>
  readonly onSelect: (step: ApplicationStep) => void
}

export interface ApplicationPreviewCardProps {
  readonly category: ApplicationCategory
  readonly preview: ApplicationPreview
}

export interface CategoryTabsProps {
  readonly value: ApplicationCategory
  readonly onChange: (category: ApplicationCategory) => void
}

export interface CategoryTabs {
  readonly containerRef: RefObject<HTMLDivElement | null>
  readonly thumbRef: RefObject<HTMLSpanElement | null>
}

export interface ExpandableSectionProps {
  readonly index: number
  readonly step: StepOption
  readonly progress: StepProgress
  readonly isExpanded: boolean
  readonly isActive: boolean
  readonly onToggle: (step: ApplicationStep) => void
  readonly children?: ReactNode
}
