import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../lib'
import {
  createMeeting,
  deleteMeeting,
  getMeeting,
  type GetMeetingParams,
  getMeetings,
  updateMeeting,
} from './api'

const entity = 'meeting'
const Scopes = { All: 'all', ById: 'by-id' } as const

const keys = {
  getMeetings: (
  ) => [{ entity, scope: Scopes.All }],
  getMeeting: (
    params: GetMeetingParams,
  ) => [{ entity, scope: Scopes.ById, ...params }],
} as const

export { keys as meetingKeys }

export function useMeetingsQuery() {
  return queryOptions({
    queryKey: keys.getMeetings(),
    queryFn: getMeetings,
  })
}

export function useMeetings() {
  return useQuery(useMeetingsQuery())
}

export function useMeetingByIdQuery(params: GetMeetingParams) {
  return queryOptions({
    queryKey: keys.getMeeting(params),
    queryFn: ({ queryKey: [{ id }] }) => getMeeting({ id: id! }),
  })
}

export function useMeetingById(params: GetMeetingParams) {
  return useQuery(useMeetingByIdQuery(params))
}

export function useCreateMeeting() {
  return useMutation({
    mutationFn: createMeeting,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getMeetings() })
    },
  })
}

export function useUpdateMeeting() {
  return useMutation({
    mutationFn: updateMeeting,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getMeetings() })
    },
  })
}

export function useDeleteMeeting() {
  return useMutation({
    mutationFn: deleteMeeting,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getMeetings() })
    },
  })
}
