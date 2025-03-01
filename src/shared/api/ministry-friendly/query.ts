import { useMutation } from '@tanstack/react-query'
import { friendlyMeetingKeys } from '../friendly-meeting'
import { queryClient } from '../lib'
import { ministryMeetingKeys } from '../ministry-meeting'
import { createMinistryFriendly, updateMinistryFriendly } from './api'

export function useCreateMinistryFriendly() {
  return useMutation({
    mutationFn: createMinistryFriendly,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          ...ministryMeetingKeys.getMinistryMeetings(),
          ...friendlyMeetingKeys.getFriendlyMeetings(),
        ],
      })
    },
  })
}

export function useUpdateMinistryFriendly() {
  return useMutation({
    mutationFn: updateMinistryFriendly,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          ...ministryMeetingKeys.getMinistryMeetings(),
          ...friendlyMeetingKeys.getFriendlyMeetings(),
        ],
      })
    },
  })
}
