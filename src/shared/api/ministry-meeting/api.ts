import { normalizeResponse, responseValidation } from '@/shared/lib/validation'
import { z } from 'zod'
import { type ApiEndpointsAndSchemas, client } from '../lib'
import { normalizeMinistryMeeting } from './normalizer'
import { ministryMeetingSchema } from './types'

const endpoints = {
  getMinistryMeetings: {
    url: '/api/ministry-meetings',
    method: 'get',
    schema: z.array(ministryMeetingSchema),
  },
  getMinistryMeeting: {
    url: ({ id }: GetMinistryMeetingParams) => `/api/ministry-meetings/${id}`,
    method: 'get',
    schema: ministryMeetingSchema,
  },
  createMinistryMeeting: {
    url: '/api/ministry-meetings',
    method: 'post',
    schema: responseValidation(ministryMeetingSchema),
  },
  updateMinistryMeeting: {
    url: (
      { id }: UpdateMinistryMeetingParams,
    ) => `/api/ministry-meetings/${id}`,
    method: 'patch',
    schema: responseValidation(ministryMeetingSchema),
  },
  deleteMinistryMeeting: {
    url: (
      { id }: DeleteMinistryMeetingParams,
    ) => `/api/ministry-meetings/${id}`,
    method: 'delete',
    schema: responseValidation(ministryMeetingSchema),
  },
} satisfies ApiEndpointsAndSchemas

export { endpoints as ministryMeetingEndpoints }

export async function getMinistryMeetings() {
  const { url, method, schema } = endpoints.getMinistryMeetings

  const data = await client[method](url, schema)

  return data.map(normalizeMinistryMeeting)
}

export interface GetMinistryMeetingParams { id: number }
export async function getMinistryMeeting({ id }: GetMinistryMeetingParams) {
  const { url, method, schema } = endpoints.getMinistryMeeting

  const data = await client[method](url({ id }), schema)

  return normalizeMinistryMeeting(data)
}

export interface CreateMinistryMeetingParams {
  date: string
  leader?: string
  address?: string
  address_url?: string
  friendly_meeting_id?: number
}
export async function createMinistryMeeting({
  address,
  address_url,
  date,
  friendly_meeting_id,
  leader,
}: CreateMinistryMeetingParams) {
  const { url, method, schema } = endpoints.createMinistryMeeting

  const data = await client[method](
    url,
    { date, friendly_meeting_id, leader, address, address_url },
    schema,
  )

  return normalizeResponse(schema, normalizeMinistryMeeting, data)
}

export interface UpdateMinistryMeetingParams {
  id: number
  date?: string
  leader?: string
  address?: string
  address_url?: string
  friendly_meeting_id?: number | null
}
export async function updateMinistryMeeting({
  id,
  address,
  address_url,
  date,
  friendly_meeting_id,
  leader,
}: UpdateMinistryMeetingParams) {
  const { url, method, schema } = endpoints.updateMinistryMeeting

  const data = await client[method](
    url({ id }),
    { address, address_url, date, friendly_meeting_id, leader },
    schema,
  )

  return normalizeResponse(schema, normalizeMinistryMeeting, data)
}

export interface DeleteMinistryMeetingParams { id: number }
export async function deleteMinistryMeeting(
  { id }: DeleteMinistryMeetingParams,
) {
  const { url, method, schema } = endpoints.deleteMinistryMeeting

  const data = await client[method](url({ id }), {}, schema)

  return normalizeResponse(schema, normalizeMinistryMeeting, data)
}
