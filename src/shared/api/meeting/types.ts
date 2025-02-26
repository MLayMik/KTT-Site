import { dateValidation } from '@/shared/lib/validation'
import { z } from 'zod'
import { addressSchema } from '../address'
import { ministryMeetingSchema } from '../ministry-meeting'
import { servicesSchema } from '../service'

export const meetingSchema = z.object({
  id: z.number(),
  date: dateValidation,
  leading: z.string(),
  speaker: z.string().nullable().optional(),
  speech_title: z.string().nullable().optional(),
  lead_wt: z.string().nullable().optional(),
  reader: z.string().nullable().optional(),
  closing_prayer: z.string().nullable().optional(),
  special_program: z.string().nullable().optional(),
  address: addressSchema.nullable().optional(),
  service_id: z.number().nullable().optional(),
  service: servicesSchema.nullable().optional(),
  status: z.object({
    id: z.number(),
    title: z.string(),
  }).optional(),
  ministry_meeting: ministryMeetingSchema.nullable().optional(),
})
