import type { FriendlyMeeting } from '@/shared/types'
import { formatDate, formatTime } from '@/shared/lib/utils'
import { KEditLink } from '../KEditLink'

interface MinistryMeetingProps {
  id: number
  date: Date
  leader?: string | null
  address?: string | null
  addressUrl?: string | null
  friendlyMeeting?: FriendlyMeeting | null
}

export function KMinistryItem({
  id,
  leader,
  date,
  address,
  addressUrl,
  friendlyMeeting,
}: MinistryMeetingProps) {
  return (
    <div
      className={`
        rounded-lg bg-white px-2 py-2 drop-shadow-md transition-all duration-200
        ease-in-out

        dark:bg-dark-bg

        sm:px-4 sm:py-3
      `}
    >
      <div
        className={`
          grid grid-cols-2 gap-1

          sm:grid-cols-7 sm:gap-4
        `}
      >
        <div className="sm:col-auto">
          <p className={`
            text-sm font-semibold text-gray-500

            sm:hidden
          `}
          >
            Дата
          </p>
          <p>
            {formatDate({
              date,
              options: { numericMonth: true, showYear: true },
            })}
          </p>
        </div>

        <div className="sm:col-auto">
          <p className={`
            text-sm font-semibold text-gray-500

            sm:hidden
          `}
          >
            Время
          </p>
          <p>
            {formatTime(date)}
          </p>
        </div>

        <div className={`
          col-span-2

          sm:col-span-3
        `}
        >
          <p className={`
            text-sm font-semibold text-gray-500

            sm:hidden
          `}
          >
            Место
          </p>
          {
            address
              ? (
                  <a
                    target="_blank"
                    href={addressUrl || '#'}
                    className="text-blue-500 underline"
                  >
                    {address}
                  </a>
                )
              : <p>Адрес не указан</p>
          }
        </div>

        <div className={`
          items-center

          sm:col-span-2 sm:flex sm:flex-row
        `}
        >
          <p className={`
            text-sm font-semibold text-gray-500

            sm:hidden
          `}
          >
            Ведущий
          </p>
          <p className="mr-2">{leader}</p>
          <div className="ml-auto">
            <KEditLink typeLink="ministry-meeting" idProgram={id} />
          </div>
        </div>

      </div>
      {friendlyMeeting && (
        <div className={`
          mt-4 flex flex-col gap-2 rounded-xl bg-blue-200 px-3 py-2
          drop-shadow-mainshadow

          dark:bg-dark-primary
        `}
        >

          <p className="text-center font-bold">Дружеская встреча</p>
          <p>
            {friendlyMeeting.description}
          </p>
          <div className={`
            flex max-w-[500px] flex-col justify-between gap-2

            sm:flex-row
          `}
          >
            <div className={`
              flex max-w-[350px] gap-4

              sm:block
            `}
            >
              <p className="font-bold">
                Место
              </p>
              <a
                target="_blank"
                href="friendlyMeeting.address_url"
                className="text-blue-600 underline"
              >
                {friendlyMeeting.address}
              </a>
            </div>
            <div className={`
              flex gap-4

              sm:block
            `}
            >
              <p className="font-bold">
                Время
              </p>
              <p>
                {
                  `${friendlyMeeting.date.getHours()
                  }:${friendlyMeeting
                    .date
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
