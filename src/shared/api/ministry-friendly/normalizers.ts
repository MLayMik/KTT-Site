import type { MinistryFriendly } from '@/shared/types'
import type { z } from 'zod'
import type { ministryFriendlySchema } from './types'
import { normalizeFriendlyMeeting } from '../friendly-meeting'
import { normalizeMinistryMeeting } from '../ministry-meeting'

export function normalizeMinistryFriendly(
  ministryFriendly: z.infer<typeof ministryFriendlySchema>,
): MinistryFriendly {
  return {
    friendly: ministryFriendly.friendly
      && normalizeFriendlyMeeting(ministryFriendly.friendly),
    ministry: normalizeMinistryMeeting(ministryFriendly.ministry),
  }
}
