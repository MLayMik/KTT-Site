import { keys, useCreateAddress } from '@/shared/api/address'
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
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
    <Dialog.Content maxWidth="450px" aria-describedby="">
      <Dialog.Title>Добавить адресс</Dialog.Title>

      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Место или город
          </Text>
          <TextField.Root
            value={newAddress}
            onChange={e => setNewAddress(e.target.value)}
            placeholder="Название места, города"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Ссылка
          </Text>
          <TextField.Root
            value={newAddressUrl}
            onChange={e => setNewAddressUrl(e.target.value)}
            placeholder="Вставь ссылку с карты"
          />
        </label>
      </Flex>

      <Flex gap="3" mt="4" justify="end">
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
      </Flex>
    </Dialog.Content>
  )
}
