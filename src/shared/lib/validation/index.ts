import type { DataResponse } from '@/shared/types'
import { z } from 'zod'

export const dateValidation = z.preprocess(
  arg => (typeof arg === 'string' ? new Date(arg) : arg),
  z.date(),
) as z.ZodEffects<z.ZodDate, Date>

export function responseValidation<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    message: z.string(),
    data: schema.optional(),
  })
}

export function normalizeResponse<T, R>(
  schema: z.ZodType<DataResponse<T>>,
  normalizeFunction: (data: T) => R,
  response: DataResponse<T>,
): DataResponse<R> {
  const parsedResponse = schema.parse(response)

  return {
    message: parsedResponse.message,
    data: parsedResponse.data
      ? normalizeFunction(parsedResponse.data)
      : undefined,
  }
}
