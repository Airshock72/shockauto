import type { ID, ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'

export interface ModelResponse {
    readonly id: ID
    readonly name: string
}

export interface ModelsResponse {
    readonly topModels: Array<ModelResponse>
    readonly models: Array<ModelResponse>
}

export interface ModelsData {
    readonly data: ModelsResponse
    readonly status: ResponseStatuses
}
