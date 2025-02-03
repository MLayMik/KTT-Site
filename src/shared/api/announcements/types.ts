import { z } from 'zod'

export const announcementSchema = z.object({
  id: z.number(),
  title: z.string(),
  announcement_url: z.string().url(),
})
