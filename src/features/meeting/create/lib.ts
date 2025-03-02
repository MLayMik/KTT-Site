import {
  type CalendarDate,
  getLocalTimeZone,
  today,
} from '@internationalized/date'
import { z } from 'zod'

export const meetingSchema = z.object({
  time: z.string(),
  date: z
    .custom<CalendarDate>(value => value != null, {
      message: 'Дата обязательна',
    }),
  scene: z.string().optional(),
  microphones: z.string().optional(),
  voiceover_zoom: z.string().optional(),
  administrator: z.string().optional(),
  leading: z.string().min(1, 'Ведущий объязателен'),
  speech_title: z.string().optional(),
  lead_wt: z.string().optional(),
  reader: z.string().optional(),
  closing_prayer: z.string().optional(),
  special_program: z.string().optional(),
  status_id: z.number(),
  address_id: z.number().optional(),
  ministry_meeting_id: z.number().optional(),
  speaker: z.string().optional(),
})

export type MeetingSchemaValues = z.infer<typeof meetingSchema>

export const defaultValues: MeetingSchemaValues = {
  address_id: 1,
  administrator: undefined,
  closing_prayer: undefined,
  date: today(getLocalTimeZone()),
  time: '10:00',
  lead_wt: undefined,
  leading: '',
  microphones: undefined,
  ministry_meeting_id: 0,
  reader: undefined,
  scene: undefined,
  special_program: undefined,
  speech_title: undefined,
  status_id: 1,
  voiceover_zoom: undefined,
  speaker: undefined,
}
