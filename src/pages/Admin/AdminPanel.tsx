import { AddressCreate } from '@/features/address/create'
import { keys, useAddresses, useDeleteAddress } from '@/shared/api/address'
import { useAuthRedirect } from '@/shared/auth/auth'
import { cn } from '@/shared/lib/styles'
import { DataPicker } from '@/shared/ui/data-picker'
import { KInput } from '@/shared/ui/input'
import { Dialog, RadioCards } from '@radix-ui/themes'
import { useQueryClient } from '@tanstack/react-query'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function AdminPanel() {
  useAuthRedirect()

  const { data } = useAddresses()
  const { mutate } = useDeleteAddress()

  const [addressId, setAddressId] = useState(0)

  const queryClient = useQueryClient()

  const handleDeleteAddress = (id: number) => {
    mutate(
      { id },
      {
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: keys.getAddresses() })
        },
      },
    )
  }

  type MeetingType = 'Собрание' | 'Конгресс' | 'Спец программа' | 'Вечеря' | null

  const [selectedType, setSelectedType] = useState<MeetingType>(null)

  const handleSelectType = async (type: MeetingType) => {
    setSelectedType(type)
  }
  return (
    <div className={`
      m-3 flex flex-col gap-y-6 rounded-lg bg-white p-6 pb-8 font-medium shadow-md transition-all
      duration-200 ease-in-out

      dark:bg-dark-primary dark:text-gray-200
    `}
    >

      <h1 className="mb-2 text-xl font-semibold">Редактирование Встречи</h1>
      <DataPicker />

      <div className={`
        flex flex-col gap-2

        sm:flex-row sm:justify-between sm:gap-5
      `}
      >
        {['Собрание', 'Конгресс', 'Спец программа', 'Вечеря'].map(type => (
          <button
            onClick={() => handleSelectType(type as MeetingType)}
            className={cn(
              `
                relative rounded-md border px-4 py-2 text-start text-sm transition-all duration-200
                ease-in-out

                dark:border-gray-600

                sm:w-full
              `,
              selectedType === type
                ? `
                  scale-100 border-blue-500 shadow-md

                  dark:border-blue-500

                  sm:scale-105
                `
                : 'hover:shadow-sm',
            )}
            key={type}
          >
            <p className="font-bold">{type}</p>
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Дата и время:</label>
        <p className="mt-1 rounded-lg border border-gray-300 p-2">19 Октября в 10:00 (Třinec)</p>
      </div>

      {data
      && (
        <RadioCards.Root columns={{ initial: '1', sm: '5' }}>
          {data.map(address => (
            <button
              onClick={() => setAddressId(address.id)}
              className={cn(
                `
                  relative h-20 rounded-md border px-4 py-2 text-start transition-all duration-200
                  ease-in-out

                  dark:border-gray-600
                `,
                addressId === address.id && `
                  border-blue-500 shadow-md

                  dark:border-blue-500

                  sm:scale-105
                `,
              )}
              key={address.id}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation() // Остановка всплытия, чтобы основной <button> не срабатывал
                  handleDeleteAddress(address.id)
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
          <Dialog.Root>
            <Dialog.Trigger>
              <button className="flex size-full items-center justify-center rounded-md border">
                <Plus />
              </button>
            </Dialog.Trigger>
            <AddressCreate />
          </Dialog.Root>
        </RadioCards.Root>
      )}

      <div className="mb-4">
        <label htmlFor="chairman" className="block text-sm font-medium">Место</label>
        <KInput />
      </div>
      <div className="mb-4">
        <label htmlFor="chairman" className="block text-sm font-medium">Председатель встречи</label>
        <KInput />
      </div>

      <div className="mb-4">
        <label htmlFor="speaker" className="block text-sm font-medium">Докладчик</label>
        <KInput />
      </div>

      <div className="mb-4">
        <label htmlFor="publicTalk" className="block text-sm font-medium">Публичная речь</label>
        <KInput />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sbLeader" className="block text-sm font-medium">Ведущий С.Б.</label>
          <KInput />
        </div>

        <div>
          <label htmlFor="reader" className="block text-sm font-medium">Чтец</label>
          <KInput />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="closingPrayer" className="block text-sm font-medium">Заключительная молитва</label>
        <KInput />
      </div>

      <button
        className={`
          w-full rounded-2xl bg-blue-500 p-2 text-white transition-all duration-300 ease-in-out

          hover:bg-blue-600
        `}
      >
        Сохранить изменения
      </button>
    </div>
  )
}
