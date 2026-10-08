import * as PrivateApi from 'src/api/privateRequest'
import type { ProfileData } from 'src/api/account/types.ts'
import { parseProfile } from 'src/api/account/parsers.ts'

export const getProfile = async (): Promise<ProfileData> => {
  const response = await PrivateApi.get('/Account/Profile')
  return parseProfile(response)
}
