import { z } from 'zod'

export const addressSchema = z.object({
  address: z.string().min(1, 'Адресс обязателен'),
  address_url: z.string().min(1, 'Ссылка обязательна'),
})

export type AddressSchemaValues = z.infer<typeof addressSchema>
