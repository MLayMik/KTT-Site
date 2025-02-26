import type { MeetingService } from '@/shared/types'
import type { z } from 'zod'
import type { meetingServiceSchema } from './types'
import { normalizeMeeting } from '../meetings'
import { normalizeService } from '../service'

export function normalizeMeetingService(
  meetingService: z.infer<typeof meetingServiceSchema>,
): MeetingService {
  return {
    meeting: normalizeMeeting(meetingService.meeting),
    service: normalizeService(meetingService.service),
  }
}
