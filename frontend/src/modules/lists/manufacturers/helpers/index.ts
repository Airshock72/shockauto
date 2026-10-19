import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import type { Manufacturer } from 'src/api/lists/manufacturers/types.ts'
import type { SelectOption } from 'src/core/types/select.ts'

export const transformManufacturersToOptions = (manufacturers: Array<Manufacturer>): Array<SelectOption<ID>> =>
  manufacturers.map(({ id, name, logo }) => ({ label: name, value: id, icon: logo }))

export const featuredManufacturerIds: Array<ID> = [40, 25, 3, 16, 14, 12, 77, 29, 2, 5]
