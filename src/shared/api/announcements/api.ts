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
  create: {
    url: '/api/announcements',
    method: 'post',
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

export interface CreateAnnouncementParams {
  title: string
  announcement_url: string
}

export async function createAnnouncement({ title, announcement_url }: CreateAnnouncementParams) {
  const { url, method, schema } = endpoints.create
  const data = await client[method](url, { title, announcement_url }, schema)
  return normalizeAnnouncement(data)
}
