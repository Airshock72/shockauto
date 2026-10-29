import type { ID, ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'

export enum GasolineTypeKind {
    Common = 'Common',
    Hybrid = 'Hybrid',
    Gas = 'Gas'
}

export interface GasolineTypeResponse {
    readonly id: ID
    readonly name: string
    readonly type: GasolineTypeKind
}

export interface GasolineTypesData {
    readonly data: Array<GasolineTypeResponse>
    readonly status: ResponseStatuses
}
