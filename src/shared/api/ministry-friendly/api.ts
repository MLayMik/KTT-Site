import { normalizeResponse, responseValidation } from '@/shared/lib/validation'
import { type ApiEndpointsAndSchemas, client } from '../lib'
import { normalizeMinistryFriendly } from './normalizers'
import { ministryFriendlySchema } from './types'

export const endpoints = {
  create: {
    url: '/api/ministry-friendly',
    method: 'post',
    schema: responseValidation(ministryFriendlySchema),
  },
  update: {
    url: (
      { id }: Pick<UpdateMinistryFriendlyParams, 'id'>,
    ) => `/api/ministry-friendly/${id}`,
    method: 'patch',
    schema: responseValidation(ministryFriendlySchema),
  },
} satisfies ApiEndpointsAndSchemas

export interface CreateMinistryFriendlyParams {
  with_friendly?: boolean

  ministry: {
    date: string
    leader?: string
    address?: string
    address_url?: string
  }

  friendly?: {
    date: string
    description: string
    inviting: string
    address: string
    address_url: string
  }
}
export async function createMinistryFriendly(
  { ...payload }: CreateMinistryFriendlyParams,
) {
  const { url, method, schema } = endpoints.create

  const data = await client[method](url, payload, schema)

  return normalizeResponse(schema, normalizeMinistryFriendly, data)
}

export interface UpdateMinistryFriendlyParams {
  id: number
  with_friendly?: boolean

  ministry: {
    date: string
    leader?: string
    address?: string
    address_url?: string
  }

  friendly?: {
    date: string
    description: string
    inviting: string
    address: string
    address_url: string
  }
}
export async function updateMinistryFriendly(
  { id, ...payload }: UpdateMinistryFriendlyParams,
) {
  const { url, method, schema } = endpoints.update

  const data = await client[method](url({ id }), payload, schema)

  return normalizeResponse(schema, normalizeMinistryFriendly, data)
}
