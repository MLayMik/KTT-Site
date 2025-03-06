import { keys, useCreateAddress } from '@/shared/api/address'
import { Button, Dialog, TextField } from '@radix-ui/themes'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function AddressCreate() {
  const [newAddress, setNewAddress] = useState('')
  const [newAddressUrl, setNewAddressUrl] = useState('')

  const { mutate } = useCreateAddress()
  const queryClient = useQueryClient()

  const handleCreateAddress = () => {
    mutate({
      address: newAddress,
      address_url: newAddressUrl,

    }, { onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.getAddresses() })
    } })
  }

  return (
    <Dialog.Content className="max-w-[450px]" aria-describedby="">
      <Dialog.Title>Добавить адресс</Dialog.Title>

      <div className="flex flex-col gap-3">
        <label>
          <div className="mb-1 text-sm font-bold">
            Место или город
          </div>

          <TextField.Root
            value={newAddress}
            onChange={e => setNewAddress(e.target.value)}
            placeholder="Название места, города"
          />
        </label>
        <label>
          <div className="mb-1 text-sm font-bold">
            Ссылка
          </div>
          <TextField.Root
            value={newAddressUrl}
            onChange={e => setNewAddressUrl(e.target.value)}
            placeholder="Вставь ссылку с карты"
          />
        </label>
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
  )
}
