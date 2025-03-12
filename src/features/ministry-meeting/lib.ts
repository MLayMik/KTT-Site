import {
  type CalendarDate,
  getLocalTimeZone,
  today,
} from '@internationalized/date'
import { z } from 'zod'

const ministrySchema = z.object({
  time: z.string(),
  date: z.custom<CalendarDate>(value => value !== null, {
    message: 'Дата обязательна',
  }),
  leader: z.string().optional(),
  address: z.string().optional(),
  addressUrl: z.string().url('Некорректный URL').optional(),
})

const friendlySchema = z.object({
  time: z.string(),
  date: z.custom<CalendarDate>(value => value !== null, {
    message: 'Дата обязательна',
  }),
  inviting: z.string().min(1, 'Приглашающий обязателен'),
  description: z.string().min(1, 'Описание обязательное'),
  address: z.string().min(1, 'Адрес обязательный'),
  addressUrl: z.string().url('Некорректный URL'),
})

export const ministryFriendlySchema = z.object({
  ministry: ministrySchema,
  friendly: friendlySchema.optional(),
})

type MinistryFriendlyValues = z.infer<typeof ministryFriendlySchema>

export function provideDefaultValues(): MinistryFriendlyValues {
  return {
    ministry: {
      date: today(getLocalTimeZone()),
      time: '09:00',
      address: '',
      addressUrl: '',
      leader: '',
    },
    friendly: {
      address: '',
      addressUrl: '',
      date: today(getLocalTimeZone()),
      description: '',
      inviting: '',
      time: '09:00',
    },
  }
}
