import { useMinistryMeetings } from '@/shared/api/ministry-meeting'
import { KLoader } from '@/shared/ui/KLoader'
import { KMinistryItem } from '@/shared/ui/KMinistryItem'

export function MinistryMeeting() {
  const { data, isLoading } = useMinistryMeetings()

  if (isLoading)
    return <KLoader />

  return (
    <>
      <div className={`
        mx-3 mt-1 py-4 text-sm font-medium

        dark:text-gray-200

        sm:mx-8 sm:my-5 sm:text-base
      `}
      >

        <div>
          <div
            className={`
              mb-3 hidden grid-cols-7 gap-4 px-4 font-bold

              sm:grid
            `}
          >
            <p>Дата</p>
            <p>Время</p>
            <p className="col-span-3">Место</p>
            <p className="col-span-2">Ведущий</p>
          </div>

          <div className="flex flex-col gap-y-3">
            {data && data.map(meeting => (
              <KMinistryItem key={meeting.id} {...meeting} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
