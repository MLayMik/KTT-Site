import { useMeetings } from '@/shared/api/meetings/query'
import { KLoader } from '@/shared/ui/KLoader'
import { Separator } from '@radix-ui/themes'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

export function MeetingProgram() {
  const { data, isLoading } = useMeetings()

  const [index, setIndex] = useState(0)

  const currentProgram = useMemo(() => {
    if (data)
      return data[index]
    return null
  }, [data, index])

  if (isLoading) {
    return <KLoader />
  }

  if (currentProgram === null) {
    return (
      <div className={`
        p-2 text-center text-gray-800

        dark:text-gray-300
      `}
      >
        Нет программы
      </div>
    )
  }

  if (currentProgram === undefined) {
    return (
      <div className={`
        text-red-600

        dark:text-red-400
      `}
      >
        Проблемы сервера
      </div>
    )
  }

  return (
    <div
      className={`
        mx-3 my-1 flex flex-col gap-y-6 pb-8 font-medium text-gray-800

        dark:text-gray-200

        sm:mx-10 sm:my-5 sm:pb-0
      `}
    >
      <div className="flex flex-col justify-center text-center">
        <div>{currentProgram.status?.title}</div>
        <div className="flex justify-center">
          <button
            className={`
              ${index === 0 ? 'hidden' : 'block'}
            `}
            disabled={index === 0}
            onClick={() => setIndex(prev => prev - 1)}
          >
            <ChevronLeft className={`
              size-5 text-gray-700

              dark:text-gray-400
            `}
            />
          </button>
          <p>
            {currentProgram.date.toLocaleString('ru', { day: 'numeric', month: 'long' })}
            {' '}
            в
            {' '}
            {`${currentProgram.date.getHours()}:${currentProgram.date
              .getMinutes()
              .toString()
              .padStart(2, '0')}`}
            {' '}
            (
            {currentProgram.address?.address}
            )
          </p>
          <button
            className={`
              ${index === data!.length - 1 ? 'hidden' : 'block'}
            `}
            disabled={index === data!.length - 1}
            onClick={() => setIndex(prev => prev + 1)}
          >
            <ChevronRight className={`
              size-5 text-gray-700

              dark:text-gray-400
            `}
            />
          </button>
        </div>
      </div>

      <div className={`
        flex justify-between rounded-xl bg-white px-4 py-2 drop-shadow-mainshadow

        dark:bg-gray-800
      `}
      >
        <p>Председатель встречи</p>
        <p className="font-semibold">{currentProgram.leading}</p>
      </div>

      <div
        className={`
          flex justify-between rounded-xl bg-white py-1 text-center drop-shadow-mainshadow

          dark:bg-dark-bg

          md:bg-transparent
        `}
      >
        <div
          className={`
            rounded-xl px-4 py-2 drop-shadow-mainshadow

            dark:bg-dark-bg dark:drop-shadow-none dark:md:bg-dark-bg

            md:bg-white
          `}
        >
          <p>Докладчик</p>
          <p className="mt-2 font-semibold italic">{currentProgram.speaker}</p>
        </div>
        <div
          className={`
            rounded-xl px-4 py-2 drop-shadow-mainshadow

            dark:bg-gray-800 dark:drop-shadow-none dark:md:bg-dark-bg

            md:bg-white
          `}
        >
          <p>Публичная речь</p>
          <p className={`
            mt-2 font-bold text-slate-900

            dark:text-slate-200
          `}
          >
            {currentProgram.speechTitle}
          </p>
        </div>
      </div>

      <div
        className={`
          flex justify-between rounded-xl bg-white px-4 py-3 text-center drop-shadow-mainshadow

          dark:bg-gray-800
        `}
      >
        <div>
          <p>Ведущий С.Б.</p>
          <p className="font-semibold">{currentProgram.leadWt}</p>
        </div>
        <div>
          <p>Чтец</p>
          <p className="font-semibold">{currentProgram.reader}</p>
        </div>
      </div>

      <div className={`
        flex justify-between rounded-xl bg-white px-4 py-2 drop-shadow-mainshadow

        dark:bg-gray-800
      `}
      >
        <p>Заключительная молитва</p>
        <p className="font-semibold">{currentProgram.closingPrayer}</p>
      </div>
      {currentProgram.ministryMeeting && (
        <div
          className={`
            rounded-lg bg-white px-2 py-2 drop-shadow-md transition-all duration-200 ease-in-out

            dark:bg-dark-bg

            sm:px-4 sm:py-3
          `}
        >
          <p className="mb-2 text-center">Встреча Проповеднического Служения</p>
          <div
            className="flex justify-around"
          >

            <div className="sm:col-auto">
              <p className={`
                text-sm font-semibold text-gray-500

                sm:hidden
              `}
              >
                Время
              </p>
              <p>
                {`${currentProgram.ministryMeeting.date.getHours()}:${currentProgram.ministryMeeting.date.getMinutes().toString().padStart(2, '0')}`}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className={`
                text-sm font-semibold text-gray-500

                sm:hidden
              `}
              >
                Ведущий
              </p>
              <p>{currentProgram.ministryMeeting.leader ?? null}</p>
            </div>
          </div>
          {currentProgram.ministryMeeting.friendlyMeeting && (
            <>

              <Separator className="my-5 w-full" />
              <div className={`
                mt-2 flex flex-col gap-2 rounded-xl bg-blue-200 px-3 py-2 drop-shadow-mainshadow

                dark:bg-dark-primary
              `}
              >

                <p className="text-center font-bold">Дружеская встреча</p>
                <p>
                  {currentProgram.ministryMeeting.friendlyMeeting.description}
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
                      href={currentProgram.ministryMeeting.friendlyMeeting.addressUrl}
                      className="text-blue-600 underline"
                    >
                      {currentProgram.ministryMeeting.friendlyMeeting.address}
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
                      {`${currentProgram.ministryMeeting.friendlyMeeting.date.getHours()}:${currentProgram.ministryMeeting.friendlyMeeting.date.getMinutes().toString().padStart(2, '0')}`}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
