export type SuccessEnvelope<T> = { data: T; meta?: Record<string, any> };
export type ErrorEnvelope = { error: { message: string; code?: string; details?: any }; meta?: any };
export type Envelope<T> = SuccessEnvelope<T> | ErrorEnvelope;