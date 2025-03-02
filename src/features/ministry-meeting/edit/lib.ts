import type { MinistryMeeting } from '@/shared/types'
import {
  type CalendarDate,
  getLocalTimeZone,
  parseDate,
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

export function provideDefaultValues(
  data: MinistryMeeting,
): MinistryFriendlyValues {
  const time = data.date
    ? data.date.toISOString().slice(11, 16)
    : '09:00'

  const date = data.date
    ? parseDate(data.date.toISOString().slice(0, 10))
    : today(getLocalTimeZone())

  const friendlyTime = data.friendlyMeeting?.date
    ? data.friendlyMeeting.date.toISOString().slice(11, 16)
    : '09:00'

  const friendlyDate = data.friendlyMeeting?.date
    ? parseDate(data.friendlyMeeting.date.toISOString().slice(0, 10))
    : today(getLocalTimeZone())

  return {
    ministry: {
      date,
      time,
      address: data.address ?? '',
      addressUrl: data.addressUrl ?? '',
      leader: data.leader ?? '',
    },
    friendly: {
      time: friendlyTime,
      date: friendlyDate,
      address: data.friendlyMeeting?.address ?? '',
      addressUrl: data.friendlyMeeting?.addressUrl ?? '',
      description: data.friendlyMeeting?.description ?? '',
      inviting: data.friendlyMeeting?.inviting ?? '',
    },
  }
}
