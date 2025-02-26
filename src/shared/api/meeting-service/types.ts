import { z } from 'zod'
import { meetingSchema } from '../meetings'
import { servicesSchema } from '../service'

export const meetingServiceSchema = z.object({
  service: servicesSchema,
  meeting: meetingSchema,
})
