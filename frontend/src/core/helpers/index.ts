import { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'

export const throwException = (err: unknown): void => console.error(err)

export const errorObject = {
  data: null,
  status: ResponseStatuses.UNEXPECTED
}