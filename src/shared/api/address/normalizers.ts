import type { Address } from '@/shared/types'
import type { z } from 'zod'
import type { addressSchema } from './types'
import { objectPick } from '@antfu/utils'

export function normalizeAddress(
  address: z.infer<typeof addressSchema>,
): Address {
  return {
    ...objectPick(address, ['id', 'address']),
    addressUrl: address.address_url,
  }
}
