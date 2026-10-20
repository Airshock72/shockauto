import type { GlobalResponse } from 'src/api/types/apiGlobalTypes.ts'
import type { ManufacturerResponse, ManufacturersData, ManufacturersResponse } from 'src/api/lists/manufacturers/types.ts'
import { getManufacturerLogo } from 'src/core/mappers/manufacturers.ts'
import { throwException } from 'src/core/helpers'

export const parseManufacturers = (response: GlobalResponse): ManufacturersData => {
  const emptyData = { data: { topManufacturers: [], manufacturers: [] }, status: response.status }
  if (!response.content) return emptyData
  const content = response.content as ManufacturersResponse
  try {
    const parseManufacturer = (manufacturer: ManufacturerResponse) => ({
      id: manufacturer.id,
      name: manufacturer.name ?? '',
      logo: getManufacturerLogo(manufacturer.id)
    })

    return {
      data: {
        topManufacturers: (content.topManufacturers ?? []).map(parseManufacturer),
        manufacturers: (content.manufacturers ?? []).map(parseManufacturer)
      },
      status: response.status
    }
  } catch (err) {
    throwException(err)
    return emptyData
  }
}
