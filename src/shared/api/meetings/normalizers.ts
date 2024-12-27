import type { Meeting } from '@/shared/types'
import type { z } from 'zod'
import type { meetingSchema } from './types'
import { objectPick } from '@antfu/utils'
import { normalizeAddress } from '../address'
import { normalizeMinistryMeeting } from '../ministry-meeting'
import { normalizeService } from '../service'

export function normalizeMeeting(
  meeting: z.infer<typeof meetingSchema>,
): Meeting {
  const {
    address,
    closing_prayer,
    lead_wt,
    special_program,
    speech_title,
    ministry_meeting,
    service_id,
    service,
  } = meeting

  return {
    ...objectPick(
      meeting,
      ['id', 'leading', 'reader', 'speaker', 'date', 'status'],
    ),
    ministryMeeting: ministry_meeting ? normalizeMinistryMeeting(ministry_meeting) : null,
    address: normalizeAddress(address),
    closingPrayer: closing_prayer,
    leadWt: lead_wt,
    specialProgram: special_program,
    speechTitle: speech_title,
    serviceId: service_id,
    service: service ? normalizeService(service) : null,
  }
}
