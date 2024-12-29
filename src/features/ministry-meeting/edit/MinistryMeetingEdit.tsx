import { useCreateFriendlyMeeting, useDeleteFriendlyMeeting, useUpdateFriendlyMeeting } from '@/shared/api/friendly-meeting'
import { useMinistryMeeting, useUpdateMinistryMeeting } from '@/shared/api/ministry-meeting'
import { parseDateSQL } from '@/shared/lib/utils'
import { DataPicker } from '@/shared/ui/DataPicker'
import { KBackHistory } from '@/shared/ui/KBackHistory'
import { KInput } from '@/shared/ui/KInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone, parseDate, toCalendarDate, today } from '@internationalized/date'
import { CheckboxCards } from '@radix-ui/themes'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ministryMeetingSchema,
  type MinistryMeetingValues,
  ministryMeetingWithFriendlyMeetingSchema,
  type MinistryMeetingWithFriendlyMeetingValues,
} from './lib'

export function MinistryMeetingEdit() {
  const params = useParams()

  const { data: meeting } = useMinistryMeeting({ id: +params.id! || 0 })

  const { data: response, mutate: updateMeeting } = useUpdateMinistryMeeting()
  const { mutate: updateFriendly } = useUpdateFriendlyMeeting()
  const { mutate: createFriendly } = useCreateFriendlyMeeting()
  const { mutate: deleteFriendly } = useDeleteFriendlyMeeting()

  const navigate = useNavigate()

  const [withFriendlyMeeting, setWithFriendlyMeeting] = useState(false)

  const schema = useMemo(
    () => withFriendlyMeeting ? ministryMeetingWithFriendlyMeetingSchema : ministryMeetingSchema,
    [withFriendlyMeeting],
  )

    type ConditionalFormValues = typeof withFriendlyMeeting extends true
      ? MinistryMeetingValues
      : MinistryMeetingWithFriendlyMeetingValues

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm<ConditionalFormValues>({
      defaultValues: {
        time: '09:00',
        date: today(getLocalTimeZone()),
        leader: undefined,
        address: undefined,
        addressUrl: undefined,
        description: '',
        friendlyAddress: '',
        friendlyAddressUrl: '',
        friendlyDate: today(getLocalTimeZone()),
        friendlyTime: '09:00',
        inviting: '',
      },
      resolver: zodResolver(schema),
    })

    const onSubmit = (values: ConditionalFormValues) => {
      if (withFriendlyMeeting) {
        const {
          description,
          friendlyAddress,
          friendlyAddressUrl,
          friendlyDate,
          friendlyTime,
          inviting,
          date,
          time,
          address,
          addressUrl,
          leader,
        } = values

        if (!meeting?.friendlyMeeting) {
          updateFriendly(
            {
              id: meeting!.friendlyMeeting!.id,
              address: friendlyAddress,
              address_url: friendlyAddressUrl,
              date: parseDateSQL(friendlyTime, friendlyDate),
              description,
              inviting,
            },
            {
              onSuccess(r) {
                updateMeeting({
                  id: +params.id!,
                  friendly_meeting_id: r.data?.id,
                  date: parseDateSQL(time, date),
                  leader,
                  address,
                  address_url: addressUrl,
                })
              },
            },
          )
        }
        else {
          createFriendly(
            {
              address: friendlyAddress,
              address_url: friendlyAddressUrl,
              date: parseDateSQL(friendlyTime, friendlyDate),
              description,
              inviting,
            },
            {
              onSuccess(r) {
                updateMeeting({
                  id: +params.id!,
                  friendly_meeting_id: r.data?.id,
                  date: parseDateSQL(time, date),
                  leader,
                  address,
                  address_url: addressUrl,
                })
              },
            },
          )
        }
      }
      else {
        const { time, date, leader, address, addressUrl } = values
        if (meeting?.friendlyMeeting) {
          deleteFriendly({ id: meeting?.friendlyMeeting.id })
        }

        updateMeeting({
          id: +params.id!,
          date: parseDateSQL(time, date),
          leader,
          address,
          address_url: addressUrl,
        })
      }

      navigate(-1)
    }

    useEffect(() => {
      if (meeting) {
        setValue('leader', meeting.leader ?? '')
        setValue('address', meeting.address ?? '')
        setValue('addressUrl', meeting.addressUrl ?? '')
        setValue(
          'time',
          meeting.date.toISOString().slice(11, 16),
        )
        setValue(
          'date',
          parseDate(meeting.date.toISOString().split('T')[0]),

        )
        if (meeting.friendlyMeeting) {
          setValue('friendlyDate', parseDate(meeting.date.toISOString().split('T')[0]))
          setValue(
            'friendlyTime',
            meeting.friendlyMeeting.date.toISOString().slice(11, 16),
          )
          setValue('inviting', meeting.friendlyMeeting.inviting)
          setValue('description', meeting.friendlyMeeting.description)
          setValue('friendlyAddress', meeting.friendlyMeeting.address)
          setValue('friendlyAddressUrl', meeting.friendlyMeeting.addressUrl)
        }
      }
    }, [meeting])

    useEffect(() => {
      if (meeting?.friendlyMeeting) {
        setWithFriendlyMeeting(true)
      }
    }, [meeting])

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="sm:space-y-6">
        <div className="flex">
          <KBackHistory />
          <p className="flex-grow text-center text-xl font-semibold">Редактирование Встречи Для Проповеди</p>
        </div>
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
          name="leader"
          control={control}
          render={({ field }) => (
            <KInput
              {...field}
              label="Ведущий:"
              error={errors.leader?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <KInput
              {...field}
              label="Адрес:"
              error={errors.address?.message}
            />
          )}
        />
        <Controller
          name="addressUrl"
          control={control}
          render={({ field }) => (
            <KInput
              {...field}
              label="Ссылка на адрес:"
              error={errors.addressUrl?.message}
            />
          )}
        />
        <CheckboxCards.Root columns={{ initial: '1', sm: '3  ' }}>
          <CheckboxCards.Item onClick={() => setWithFriendlyMeeting(!withFriendlyMeeting)} value="1">
            <p>
              Дружеская встреча
            </p>
          </CheckboxCards.Item>
        </CheckboxCards.Root>
        {withFriendlyMeeting && (
          <div className="space-y-6">
            <div className="flex justify-between gap-10">
              <Controller
                name="friendlyDate"
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
                    {
                      errors.friendlyDate && (
                        <p className="text-red-600">
                          {errors.friendlyDate.message}
                        </p>
                      )
                    }
                  </div>
                )}
              />
              <Controller
                name="friendlyTime"
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

                        dark:border-gray-600 dark:bg-dark-bg dark:text-gray-200
                        dark:focus:ring-blue-500

                        focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                      `}
                    />
                    {errors.friendlyTime && (
                      <p className="text-red-600">
                        {errors.friendlyTime.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <Controller
              name="inviting"
              control={control}
              render={({ field }) => (
                <KInput
                  {...field}
                  label="Приглашающий:"
                  error={errors.inviting?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <KInput
                  {...field}
                  label="Описание:"
                  error={errors.description?.message}
                />
              )}
            />
            <Controller
              name="friendlyAddress"
              control={control}
              render={({ field }) => (
                <KInput
                  {...field}
                  label="Адрес:"
                  error={errors.friendlyAddress?.message}
                />
              )}
            />
            <Controller
              name="friendlyAddressUrl"
              control={control}
              render={({ field }) => (
                <KInput
                  {...field}
                  label="Ссылка на адрес:"
                  error={errors.friendlyAddressUrl?.message}
                />
              )}
            />
          </div>
        )}
        <button
          type="submit"
          className={`
            w-full rounded-2xl bg-blue-800 p-2 text-white transition-all duration-300 ease-in-out

            hover:bg-blue-600
          `}
        >
          Изменить
        </button>
        {response && <p>{response.message}</p>}
      </form>
    )
}
