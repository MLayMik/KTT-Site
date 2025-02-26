import type { AnnouncementByIdParams } from './api'
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../lib'
import { createAnnouncement, deleteAnnouncement, getAnnouncements, getAnnouncementsById } from './api'

const entity = 'announcements'
const Scopes = { All: 'all', ById: 'by-id' } as const

export const keys = {
  getAnnouncements: () => [{ entity, scope: Scopes.All }],
  byId: (
    params: AnnouncementByIdParams,
  ) => [{ entity, scope: Scopes.ById, ...params }],
} as const

export function useAnnouncementsQuery() {
  return queryOptions({
    queryKey: keys.getAnnouncements(),
    queryFn: getAnnouncements,
  })
}

export function useAnnouncements() {
  return useQuery(useAnnouncementsQuery())
}

export function useAnnouncementsByIdQuery(params: AnnouncementByIdParams) {
  return queryOptions({
    queryKey: keys.byId(params),
    queryFn: ({ queryKey: [{ id }] }) => getAnnouncementsById({ id: id! }),
  })
}

export function useAnnouncementsById(params: AnnouncementByIdParams) {
  return useQuery(useAnnouncementsByIdQuery(params))
}

export function useCreateAnnouncement() {
  return useMutation({
    mutationFn: createAnnouncement,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getAnnouncements() })
    },
  })
}

export function useDeleteAnnouncement() {
  return useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getAnnouncements() })
    },
  })
}
