import { MeetingCreate } from '@/features/meeting/create'
import { MeetingEdit } from '@/features/meeting/edit'

export interface Props {
  edit?: boolean
}

export function AdminMeeting({ edit }: Props) {
  return (
    <div className={`
      my-3 flex flex-col gap-y-4 rounded-lg bg-white p-3 text-sm font-medium
      shadow-md transition-all duration-200 ease-in-out

      dark:bg-dark-primary dark:text-gray-200 dark:shadow-none

      sm:p-6 sm:text-base
    `}
    >
      {edit ? <MeetingEdit /> : <MeetingCreate />}
    </div>
  )
}
