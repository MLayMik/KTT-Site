import { API_URL } from '@/shared/config'
import { http, HttpResponse } from 'msw'

interface Announcement {
  id: number
  title: string
  announcement_url: string
}

interface CreateAnnouncement {
  title: string
  announcement_url: string
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: 'Вечеря 2025',
    announcement_url: 'https://drive.google.com/file/d/15lCsrkXuOSaZLdLwKSjnzto-uW5eqqeF/preview',
  },
  {
    id: 2,
    title: 'Чешский региональный конгресс',
    announcement_url: 'https://drive.google.com/file/d/15SHO9O0NyoWKreZI26U01J-wzjl-q-En/preview',
  },
]

export const announcementshandlers = [
  http.get(`${API_URL}/api/announcements`, () => {
    return HttpResponse.json(announcements)
  }),
  http.post(`${API_URL}/api/announcements`, async ({ request }) => {
    const { title, announcement_url } = (await request.json()) as CreateAnnouncement

    const newAnnouncement: Announcement = {
      id: announcements.length + 1,
      title,
      announcement_url,
    }
    announcements.push(newAnnouncement)

    return HttpResponse.json(newAnnouncement, { status: 201 })
  }),
]
