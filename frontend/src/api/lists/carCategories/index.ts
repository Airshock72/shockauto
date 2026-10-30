import * as PrivateApi from 'src/api/privateRequest'
import type { CarCategoriesData } from 'src/api/lists/carCategories/types.ts'
import { parseCarCategories } from 'src/api/lists/carCategories/parsers.ts'

export const getCarCategories = async (): Promise<CarCategoriesData> => {
  const response = await PrivateApi.get('/List/CarCategories')
  return parseCarCategories(response)
}
