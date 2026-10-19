import type { ID, ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'

export interface ModelResponse {
    readonly id: ID
    readonly name: string
}

export interface ModelsData {
    readonly data: Array<ModelResponse>
    readonly status: ResponseStatuses
}
