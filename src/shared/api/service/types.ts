import { dateValidation } from '@/shared/lib/validation'
import { z } from 'zod'

export const servicesSchema = z.object({
  id: z.number(),
  date: dateValidation,
  scene: z.string().nullable().optional(),
  microphones: z.string().nullable().optional(),
  voiceover_zoom: z.string().nullable().optional(),
  administrator: z.string().nullable().optional(),
})
