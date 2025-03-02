import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../lib'
import {
  createFriendlyMeeting,
  deleteFriendlyMeeting,
  getFriendlyMeeting,
  type GetFriendlyMeetingParams,
  getFriendlyMeetings,
  updateFriendlyMeeting,
} from './api'

const entity = 'friendly-meeting'
const Scopes = { All: 'all', ById: 'by-id' } as const

const keys = {
  getFriendlyMeetings: () => [{ entity, scope: Scopes.All }],
  getFriendlyMeeting: (
    params: GetFriendlyMeetingParams,
  ) => [{ entity, scope: Scopes.ById, ...params }],
} as const

export { keys as friendlyMeetingKeys }

export function useFriendlyMeetingsQuery() {
  return queryOptions({
    queryKey: keys.getFriendlyMeetings(),
    queryFn: getFriendlyMeetings,
  })
}

export function useFriendlyMeetings() {
  return useQuery(useFriendlyMeetingsQuery())
}

export function useFriendlyMeetingQuery(params: GetFriendlyMeetingParams) {
  return queryOptions({
    queryKey: keys.getFriendlyMeeting(params),
    queryFn: ({ queryKey: [{ id }] }) => getFriendlyMeeting({ id }),
  })
}

export function useFriendlyMeeting(params: GetFriendlyMeetingParams) {
  return useQuery(useFriendlyMeetingQuery(params))
}

export function useCreateFriendlyMeeting() {
  return useMutation({
    mutationFn: createFriendlyMeeting,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getFriendlyMeetings() })
    },
  })
}

export function useUpdateFriendlyMeeting() {
  return useMutation({
    mutationFn: updateFriendlyMeeting,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getFriendlyMeetings() })
    },
  })
}

export function useDeleteFriendlyMeeting() {
  return useMutation({
    mutationFn: deleteFriendlyMeeting,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getFriendlyMeetings() })
    },
  })
}
