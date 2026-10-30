import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import type { CarCategoryResponse } from 'src/api/lists/carCategories/types.ts'
import type { SelectOption } from 'src/core/types/select.ts'

export const transformCarCategoriesToOptions = (carCategories: Array<CarCategoryResponse>): Array<SelectOption<ID>> =>
  carCategories.map(({ id, nameKa }) => ({ label: nameKa, value: id }))
