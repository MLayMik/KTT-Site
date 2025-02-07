import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../lib'
import {
  createMinistryMeeting,
  deleteMinistryMeeting,
  getMinistryMeeting,
  type GetMinistryMeetingParams,
  getMinistryMeetings,
  updateMinistryMeeting,
} from './api'

const entity = 'ministry-meeting'
const Scopes = { All: 'all', ById: 'by-id' } as const

export const keys = {
  getMinistryMeetings: () => [{ entity, scope: Scopes.All }],
  getMinistryMeeting: (
    params: GetMinistryMeetingParams,
  ) => [{ entity, scope: Scopes.ById, ...params }],
} as const

export function useMinistryMeetingsQuery() {
  return queryOptions({
    queryKey: keys.getMinistryMeetings(),
    queryFn: getMinistryMeetings,
  })
}

export function useMinistryMeetings() {
  return useQuery(useMinistryMeetingsQuery())
}

export function useMinistryMeetingQuery(params: GetMinistryMeetingParams) {
  return queryOptions({
    queryKey: keys.getMinistryMeeting(params),
    queryFn: ({ queryKey: [{ id }] }) => getMinistryMeeting({ id }),
  })
}

export function useMinistryMeeting(params: GetMinistryMeetingParams) {
  return useQuery(useMinistryMeetingQuery(params))
}

export function useCreateMinistryMeeting() {
  return useMutation({
    mutationFn: createMinistryMeeting,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getMinistryMeetings() })
    },
  })
}

export function useUpdateMinistryMeeting() {
  return useMutation({
    mutationFn: updateMinistryMeeting,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getMinistryMeetings() })
    },
  })
}

export function useDeleteMinistryMeeting() {
  return useMutation({
    mutationFn: deleteMinistryMeeting,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getMinistryMeetings() })
    },
  })
}
