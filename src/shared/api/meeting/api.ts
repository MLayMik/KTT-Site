import { normalizeResponse, responseValidation } from '@/shared/lib/validation'
import { z } from 'zod'
import { type ApiEndpointsAndSchemas, client } from '../lib'
import { normalizeMeeting } from './normalizers'
import { meetingSchema } from './types'

const endpoints = {
  getMeetings: {
    url: '/api/meetings',
    method: 'get',
    schema: z.array(meetingSchema),
  },
  getMeeting: {
    url: ({ id }: GetMeetingParams) => `/api/meetings/${id}`,
    method: 'get',
    schema: meetingSchema,
  },
  createMeeting: {
    url: '/api/meetings',
    method: 'post',
    schema: responseValidation(meetingSchema),
  },
  updateMeeting: {
    url: ({ id }: UpdateMeetingParams) => `/api/meetings/${id}`,
    method: 'patch',
    schema: responseValidation(meetingSchema),
  },
  deleteMeeting: {
    url: ({ id }: DeleteMeetingParams) => `/api/meetings/${id}`,
    method: 'delete',
    schema: responseValidation(meetingSchema),
  },
} satisfies ApiEndpointsAndSchemas

export async function getMeetings() {
  const { url, method, schema } = endpoints.getMeetings

  const data = await client[method](url, schema)

  return data.map(normalizeMeeting)
}

export interface GetMeetingParams { id: number }
export async function getMeeting({ id }: GetMeetingParams) {
  const { url, method, schema } = endpoints.getMeeting

  const data = await client[method](url({ id }), schema)

  return normalizeMeeting(data)
}

export interface CreateMeetingParams {
  date: string
  leading: string
  speaker?: string
  speech_title?: string
  lead_wt?: string
  reader?: string
  closing_prayer?: string
  special_program?: string
  status_id: number
  service_id?: number
  address_id?: number
  ministry_meeting_id?: number
}
export async function createMeeting({
  date,
  leading,
  status_id,
  address_id,
  closing_prayer,
  lead_wt,
  ministry_meeting_id,
  reader,
  service_id,
  special_program,
  speech_title,
  speaker,
}: CreateMeetingParams) {
  const { url, method, schema } = endpoints.createMeeting

  const data = await client[method](
    url,
    {
      date,
      leading,
      status_id,
      address_id,
      closing_prayer,
      lead_wt,
      ministry_meeting_id,
      reader,
      service_id,
      special_program,
      speech_title,
      speaker,
    },
    schema,
  )

  return normalizeResponse(schema, normalizeMeeting, data)
}

export interface UpdateMeetingParams {
  id: number
  date?: string
  leading?: string
  speech_title?: string
  lead_wt?: string
  reader?: string
  closing_prayer?: string
  special_program?: string
  status_id?: number
  service_id?: number
  address_id?: number
  ministry_meeting_id?: number
  speaker?: string
}
export async function updateMeeting({
  id,
  address_id,
  closing_prayer,
  date,
  lead_wt,
  leading,
  ministry_meeting_id,
  reader,
  service_id,
  special_program,
  speech_title,
  status_id,
  speaker,
}: UpdateMeetingParams) {
  const { url, method, schema } = endpoints.updateMeeting

  const data = await client[method](
    url({ id }),
    {
      address_id,
      closing_prayer,
      date,
      lead_wt,
      leading,
      ministry_meeting_id,
      reader,
      service_id,
      special_program,
      speech_title,
      status_id,
      speaker,
    },
    schema,
  )

  return normalizeResponse(schema, normalizeMeeting, data)
}

export interface DeleteMeetingParams { id: number }
export async function deleteMeeting({ id }: DeleteMeetingParams) {
  const { url, method, schema } = endpoints.deleteMeeting

  const data = await client[method](url({ id }), {}, schema)

  return normalizeResponse(schema, normalizeMeeting, data)
}
