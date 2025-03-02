import type { z } from 'zod'
import { useUpdateMinistryFriendly } from '@/shared/api/ministry-friendly'
import { useMinistryMeeting } from '@/shared/api/ministry-meeting'
import { parseDateSQL } from '@/shared/lib/utils'
import { KBackHistory } from '@/shared/ui/KBackHistory'
import { KDataPicker } from '@/shared/ui/KDataPicker'
import { KInput } from '@/shared/ui/KInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { toCalendarDate } from '@internationalized/date'
import { Checkbox, Flex } from '@radix-ui/themes'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ministryFriendlySchema, provideDefaultValues } from './lib'

export function MinistryMeetingEdit() {
  const params = useParams()
  const navigate = useNavigate()

  const { data: meeting } = useMinistryMeeting({ id: +params.id! || 0 })

  const {
    mutate: updateMinistryFriendly,
    data: response,
  } = useUpdateMinistryFriendly()

  const [withFriendly, setWithFriendly] = useState(false)

  const schema = useMemo(
    () => withFriendly
      ? ministryFriendlySchema
      : ministryFriendlySchema.omit({ friendly: true }),
    [withFriendly],
  )

  type FormValues = z.infer<typeof ministryFriendlySchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (values: FormValues) => {
    if (meeting) {
      updateMinistryFriendly({
        id: meeting.id,
        with_friendly: withFriendly,
        ministry: {
          date: parseDateSQL(values.ministry.time, values.ministry.date),
          leader: values.ministry.leader,
          address: values.ministry.address,
          address_url: values.ministry.addressUrl,
        },
        friendly: values.friendly && withFriendly
          ? {
              date: parseDateSQL(values.friendly.time, values.friendly.date),
              inviting: values.friendly.inviting,
              description: values.friendly.description,
              address: values.friendly.address,
              address_url: values.friendly.addressUrl,
            }
          : undefined,
      }, { onSuccess: () => navigate('/admin') })
    }
  }

  useEffect(() => {
    if (meeting?.friendlyMeeting) {
      setWithFriendly(true)
    }
  }, [meeting])

  useEffect(() => {
    if (meeting) {
      reset(provideDefaultValues(meeting))
    }
  }, [meeting])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:space-y-6">
      <div className="flex">
        <KBackHistory />
        <p className="flex-grow text-center text-xl font-semibold">
          Редактирование Встречи Для Проповеди
        </p>
      </div>
      <div className="my-2 flex justify-between gap-10">
        <Controller
          name="ministry.date"
          control={control}
          render={({ field }) => (
            <div>
              <p className="mb-1">Дата:</p>
              <KDataPicker
                {...field}
                onChange={(value) => {
                  const calendarDate = value
                    ? toCalendarDate(value)
                    : undefined
                  field.onChange(calendarDate)
                }}
                value={field.value}
              />
              {errors.ministry?.date
              && <p className="text-red-600">{errors.ministry.date.message}</p>}
            </div>
          )}
        />
        <Controller
          name="ministry.time"
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
              {errors.ministry?.time
              && <p className="text-red-600">{errors.ministry.time.message}</p>}
            </div>
          )}
        />
      </div>
      <Controller
        name="ministry.leader"
        control={control}
        render={({ field }) => (
          <KInput
            {...field}
            label="Ведущий:"
            error={errors.ministry?.leader?.message}
          />
        )}
      />
      <Controller
        name="ministry.address"
        control={control}
        render={({ field }) => (
          <KInput
            {...field}
            label="Адрес:"
            error={errors.ministry?.address?.message}
          />
        )}
      />
      <Controller
        name="ministry.addressUrl"
        control={control}
        render={({ field }) => (
          <KInput
            {...field}
            label="Ссылка на адрес:"
            error={errors.ministry?.addressUrl?.message}
          />
        )}
      />

      <Flex align="center" className="m-2" gap="2">
        <Checkbox
          checked={withFriendly}
          onCheckedChange={e => setWithFriendly(e as boolean)}
        />
        Дружеская встреча
      </Flex>

      {withFriendly && (
        <div className="space-y-6">
          <div className="flex justify-between gap-10">
            <Controller
              name="friendly.date"
              control={control}
              render={({ field }) => (
                <div>
                  <p className="mb-1">Дата:</p>
                  <KDataPicker
                    {...field}
                    onChange={(value) => {
                      const calendarDate = value
                        ? toCalendarDate(value)
                        : undefined
                      field.onChange(calendarDate)
                    }}
                    value={field.value}
                  />
                  {
                    errors.friendly?.date && (
                      <p className="text-red-600">
                        {errors.friendly.date.message}
                      </p>
                    )
                  }
                </div>
              )}
            />
            <Controller
              name="friendly.time"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <label htmlFor="timeInput">Время:</label>
                  <input
                    {...field}
                    id="timeInput"
                    type="time"
                    className={`
                      mt-1 rounded-lg border border-gray-300 p-2 text-sm
                      font-medium shadow-sm transition-all duration-200
                      ease-in-out

                      dark:border-gray-600 dark:bg-dark-bg dark:text-gray-200
                      dark:focus:ring-blue-500

                      focus:border-blue-500 focus:outline-none focus:ring-2
                      focus:ring-blue-200
                    `}
                  />
                  {errors.friendly?.time && (
                    <p className="text-red-600">
                      {errors.friendly.time.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <Controller
            name="friendly.inviting"
            control={control}
            render={({ field }) => (
              <KInput
                {...field}
                label="Приглашающий:"
                error={errors.friendly?.inviting?.message}
              />
            )}
          />
          <Controller
            name="friendly.description"
            control={control}
            render={({ field }) => (
              <KInput
                {...field}
                label="Описание:"
                error={errors.friendly?.description?.message}
              />
            )}
          />
          <Controller
            name="friendly.address"
            control={control}
            render={({ field }) => (
              <KInput
                {...field}
                label="Адрес:"
                error={errors.friendly?.address?.message}
              />
            )}
          />
          <Controller
            name="friendly.addressUrl"
            control={control}
            render={({ field }) => (
              <KInput
                {...field}
                label="Ссылка на адрес:"
                error={errors.friendly?.addressUrl?.message}
              />
            )}
          />
        </div>
      )}
      <button
        type="submit"
        className={`
          mt-2 w-full rounded-2xl bg-blue-800 p-2 text-white transition-all
          duration-300 ease-in-out

          hover:bg-blue-600
        `}
      >
        Изменить
      </button>
      {response && <p>{response.message}</p>}
    </form>
  )
}
