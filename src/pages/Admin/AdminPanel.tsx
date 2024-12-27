import { type } from 'node:os'
import { AddressCreate } from '@/features/address/create'
import { useMeetings } from '@/shared/api/meetings'
import { cn } from '@/shared/lib/styles'
import { Dialog, RadioCards } from '@radix-ui/themes'
import { Plus, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AdminPanel() {
  const { data, isLoading } = useMeetings()
  if (data) {
    const formattedDate = `${data[1].date.getFullYear()}-${String(data[1].date.getMonth() + 1).padStart(2, '0')}-${String(data[1].date.getDate()).padStart(2, '0')}`
    console.log(formattedDate)
  }

  const navigate = useNavigate()
  if (isLoading) {
    return (
      <div className="mx-auto">
        Loading...
        <Spinner />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="m-5">
        {/* <Link to="/admin/meeting">Meeting</Link> */}
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

      <p className="mb-4 font-bold">Встречи для проповеди:</p>
      <RadioCards.Root columns={{ initial: '2', sm: '3' }}>
        {ministryData?.map(meeting => (
          <button
            onClick={() => navigate(`/admin/ministry-meeting/${meeting.id}`)}
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
            <p className="text-xs">{meeting.leader}</p>
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
