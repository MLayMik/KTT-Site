import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../lib'
import { meetingKeys } from '../meetings'
import { serviceKeys } from '../service'
import { createMeetingService, updateMeetingService } from './api'

export function useCreateMeetingService() {
  return useMutation({
    mutationFn: createMeetingService,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [...meetingKeys.getMeetings(), ...serviceKeys.getServices()],
      })
    },
  })
}

export function useUpdateMeetingService() {
  return useMutation({
    mutationFn: updateMeetingService,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [...meetingKeys.getMeetings(), ...serviceKeys.getServices()],
      })
    },
  })
}
