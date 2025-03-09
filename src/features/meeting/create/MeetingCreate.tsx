import { AddressCreate } from '@/features/address/create'
import { useAddresses, useDeleteAddress } from '@/shared/api/address'
import { useCreateMeeting } from '@/shared/api/meetings'
import { useMinistryMeetings } from '@/shared/api/ministry-meeting'
import { useCreateService } from '@/shared/api/service'
import { cn } from '@/shared/lib/styles'
import { parseDateSQL } from '@/shared/lib/utils'
import { KBackHistory } from '@/shared/ui/KBackHistory'
import { KDataPicker } from '@/shared/ui/KDataPicker'
import { KInput } from '@/shared/ui/KInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone, toCalendarDate, today } from '@internationalized/date'
import { Checkbox, Dialog, Flex, RadioCards, Separator } from '@radix-ui/themes'
import { Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { meetingStatuses } from '../config'
import { meetingSchema, type MeetingSchemaValues } from '../lib'

export function MeetingCreate() {
  const { data: addresses } = useAddresses()
  const { data: ministryMeetings, isLoading: isLoadingMinistry } = useMinistryMeetings()
  const { mutate: deleteAddress } = useDeleteAddress()
  const { mutate: createMeeting } = useCreateMeeting()
  const { mutate: createService } = useCreateService()

  const [withMinistryMeeting, setWithMinistryMeeting] = useState(false)
  const [isCheckDisabled, setIsCheckDisabled] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoadingMinistry) {
      setIsCheckDisabled(true)
    }
    else if (ministryMeetings && ministryMeetings.length) {
      setIsCheckDisabled(false)
    }
  }, [ministryMeetings, isLoadingMinistry])

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MeetingSchemaValues>({
    defaultValues: {
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
    },
    resolver: zodResolver(meetingSchema),
  })

  const onSubmit = (values: MeetingSchemaValues) => {
    const {
      date,
      leading,
      status_id,
      time,
      address_id,
      administrator,
      closing_prayer,
      lead_wt,
      microphones,
      ministry_meeting_id,
      reader,
      scene,
      speaker,
      special_program,
      speech_title,
      voiceover_zoom,
    } = values

    createService(
      { date: parseDateSQL(time, date), administrator, microphones, scene, voiceover_zoom },
      {
        onSuccess({ data }) {
          createMeeting({
            date: parseDateSQL(time, date),
            leading,
            status_id,
            address_id,
            closing_prayer,
            lead_wt,
            ministry_meeting_id: (withMinistryMeeting && ministry_meeting_id !== 0)
              ? Number(ministry_meeting_id)
              : undefined,
            reader,
            service_id: data?.id,
            speaker,
            special_program,
            speech_title,
          }, { onSuccess() {
            navigate('/admin')
          } })
        },
      },
    )
  }

  useEffect(() => {
    if (addresses) {
      setValue('address_id', addresses[0].id)
    }
  }, [addresses])

  const statusId = watch('status_id')

  useEffect(
    () => {
      if (statusId !== 1) {
        setIsCheckDisabled(true)
      }
    },
    [statusId],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:space-y-6">
      <div className="flex">
        <KBackHistory />
        <p className="flex-grow text-center text-xl font-semibold">Создание Встречи</p>
      </div>
      <div className="my-2 flex justify-between gap-10">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <div>
              <p className="mb-1">Дата:</p>
              <KDataPicker
                {...field}
                onChange={(value) => {
                  const calendarDate = value ? toCalendarDate(value) : undefined
                  field.onChange(calendarDate)
                }}
                value={field.value}
              />
              {errors.date && <p className="text-red-600">{errors.date.message}</p>}
            </div>
          )}
        />
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <label htmlFor="timeInput">Время:</label>
              <input
                {...field}
                id="timeInput"
                type="time"
                className={`
                  mt-1 rounded-lg border border-gray-300 p-2 text-sm font-medium
                  shadow-sm transition-all duration-200 ease-in-out

                  dark:border-gray-600 dark:bg-dark-bg dark:text-gray-200
                  dark:focus:ring-blue-500

                  focus:border-blue-500 focus:outline-none focus:ring-2
                  focus:ring-blue-200
                `}
              />
              {errors.time && <p className="text-red-600">{errors.time.message}</p>}
            </div>
          )}
        />
      </div>

      <Controller
        name="status_id"
        control={control}
        render={({ field }) => (
          <div>
            <div className="mb-2">
              Тип встречи:
            </div>
            <RadioCards.Root columns={{ initial: '2', sm: '4' }}>
              {meetingStatuses.map(type => (
                <button
                  type="button"
                  onClick={() => setValue('status_id', type.id)}
                  className={cn(
                    `
                      relative h-16 rounded-md border px-4 py-2 text-start
                      transition-all duration-200 ease-in-out

                      dark:border-gray-600

                      sm:w-full
                    `,
                    field.value === type.id
                      ? `
                        scale-100 border-blue-500 shadow-md

                        dark:border-blue-500 dark:bg-dark-bg

                        sm:scale-105
                      `
                      : 'hover:shadow-sm',
                  )}
                  key={type.id}
                >
                  <p className="font-bold">{type.title}</p>
                </button>
              ))}
              {errors.status_id && <p className="text-red-600">{errors.status_id.message}</p>}
            </RadioCards.Root>
          </div>
        )}
      />

      {addresses
      && (
        <Controller
          name="address_id"
          control={control}
          render={({ field }) => (
            <div className="my-2">
              <div className="mb-2">
                Адресс:
              </div>
              <RadioCards.Root columns={{ initial: '2', sm: '4' }}>
                {addresses.map(address => (
                  <button
                    type="button"
                    onClick={() => setValue('address_id', address.id)}
                    className={cn(
                      `
                        relative h-20 rounded-md border px-4 py-2 text-start
                        transition-all duration-200 ease-in-out

                        dark:border-gray-600
                      `,
                      field.value === address.id && `
                        border-blue-500 shadow-md

                        dark:border-blue-500 dark:bg-dark-bg

                        sm:scale-105
                      `,
                    )}
                    key={address.id}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteAddress({ id: address.id })
                      }}
                      className="absolute right-1 top-1 cursor-pointer"
                      role="button"
                      tabIndex={0}
                    >
                      <X className="size-3" />
                    </div>
                    <p className="font-bold">{address.address}</p>
                    <a
                      href={address.addressUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 cursor-pointer"
                    >
                      Адресс
                    </a>
                  </button>
                ))}
                {errors.address_id && <p className="text-red-600">{errors.address_id.message}</p>}
                <Dialog.Root>
                  <Dialog.Trigger>
                    <button className={`
                      flex size-full items-center justify-center rounded-md
                      border py-4

                      dark:border-gray-600
                    `}
                    >
                      <Plus />
                    </button>
                  </Dialog.Trigger>
                  <AddressCreate />
                </Dialog.Root>
              </RadioCards.Root>
            </div>
          )}
        />
      )}

      <Controller
        name="leading"
        control={control}
        render={({ field }) => (
          <KInput
            {...field}
            label="Председатель встречи:"
            error={errors.leading?.message}
          />
        )}
      />

      <div className={`
        grid-cols-2 gap-4

        sm:grid
      `}
      >
        <Controller
          name="speaker"
          control={control}
          disabled={statusId === 3 || statusId === 4}
          render={({ field }) => (
            <KInput
              {...field}
              label="Докладчик:"
              error={errors.speaker?.message}
            />
          )}
        />
        <Controller
          name="speech_title"
          control={control}
          disabled={statusId !== 1}
          render={({ field }) => (
            <KInput
              {...field}
              label="Тема речи:"
              error={errors.speech_title?.message}
            />
          )}
        />
      </div>

      <div className={`
        grid-cols-2 gap-4

        sm:grid
      `}
      >
        <Controller
          name="lead_wt"
          control={control}
          render={({ field }) => (
            <KInput
              {...field}
              label="Ведущий С.Б:"
              disabled={statusId === 2 || statusId === 4}
              error={errors.lead_wt?.message}
            />
          )}
        />

        <Controller
          name="reader"
          control={control}
          render={({ field }) => (
            <KInput
              {...field}
              label="Чтец:"
              disabled={statusId === 2 || statusId === 3 || statusId === 4}
              error={errors.reader?.message}
            />
          )}
        />
      </div>

      <Controller
        name="closing_prayer"
        control={control}
        render={({ field }) => (
          <KInput
            {...field}
            label="Заключительная молитва:"
            disabled={statusId === 2 || statusId === 4}
            error={errors.closing_prayer?.message}
          />
        )}
      />

      <Controller
        name="special_program"
        control={control}
        render={({ field }) => (
          <KInput
            {...field}
            label="Спец программа:"
            disabled={statusId === 1 || statusId === 2}
            error={errors.special_program?.message}
          />
        )}
      />

      <Separator className="my-2 h-0.5 w-full" />

      <h1 className="mb-2 text-xl font-semibold">Редактирование Обслуживающих</h1>

      <Controller
        name="scene"
        control={control}
        render={({ field }) => (
          <KInput
            {...field}
            label="Сцена:"
            error={errors.scene?.message}
          />
        )}
      />

      <Controller
        name="microphones"
        control={control}
        render={({ field }) => (
          <KInput
            {...field}
            label="Микрофоны:"
            error={errors.microphones?.message}
          />
        )}
      />

      <Controller
        name="voiceover_zoom"
        control={control}
        render={({ field }) => (
          <KInput
            {...field}
            label="Аппаратура:"
            error={errors.voiceover_zoom?.message}
          />
        )}
      />

      <Controller
        name="administrator"
        control={control}
        render={({ field }) => (
          <KInput
            {...field}
            label="Распорядители:"
            error={errors.administrator?.message}
          />
        )}
      />

      <Separator className="my-2 h-0.5 w-full" />

      <Flex align="center" gap="2" className="my-2">

        <Checkbox
          checked={withMinistryMeeting}
          disabled={isCheckDisabled}
          onCheckedChange={e => setWithMinistryMeeting(e as boolean)}
        />
        ВПС
      </Flex>

      {withMinistryMeeting && (
        <Controller
          name="ministry_meeting_id"
          control={control}
          render={({ field }) => (
            <RadioCards.Root className="my-2" columns={{ initial: '2', sm: '4' }}>
              {ministryMeetings?.map(meeting => (
                <button
                  type="button"
                  onClick={() => setValue('ministry_meeting_id', meeting.id)}
                  className={cn(
                    `
                      relative h-20 rounded-md border bg-white px-4 py-2
                      text-start text-sm transition-all duration-200 ease-in-out

                      dark:border-gray-600 dark:bg-transparent

                      hover:drop-shadow-mainshadow
                    `,
                    field.value === meeting.id
                      ? `
                        scale-100 border-blue-500 shadow-md

                        dark:border-blue-500 dark:bg-dark-bg

                        sm:scale-105
                      `
                      : 'hover:shadow-sm',
                  )}
                  key={meeting.id}
                >
                  <p>{meeting.leader}</p>
                  <p>{meeting.date.toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </button>
              ))}
              {errors.status_id && <p className="text-red-600">{errors.status_id.message}</p>}
            </RadioCards.Root>
          )}
        />
      )}

      <button
        type="submit"
        className={`
          w-full rounded-2xl bg-blue-800 p-2 text-white transition-all
          duration-300 ease-in-out

          hover:bg-blue-600
        `}
      >
        Создать
      </button>
    </form>
  )
}
