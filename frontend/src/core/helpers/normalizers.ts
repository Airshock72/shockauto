export type Normalizer = (value: string) => string

export const normalizeEmail: Normalizer = (value) => value.replace(/[^A-Za-z0-9@._+-]/g, '')
