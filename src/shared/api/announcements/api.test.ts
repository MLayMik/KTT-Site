import { createQueryProviderWrapper } from '@/shared/lib/utils/createQueryProviderWrapper'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useAnnouncements, useAnnouncementsById } from './query'

describe('announcements api', () => {
  it('should fetch announcements (GET)', async () => {
    const { result } = renderHook(() => useAnnouncements(), {
      wrapper: createQueryProviderWrapper(),
    })

    await waitFor(() => expect(result.current.data).not.toBeUndefined())

    if (result.current.data) {
      expect(result.current.data).toHaveLength(2)
      expect(result.current.data[1]).toHaveProperty('id')
      expect(result.current.data[1]).toHaveProperty('title')
      expect(result.current.data[1]).toHaveProperty('announcementUrl')
    }
  })

  it.skip('should fetch announcement by id (GET)', async () => {
    const { result } = renderHook(() => useAnnouncementsById({ id: 3 }), {
      wrapper: createQueryProviderWrapper(),
    })

    await waitFor(() => expect(result.current.data).not.toBeUndefined())
    const announcement = result.current.data

    if (announcement) {
      expect(announcement.id).toBe(3)
    }
  })

  it.skip('should creat announcement (POST)', async () => {
    const newAnnouncement = {
      title: 'Test announcemnt',
      announcement_url: 'https://github.com/pnpm/pnpm/issues/5134',
    }

    const { result: announcementResult } = renderHook(() => useAnnouncements(), { wrapper: createQueryProviderWrapper() })

    await waitFor(() => expect(announcementResult).toHaveLength(3))

    const createdAnnouncement = announcementResult.current.data?.find(ann => ann.title === newAnnouncement.title)

    expect(createdAnnouncement).toBeDefined()
    expect(createdAnnouncement?.title).toBe(newAnnouncement.title)
    expect(createdAnnouncement?.announcementUrl).toBe(newAnnouncement.announcement_url)
  })
})
