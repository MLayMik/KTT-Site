import { cn } from '@/shared/lib/styles'
import * as Dialog from '@radix-ui/react-dialog'
import { Theme } from '@radix-ui/themes'
import { Minus, Plus, X } from 'lucide-react'
import { useState } from 'react'
import '@radix-ui/themes/styles.css'

interface KAnnouncmentCardProps {
  imageUrl: string
  title: string
}

export function KAnnouncmentCard({ imageUrl, title }: KAnnouncmentCardProps) {
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 1.6))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.6))
  return (
    <Theme accentColor="blue" grayColor="gray">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div
            className={`
              flex h-[200px] flex-col rounded-lg border-gray-200 bg-blue-100 bg-transparent
              shadow-sm transition-all duration-200 ease-in-out

              dark:border-gray-700 dark:bg-gray-800

              hover:shadow-md

              md:h-[350px] md:max-w-[300px]
            `}
          >
            <img
              src={imageUrl}
              alt={title}
              className="h-[calc(100%-54px)] w-full flex-shrink-0 rounded-lg object-cover"
            />
            <p className="p-2.5 text-sm">{title}</p>
          </div>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay
            onClick={e => e.stopPropagation()}
          />
          <Dialog.Content
            className={`
              fixed inset-0 flex items-center justify-center overflow-auto bg-dark-primary
              bg-opacity-50 backdrop-blur-sm

              dark:bg-opacity-70
            `}
            onClick={e => e.stopPropagation()}
          >
            <div
              className={cn(`
                h-[90vh] max-h-[95vh] w-[95vw] max-w-4xl origin-center -translate-x-1/2 transform
                rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 ease-in-out

                dark:bg-gray-800
              `)}
              style={{
                transform: `scale(${zoom})`,
              }}
            >
              <div
                className="h-full w-full overflow-auto"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              >
                {imageUrl.endsWith('.pdf')
                  ? (
                      <iframe
                        src={imageUrl}
                        className="h-full w-full border-none"
                        title={title}
                      />
                    )
                  : (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-contain object-center"
                      />
                    )}
              </div>
            </div>

            <div className="fixed bottom-10 left-1/2 flex -translate-x-1/2 transform gap-4">
              <Dialog.Close
                onClick={() => setZoom(1)}
                className={`
                  rounded-full bg-gray-700 p-2 text-gray-200 transition-all duration-100 ease-in-out

                  dark:bg-white dark:text-gray-700 dark:hover:bg-gray-300

                  hover:bg-gray-600
                `}
              >
                <X size={18} />
              </Dialog.Close>
              <button
                onClick={handleZoomOut}
                className={`
                  rounded-full bg-gray-300 p-2 text-gray-800 transition-all duration-100 ease-in-out

                  dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600

                  hover:bg-gray-400
                `}
              >
                <Minus size={18} />
              </button>
              <button
                onClick={handleZoomIn}
                className={`
                  rounded-full bg-gray-300 p-2 text-gray-800 transition-all duration-100 ease-in-out

                  dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600

                  hover:bg-gray-400
                `}
              >
                <Plus size={18} />
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Theme>
  )
}
