import { z } from 'zod'
import { type ApiEndpointsAndSchemas, client } from '../lib'
import { normalizeAnnouncement } from './normalizers'
import { announcementSchema } from './types'

const endpoints = {
  getAnnouncements: {
    url: '/api/announcements',
    method: 'get',
    schema: z.array(announcementSchema),
  },
  byId: {
    url: ({ id }: AnnouncementByIdParams) => `/api/announcements/${id}`,
    method: 'get',
    schema: announcementSchema,
  },
} satisfies ApiEndpointsAndSchemas

export interface AnnouncementByIdParams { id: number }

export async function getAnnouncements() {
  const { url, method, schema } = endpoints.getAnnouncements
  const data = await client[method](url, schema)

  return data.map(normalizeAnnouncement)
}

export async function getAnnouncementsById({ id }: AnnouncementByIdParams) {
  const { url, method, schema } = endpoints.byId
  const data = await client[method](url({ id }), schema)

  return normalizeAnnouncement(data)
}
