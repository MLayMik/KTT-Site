import { z } from 'zod'
import { friendlyMeetingSchema } from '../friendly-meeting'
import { ministryMeetingSchema } from '../ministry-meeting'

export const ministryFriendlySchema = z.object({
  friendly: friendlyMeetingSchema.nullable(),
  ministry: ministryMeetingSchema,
})
