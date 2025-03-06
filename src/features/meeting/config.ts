export enum MeetingStatuses {
  MEETING = 'Собрание',
  MEMORIAL = 'Вечеря',
  SPECIAL_PROGRAM = 'Спец. программа',
  CONGRESS = 'Конгресс',
}

export const meetingStatuses: { id: number, title: string }[] = [
  { id: 1, title: MeetingStatuses.MEETING },
  { id: 2, title: MeetingStatuses.MEMORIAL },
  { id: 3, title: MeetingStatuses.SPECIAL_PROGRAM },
  { id: 4, title: MeetingStatuses.CONGRESS },
]
