import { AnnouncementCreate } from '@/features/announcements/create'
import * as Dialog from '@radix-ui/react-dialog'
import { Theme } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import '@radix-ui/themes/styles.css'

export function KCreateAnnouncementCard() {
  return (
    <Theme accentColor="blue" grayColor="gray">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div
            className={`
              flex h-[200px] flex-col rounded-lg border border-gray-200
              bg-transparent shadow-sm transition-all duration-200 ease-in-out

              dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700

              hover:bg-gray-50 hover:shadow-md

              md:h-[350px] md:max-w-[300px]
            `}
          >
            <Plus size={32} className="m-auto" />
          </div>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className={`
            backdrop-blur-md

            dark:bg-opacity-70
          `}
          />
          <AnnouncementCreate />
        </Dialog.Portal>
      </Dialog.Root>
    </Theme>
  )
}
