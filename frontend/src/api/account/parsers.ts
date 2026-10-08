import type { GlobalResponse } from 'src/api/types/apiGlobalTypes.ts'
import type { Profile, ProfileData } from 'src/api/account/types.ts'
import { errorObject, throwException } from 'src/core/helpers'

export const parseProfile = (response: GlobalResponse): ProfileData => {
  if (response.content === null) return { data: null, status: response.status }
  const profile = response.content as Profile
  try {
    return {
      data: {
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        email: profile.email ?? '',
        dateOfBirth: profile.dateOfBirth ?? null,
        personalNumber: profile.personalNumber ?? null,
        gender: profile.gender ?? null,
        mobilePhone: profile.mobilePhone ?? null
      },
      status: response.status
    }
  } catch (err) {
    throwException(err)
    return errorObject
  }
}
