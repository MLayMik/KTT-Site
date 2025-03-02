import type { z } from 'zod'
import { QueryClient } from '@tanstack/react-query'
import { setupWorker } from 'msw/browser'
import { handlers } from '../handlers'
import { RestClient } from './RestClient'

export const queryClient = new QueryClient(
  { defaultOptions: { queries: { refetchOnWindowFocus: false } } },
)

export const client = new RestClient()

interface EndpointAndSchema {
  url: string | ((...args: any) => string)
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  schema?: z.ZodTypeAny
}

export type ApiEndpointsAndSchemas = Record<string, EndpointAndSchema>

export const worker = setupWorker(...handlers)
