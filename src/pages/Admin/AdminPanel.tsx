import { useDeleteFriendlyMeeting } from '@/shared/api/friendly-meeting'
import { useDeleteMeeting, useMeetings } from '@/shared/api/meetings'
import { useDeleteMinistryMeeting, useMinistryMeetings } from '@/shared/api/ministry-meeting'
import { useDeleteService } from '@/shared/api/service'
import { cn } from '@/shared/lib/styles'
import { RadioCards, Separator } from '@radix-ui/themes'
import { Plus, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AdminPanel() {
  const { data: meetingData, isLoading } = useMeetings()
  const { data: ministryData } = useMinistryMeetings()
  const { mutate: deleteMeeting } = useDeleteMeeting()
  const { mutate: deleteService } = useDeleteService()
  const { mutate: deleteMinistryMeeting } = useDeleteMinistryMeeting()
  const { mutate: deleteFriendly } = useDeleteFriendlyMeeting()

  const navigate = useNavigate()
  if (isLoading)
    return <div>Loading...</div>

  return (
    <div className="p-6">
      <div className="my-3 text-center font-bold">
        Панель редактирования
      </div>
      <Separator className="w-full" />
      <p className="my-4 font-bold">
        Встречи Собрания:
      </p>
      <RadioCards.Root columns={{ initial: '2', sm: '3' }}>
        {meetingData?.map(meeting => (
          <button
            onClick={() => navigate(`meeting/${meeting.id}`)}
            className={cn(
              `
                relative h-20 rounded-md border bg-white px-4 py-2 text-start text-sm transition-all
                duration-200 ease-in-out

                dark:border-gray-600 dark:bg-transparent

                hover:drop-shadow-mainshadow
              `,
            )}
            key={meeting.id}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteService({ id: meeting.serviceId! })
                deleteMeeting({ id: meeting.id })
              }}
              className="absolute right-1 top-1 cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <X className="size-3" />
            </button>
            <p className={meeting.status!.title !== 'Собрание' ? 'font-bold' : undefined}>{meeting.status!.title}</p>
            <p className="text-xs">
              {meeting.date.toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </button>
        ))}

        <button
          onClick={() => navigate(`/admin/meeting`)}
          className={`
            flex size-full items-center justify-center rounded-md border py-4 transition-all
            duration-200 easy-in-out bg-white

            dark:border-gray-600 dark:bg-transparent

            hover:drop-shadow-mainshadow
          `}
        >
          <Plus />
        </button>

      </RadioCards.Root>
      <Separator className="my-4 w-full" />
      <p className="mb-4 font-bold">
        Встречи для проповеди:
      </p>
      <RadioCards.Root columns={{ initial: '2', sm: '3' }}>
        {ministryData?.map(meeting => (
          <button
            onClick={() => navigate(`ministry-meeting/${meeting.id}`)}
            className={cn(
              `
                relative h-20 rounded-md border bg-white px-4 py-2 text-start text-sm transition-all
                duration-200 ease-in-out

                dark:border-gray-600 dark:bg-transparent

                hover:drop-shadow-mainshadow
              `,
            )}
            key={meeting.id}
          >
            <div
              onClick={(e) => {
                e.stopPropagation()
                if (meeting?.friendlyMeeting) {
                  deleteFriendly({ id: meeting?.friendlyMeeting.id })
                }
                deleteMinistryMeeting({ id: meeting.id })
              }}
              className="absolute right-1 top-1 cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <X className="size-3" />
            </div>
            <p>
              {meeting.date.toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="text-xs">
              {meeting.leader}
            </p>
          </button>
        ))}
        <button
          onClick={() => navigate(`/admin/ministry-meeting`)}
          className={`
            flex size-full items-center justify-center rounded-md border py-4 transition-all
            duration-200 easy-in-out bg-white

            dark:border-gray-600 dark:bg-transparent

            hover:drop-shadow-mainshadow
          `}
        >
          <Plus />
        </button>
      </RadioCards.Root>
    </div>
  )
}
