import type { GlobalResponse } from 'src/api/types/apiGlobalTypes.ts'
import type { ManufacturerResponse, ManufacturersData } from 'src/api/lists/manufacturers/types.ts'
import { getManufacturerLogo } from 'src/core/mappers/manufacturers.ts'
import { throwException } from 'src/core/helpers'

export const parseManufacturers = (response: GlobalResponse): ManufacturersData => {
  if (!Array.isArray(response.content)) return { data: [], status: response.status }
  const manufacturers = response.content as Array<ManufacturerResponse>
  try {
    return {
      data: manufacturers.map((manufacturer) => ({
        id: manufacturer.id,
        name: manufacturer.name ?? '',
        logo: getManufacturerLogo(manufacturer.id)
      })),
      status: response.status
    }
  } catch (err) {
    throwException(err)
    return { data: [], status: response.status }
  }
}
