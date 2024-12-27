import { AddressCreate } from '@/features/address/create'
import { useAddresses, useDeleteAddress } from '@/shared/api/address'
import { useMeetingById, useUpdateMeeting } from '@/shared/api/meetings'
import { useUpdateService } from '@/shared/api/service'
import { cn } from '@/shared/lib/styles'
import { parseDateSQL } from '@/shared/lib/utils'
import { DataPicker } from '@/shared/ui/DataPicker'
import { KInput } from '@/shared/ui/KInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone, parseDate, toCalendarDate, today } from '@internationalized/date'
import { Dialog, RadioCards, Separator } from '@radix-ui/themes'
import { Plus, X } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { meetingStatuses } from '../config'
import { meetingSchema, type MeetingSchemaValues } from './lib'

export function MeetingEdit() {
  const params = useParams()

  const { data: meeting } = useMeetingById({ id: +params.id! || 0 })

  const { data: addresses } = useAddresses()
  const { mutate: deleteAddress } = useDeleteAddress()
  const { mutate: updateMeeting } = useUpdateMeeting()
  const { mutate: updateService } = useUpdateService()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MeetingSchemaValues>({
    defaultValues: {
      address_id: 1,
      administrator: undefined,
      closing_prayer: undefined,
      date: today(getLocalTimeZone()),
      time: '09:00',
      lead_wt: undefined,
      leading: '',
      microphones: undefined,
      ministry_meeting_id: undefined,
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

    updateService(
      {
        id: meeting!.serviceId!,
        date: parseDateSQL(time, date),
        administrator,
        microphones,
        scene,
        voiceover_zoom,
      },
      {
        onSuccess({ data }) {
          updateMeeting({
            id: meeting!.id,
            date: parseDateSQL(time, date),
            leading,
            status_id,
            address_id,
            closing_prayer,
            lead_wt,
            ministry_meeting_id,
            reader,
            service_id: data?.id,
            speaker,
            special_program,
            speech_title,
          })
        },
      },
    )
  }

  useEffect(() => {
    if (meeting) {
      setValue(
        'time',
        meeting.date.toISOString().slice(11, 16),
      )
      setValue(
        'date',
        parseDate(meeting.date.toISOString().split('T')[0]),
      )
      setValue('address_id', meeting.address?.id)
      setValue('administrator', meeting.service?.administrator ?? undefined)
      setValue('closing_prayer', meeting.closingPrayer ?? undefined)
      setValue('lead_wt', meeting.leadWt ?? undefined)
      setValue('leading', meeting.leading ?? undefined)
      setValue('microphones', meeting.service?.microphones ?? undefined)
      setValue('ministry_meeting_id', meeting.ministryMeeting?.id ?? undefined)
      setValue('reader', meeting.reader ?? undefined)
      setValue('scene', meeting.service?.scene ?? undefined)
      setValue('special_program', meeting.specialProgram ?? undefined)
      setValue('speech_title', meeting.speechTitle ?? undefined)
      setValue('status_id', meeting.status!.id ?? undefined)
      setValue('voiceover_zoom', meeting.service?.voiceoverZoom ?? undefined)
      setValue('speaker', meeting.speaker ?? undefined)
    }
  }, [meeting])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:space-y-6">
      <h1 className="mb-2 text-xl font-semibold">Редактирование Встречи</h1>
      <div className="flex justify-between gap-10">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <div>
              <p className="mb-1">Дата:</p>
              <DataPicker
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
                  mt-1 rounded-lg border border-gray-300 p-2 text-sm font-medium shadow-sm
                  transition-all duration-200 ease-in-out

                  dark:border-gray-600 dark:bg-dark-bg dark:text-gray-200 dark:focus:ring-blue-500

                  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
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
                      relative h-16 rounded-md border px-4 py-2 text-start transition-all
                      duration-200 ease-in-out

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
            <div>
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
                        relative h-20 rounded-md border px-4 py-2 text-start transition-all
                        duration-200 ease-in-out

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
                      flex size-full items-center justify-center rounded-md border py-4

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
          render={({ field }) => (
            <KInput
              {...field}
              label="Публичная речь:"
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
              label="Ведущий:"
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
            error={errors.special_program?.message}
          />
        )}
      />

      <Separator className="h-0.5 w-full" />
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

      <button
        type="submit"
        className={`
          w-full rounded-2xl bg-blue-800 p-2 text-white transition-all duration-300 ease-in-out

          hover:bg-blue-600
        `}
      >
        Сохранить изменения
      </button>
    </form>
  )
}
