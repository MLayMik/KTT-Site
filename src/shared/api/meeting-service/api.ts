import { normalizeResponse, responseValidation } from '@/shared/lib/validation'
import { type ApiEndpointsAndSchemas, client } from '../lib'
import { normalizeMeetingService } from './normalizers'
import { meetingServiceSchema } from './types'

export const endpoints = {
  create: {
    url: '/api/meeting-service',
    method: 'post',
    schema: responseValidation(meetingServiceSchema),
  },
  update: {
    url: (
      { id }: Pick<UpdateMeetingServiceParams, 'id'>,
    ) => `/api/meeting-service/${id}`,
    method: 'patch',
    schema: responseValidation(meetingServiceSchema),
  },
} satisfies ApiEndpointsAndSchemas

export interface CreateMeetingServiceParams {
  date: string

  service: {
    scene?: string
    microphones?: string
    voiceoverZoom?: string
    administrator?: string
  }

  meeting: {
    leading: string
    speaker?: string
    speech_title?: string
    lead_wt?: string
    reader?: string
    closing_prayer?: string
    special_program?: string
    status_id: number
    address_id?: number
    ministry_meeting_id?: number
  }
}
export async function createMeetingService(
  { ...payload }: CreateMeetingServiceParams,
) {
  const { url, method, schema } = endpoints.create

  const data = await client[method](url, { ...payload }, schema)

  return normalizeResponse(schema, normalizeMeetingService, data)
}

export interface UpdateMeetingServiceParams {
  id: number
  date: string

  service: {
    scene?: string
    microphones?: string
    voiceoverZoom?: string
    administrator?: string
  }

  meeting: {
    leading: string
    speaker?: string
    speech_title?: string
    lead_wt?: string
    reader?: string
    closing_prayer?: string
    special_program?: string
    status_id: number
    address_id?: number
    ministry_meeting_id?: number
  }
}
export async function updateMeetingService(
  { id, ...payload }: UpdateMeetingServiceParams,
) {
  const { url, method, schema } = endpoints.update

  const data = await client[method](url({ id }), { ...payload }, schema)

  return normalizeResponse(schema, normalizeMeetingService, data)
}
