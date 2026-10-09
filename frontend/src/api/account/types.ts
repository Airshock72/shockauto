import type { GUID, ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'

export type Gender = 'Male' | 'Female'

export interface Profile {
    readonly userId: GUID
    readonly firstName: string
    readonly lastName: string
    readonly email: string
    readonly dateOfBirth: string | null
    readonly personalNumber: string | null
    readonly gender: Gender | null
    readonly mobilePhone: string | null
}

export interface ProfileParams {
    readonly firstName: string
    readonly lastName: string
    readonly email: string
    readonly birthDate: string | null
    readonly personalNumber: string | null
    readonly gender: Gender | null
    readonly mobilePhone: string | null
}

export interface DeleteProfileParams {
    readonly userId: GUID
}

export interface ChangePasswordParams {
    readonly newPassword: string
}

export interface ProfileData {
    readonly data: Profile | null
    readonly status: ResponseStatuses
}
