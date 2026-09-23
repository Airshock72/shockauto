import type { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'

export enum RefreshTokenStatus {
    LOCKED = 1,
    SUCCESS = 2,
    EMPTY_TOKEN = 3,
    FAILED = 4
}

export interface LoginFormValues {
    email?: string
    phoneNumber?: string
    password: string
    verificationCode?: string
}

export interface LoginParams {
    email?: string
    phoneNumber?: string
    password: string
    verificationCode?: number
}

export interface ResponseToken {
    readonly token_type: 'Bearer',
    readonly expiresIn: number,
    readonly accessToken: string
    readonly refreshToken: string
}

export interface TokenData {
    readonly data: Token | null
    readonly status: ResponseStatuses
}

export interface Token {
    readonly accessToken: string
    readonly refreshToken: string
    readonly expiresIn?: number
}