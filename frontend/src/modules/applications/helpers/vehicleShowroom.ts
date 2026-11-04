import { createShowroom } from 'src/modules/applications/helpers/showroom.ts'
import { createMotorcycleShowroom } from 'src/modules/applications/helpers/motorcycle.ts'
import { createExcavatorShowroom } from 'src/modules/applications/helpers/excavator.ts'
import { ApplicationCategory, type ShowroomFactory } from 'src/modules/applications/types'

export const showroomFactories: Record<ApplicationCategory, ShowroomFactory> = {
  [ApplicationCategory.Car]: createShowroom,
  [ApplicationCategory.SpecialEquipment]: createExcavatorShowroom,
  [ApplicationCategory.Motorcycle]: createMotorcycleShowroom
}
