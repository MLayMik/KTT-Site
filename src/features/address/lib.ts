import { z } from 'zod'

export const addressSchema = z.object({
  address: z.string().min(1, 'Адресс обязателен'),
  address_url: z.string()
    .min(1, 'Ссылка обязательна')
    .url('Это должна быть ссылка'),
})

export type AddressSchemaValues = z.infer<typeof addressSchema>
