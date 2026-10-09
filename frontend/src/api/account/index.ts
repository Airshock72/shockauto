import * as PrivateApi from 'src/api/privateRequest'
import type { ChangePasswordParams, ProfileData, ProfileParams } from 'src/api/account/types.ts'
import type { GlobalResponse } from 'src/api/types/apiGlobalTypes.ts'
import { parseProfile } from 'src/api/account/parsers.ts'

export const getProfile = async (): Promise<ProfileData> => {
  const response = await PrivateApi.get('/Account/Profile')
  return parseProfile(response)
}

export const updateProfile = (params: ProfileParams): Promise<GlobalResponse> => {
  return PrivateApi.put('/Account/Profile', params)
}

export const deleteProfile = (): Promise<GlobalResponse> => {
  return PrivateApi.deleteItem('/Account/Profile')
}

export const changePassword = (params: ChangePasswordParams): Promise<GlobalResponse> => {
  return PrivateApi.put('/Account/ChangePassword', params)
}
