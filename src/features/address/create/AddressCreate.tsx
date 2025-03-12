import { keys, useCreateAddress } from '@/shared/api/address'
import { KInput } from '@/shared/ui/KInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog, TextField } from '@radix-ui/themes'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { addressSchema, type AddressSchemaValues } from '../lib'

export function AddressCreate() {
  const [newAddress, setNewAddress] = useState('')
  const [newAddressUrl, setNewAddressUrl] = useState('')

  const { mutate: createAddress } = useCreateAddress()
  const queryClient = useQueryClient()

  const handleCreateAddress = () => {
    mutate({
      address: newAddress,
      address_url: newAddressUrl,

    }, { onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.getAddresses() })
    } })
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressSchemaValues>({
    defaultValues: {
      address: '',
      address_url: '',
    },
    resolver: zodResolver(addressSchema),
  })

  const onSubmit = (values: AddressSchemaValues) => {
    const {
      address,
      address_url,
    } = values

    createAddress(
      {
        onSuccess({data}) {
          
        }
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <Dialog.Close>
            <Button onClick={handleCreateAddress}>
              Создать
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </form>
  )
}
