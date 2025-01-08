import type { CalendarDate } from '@internationalized/date'

export type AnyObject = Record<string, unknown>
export { useCurrentTheme } from './useCurrentTheme'

export function parseDateSQL(time: string, date: CalendarDate) {
  const [hours, minutes] = time.split(':').map(Number)

  const year = date.year
  const month = date.month - 1
  const day = date.day

  const utcDate = new Date(Date.UTC(year, month, day, hours, minutes, 0, 0))

  return utcDate.toISOString().slice(0, 19).replace('T', ' ')
}
