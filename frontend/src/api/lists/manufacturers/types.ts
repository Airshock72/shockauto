import type { ID, ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'

export interface ManufacturerResponse {
    readonly id: ID
    readonly name: string
}

export interface ManufacturersResponse {
    readonly topManufacturers: Array<ManufacturerResponse>
    readonly manufacturers: Array<ManufacturerResponse>
}

export interface Manufacturer extends ManufacturerResponse {
    readonly logo: string | null
}

export interface ManufacturersData {
    readonly data: {
        readonly topManufacturers: Array<Manufacturer>
        readonly manufacturers: Array<Manufacturer>
    }
    readonly status: ResponseStatuses
}
