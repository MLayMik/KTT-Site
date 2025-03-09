import type { CalendarDate } from '@internationalized/date'
import { z } from 'zod'

export const ministryMeetingSchema = z.object({
  time: z.string(),
  date: z
    .custom<CalendarDate>(value => value != null, {
      message: 'Дата обязательна',
    }),
  leader: z.string().optional(),
  address: z.string().optional(),
  addressUrl: z.string().url('Некорректный URL').optional(),
})

export type MinistryMeetingValues = z.infer<typeof ministryMeetingSchema>

export const ministryMeetingWithFriendlyMeetingSchema = z.object({
  time: z.string(),
  date: z
    .custom<CalendarDate>(value => value != null, {
      message: 'Дата обязательна',
    }),
  leader: z.string().optional(),
  address: z.string().optional(),
  addressUrl: z.string().url('Некорректный URL').optional(),
  friendlyTime: z.string(),
  friendlyDate: z
    .custom<CalendarDate>(value => value != null, {
      message: 'Дата обязательна',
    }),
  inviting: z.string().min(1, 'Приглашающий обязателен'),
  description: z.string().min(1, 'Описание обязательное'),
  friendlyAddress: z.string().min(1, 'Адрес обязательный'),
  friendlyAddressUrl: z.string().url('Некорректный URL'),
})

export type MinistryMeetingWithFriendlyMeetingValues = z.infer<typeof ministryMeetingWithFriendlyMeetingSchema>
