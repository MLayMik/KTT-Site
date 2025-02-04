import { keys, useCreateAnnouncement } from '@/shared/api/announcements'
import { queryClient } from '@/shared/api/lib'
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import { useState } from 'react'

export function AnnouncementCreate() {
  const [newTitle, setNewTitle] = useState('')
  const [newAnnouncementUrl, setNewAnnouncementUrl] = useState('')

  const { mutate } = useCreateAnnouncement()

  const handleCreateAnnouncement = () => {
    mutate({
      title: newTitle,
      announcement_url: newAnnouncementUrl,
    }, { onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.getAnnouncements() })
    } })
  }
  return (
    <Dialog.Content className="max-w-[450px]" aria-describedby="">
      <Dialog.Title>Добавить объявление</Dialog.Title>

      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Тема
          </Text>
          <TextField.Root
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Название объявления"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Ссылка на документ
          </Text>
          <TextField.Root
            value={newAnnouncementUrl}
            onChange={e => setNewAnnouncementUrl(e.target.value)}
            placeholder="Вставь ссылку из Google Drive"
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
          <Button onClick={handleCreateAnnouncement}>
            Создать
          </Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  )
};
