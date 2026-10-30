import type { ID, ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'

export enum CarCategoryName {
    Sedan = 'Sedan',
    Jeep = 'Jeep',
    Coupe = 'Coupe',
    Hatchback = 'Hatchback',
    StationWagon = 'StationWagon',
    Convertible = 'Convertible',
    Pickup = 'Pickup',
    Minivan = 'Minivan',
    Limousine = 'Limousine',
    Crossover = 'Crossover'
}

export interface CarCategoryResponse {
    readonly id: ID
    readonly name: CarCategoryName
    readonly nameKa: string
}

export interface CarCategoriesData {
    readonly data: Array<CarCategoryResponse>
    readonly status: ResponseStatuses
}
