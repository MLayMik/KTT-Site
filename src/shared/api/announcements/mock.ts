import { API_URL } from '@/shared/config'
import { http, HttpResponse } from 'msw'

export const announcementshandlers = [
  http.get(`${API_URL}/api/announcements`, () => {
    return HttpResponse.json([
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
    ])
  }),
]
