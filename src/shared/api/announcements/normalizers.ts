import type { Announcements } from '@/shared/types'
import type { z } from 'zod'
import type { announcementSchema } from './types'
import { objectPick } from '@antfu/utils'

export function normalizeAnnouncement(
  announcement: z.infer<typeof announcementSchema>,
): Announcements {
  return {
    ...objectPick(announcement, ['title', 'id']),
    announcementUrl: announcement.announcement_url,
  }
}
