import * as PrivateApi from 'src/api/privateRequest'
import type { ManufacturersData } from 'src/api/lists/manufacturers/types.ts'
import { parseManufacturers } from 'src/api/lists/manufacturers/parsers.ts'

export const getManufacturers = async (): Promise<ManufacturersData> => {
  const response = await PrivateApi.get('/List/Manufacturers')
  return parseManufacturers(response)
}
