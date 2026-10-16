import type { ID, ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'

export interface ManufacturerResponse {
    readonly id: ID
    readonly name: string
}

export interface Manufacturer extends ManufacturerResponse {
    readonly logo: string | null
}

export interface ManufacturersData {
    readonly data: Array<Manufacturer>
    readonly status: ResponseStatuses
}
