
export interface GlobalResponse {
    content: unknown | null
    status: ResponseStatuses
}

export type ID = number
export type GUID = string

export interface LabelInValue<T = string> {
    label: string
    value: T
}

export interface MetaData {
    pagination: Pagination
}

export interface Pagination {
    count: number
    perPage: number
    totalPages: number
}

export enum ResponseStatuses {
    UNEXPECTED = 1,
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHENTICATED = 401,
    NOT_FOUND = 404,
    TOO_LARGE = 413,
    SERVER_ERROR = 500
}