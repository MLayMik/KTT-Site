import { dateValidation } from '@/shared/lib/validation'
import { z } from 'zod'

export const servicesSchema = z.object({
  id: z.number(),
  date: dateValidation,
  scene: z.string().nullable(),
  microphones: z.string().nullable(),
  voiceover_zoom: z.string().nullable(),
  administrator: z.string().nullable(),
})
