import type { GlobalResponse } from 'src/api/types/apiGlobalTypes.ts'
import type { CarCategoriesData, CarCategoryResponse } from 'src/api/lists/carCategories/types.ts'
import { throwException } from 'src/core/helpers'

export const parseCarCategories = (response: GlobalResponse): CarCategoriesData => {
  if (!response.content) return { data: [], status: response.status }
  const content = response.content as Array<CarCategoryResponse>
  try {
    return {
      data: content.map((carCategory) => ({
        id: carCategory.id,
        name: carCategory.name,
        nameKa: carCategory.nameKa ?? ''
      })),
      status: response.status
    }
  } catch (err) {
    throwException(err)
    return { data: [], status: response.status }
  }
}
