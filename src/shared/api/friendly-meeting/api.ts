import { normalizeResponse, responseValidation } from '@/shared/lib/validation'
import { z } from 'zod'
import { type ApiEndpointsAndSchemas, client } from '../lib'
import { normalizeFriendlyMeeting } from './normalizers'
import { friendlyMeetingSchema } from './types'

const endpoints = {
  getFriendlyMeetings: {
    url: '/api/friendly-meetings',
    method: 'get',
    schema: z.array(friendlyMeetingSchema),
  },
  getFriendlyMeeting: {
    url: ({ id }: GetFriendlyMeetingParams) => `/api/friendly-meetings/${id}`,
    method: 'get',
    schema: friendlyMeetingSchema,
  },
  createFriendlyMeeting: {
    url: '/api/friendly-meetings',
    method: 'post',
    schema: responseValidation(friendlyMeetingSchema),
  },
  updateFriendlyMeeting: {
    url: (
      { id }: UpdateFriendlyMeetingParams,
    ) => `/api/friendly-meetings/${id}`,
    method: 'patch',
    schema: responseValidation(friendlyMeetingSchema),
  },
  deleteFriendlyMeeting: {
    url: (
      { id }: DeleteFriendlyMeetingParams,
    ) => `/api/friendly-meetings/${id}`,
    method: 'delete',
    schema: responseValidation(friendlyMeetingSchema),
  },
} satisfies ApiEndpointsAndSchemas

export async function getFriendlyMeetings() {
  const { url, method, schema } = endpoints.getFriendlyMeetings

  const data = await client[method](url, schema)

  return data.map(normalizeFriendlyMeeting)
}

export interface GetFriendlyMeetingParams { id: number }
export async function getFriendlyMeeting({ id }: GetFriendlyMeetingParams) {
  const { url, method, schema } = endpoints.getFriendlyMeeting

  const data = await client[method](url({ id }), schema)

  return normalizeFriendlyMeeting(data)
}

export interface CreateFriendlyMeetingParams {
  date: string
  description: string
  inviting: string
  address: string
  address_url: string
}
export async function createFriendlyMeeting({
  address,
  address_url,
  date,
  description,
  inviting,
}: CreateFriendlyMeetingParams) {
  const { url, method, schema } = endpoints.createFriendlyMeeting

  const data = await client[method](
    url,
    { address, address_url, date, description, inviting },
    schema,
  )

  return normalizeResponse(schema, normalizeFriendlyMeeting, data)
}

export interface UpdateFriendlyMeetingParams {
  id: number
  date?: string
  description?: string
  inviting?: string
  address?: string
  address_url?: string
}
export async function updateFriendlyMeeting({
  id,
  address,
  address_url,
  date,
  description,
  inviting,
}: UpdateFriendlyMeetingParams) {
  const { url, method, schema } = endpoints.updateFriendlyMeeting

  const data = await client[method](
    url({ id }),
    { address, address_url, date, description, inviting },
    schema,
  )

  return normalizeResponse(schema, normalizeFriendlyMeeting, data)
}

export interface DeleteFriendlyMeetingParams { id: number }
export async function deleteFriendlyMeeting(
  { id }: DeleteFriendlyMeetingParams,
) {
  const { url, method, schema } = endpoints.deleteFriendlyMeeting

  const data = await client[method](url({ id }), {}, schema)

  return normalizeResponse(schema, normalizeFriendlyMeeting, data)
}
