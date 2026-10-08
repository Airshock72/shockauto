import type { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'

export type Gender = 'Male' | 'Female'

export interface Profile {
    readonly firstName: string
    readonly lastName: string
    readonly email: string
    readonly dateOfBirth: string | null
    readonly personalNumber: string | null
    readonly gender: Gender | null
    readonly mobilePhone: string | null
}

export interface ProfileData {
    readonly data: Profile | null
    readonly status: ResponseStatuses
}
