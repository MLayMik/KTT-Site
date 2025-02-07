import * as Dialog from '@radix-ui/react-dialog'
import { Theme } from '@radix-ui/themes'
import { X } from 'lucide-react'
import '@radix-ui/themes/styles.css'

interface KAnnouncementCardProps {
  url: string
  title: string
}

export function KAnnouncementCard({ url, title }: KAnnouncementCardProps) {
  return (
    <Theme accentColor="blue" grayColor="gray">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div
            className={`
              flex h-[200px] flex-col rounded-lg border border-gray-200
              bg-transparent shadow-sm transition-all duration-200 ease-in-out

              dark:border-gray-700 dark:bg-gray-800

              hover:shadow-md

              md:h-[350px] md:max-w-[300px]
            `}
          >
            <div className={`
              relative flex h-[calc(100%-54px)] w-full items-center
              justify-center bg-gray-100

              dark:bg-gray-700
            `}
            >
              <embed
                src={`${url}#toolbar=0&navpanes=0&view=FitH`}
                type="application/pdf"
                className="h-full w-full rounded-lg object-cover"
              />
              <div className={`
                absolute inset-0 flex items-center justify-center bg-black
                bg-opacity-10 backdrop-blur-sm
              `}
              >
                <span className={`
                  select-none text-gray-800

                  dark:text-gray-200
                `}
                >
                  📄 Посмотреть
                </span>
              </div>
            </div>
            <p className="p-2.5 text-sm">{title}</p>
          </div>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className={`
            backdrop-blur-md

            dark:bg-opacity-70
          `}
          />
          <Dialog.Content
            className="fixed inset-0 flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={url}
              className="h-full w-full rounded-lg object-cover"
            >
            </iframe>
            <div className={`
              absolute left-2 top-2 flex gap-4

              sm:left-10 sm:top-5
            `}
            >
              <Dialog.Close
                className={`
                  rounded-full bg-gray-700 p-2 text-gray-200 shadow-xl

                  dark:bg-white dark:text-gray-700 dark:hover:bg-gray-300

                  hover:bg-gray-600
                `}
              >
                <X size={18} />
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Theme>
  )
}
