import type { Service } from '@/shared/types'
import type { z } from 'zod'
import type { servicesSchema } from './types'
import { objectPick } from '@antfu/utils'

export function normalizeService(
  services: z.infer<typeof servicesSchema>,
): Service {
  return {
    ...objectPick(services, [
      'id',
      'administrator',
      'microphones',
      'scene',
      'date',
    ]),
    voiceoverZoom: services.voiceover_zoom,
  }
}
