import { useCreateAddress } from '@/shared/api/address'
import { KInput } from '@/shared/ui/KInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { addressSchema, type AddressSchemaValues } from '../lib'

export function AddressCreate() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { mutate: createAddress } = useCreateAddress()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressSchemaValues>({
    defaultValues: {
      address: '',
      address_url: '',
    },
    resolver: zodResolver(addressSchema),
  })

  const onSubmit = (values: AddressSchemaValues) => {
    createAddress(
      {
        ...values,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false)
          reset()
        },
      },
    )
  }

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger>
        <button className={`
          flex size-full items-center justify-center rounded-md border py-4

          dark:border-gray-600
        `}
        >
          <Plus />
        </button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-[450px]" aria-describedby="">
        <Dialog.Title>Добавить адресс</Dialog.Title>
        <div className="flex flex-col gap-3">
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <KInput
                {...field}
                label="Место или город"
                placeholder="Название места, города"
                error={errors.address?.message}
              />
            )}
          />
          <Controller
            name="address_url"
            control={control}
            render={({ field }) => (
              <KInput
                {...field}
                label="Ссылка"
                placeholder="Вставь ссылку с карты"
                error={errors.address_url?.message}
              />
            )}
          />
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Отменить
            </Button>
          </Dialog.Close>
          <Button onClick={handleSubmit(onSubmit)}>
            Создать
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
