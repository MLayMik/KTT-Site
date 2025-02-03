import { ChevronDown } from 'lucide-react'
import { Accordion } from 'radix-ui'

interface KAnnouncmentCardProps {
  imageUrl: string
  title: string
  id: string
}

export function KAnnouncmentCardAccordion({ imageUrl, title, id }: KAnnouncmentCardProps) {
  return (
    <Accordion.Item
      key={id}
      value={id}
      className={`
        w-full border-b border-gray-300

        dark:border-gray-700
      `}
    >
      <Accordion.Trigger className={`
        flex w-full items-center justify-between bg-gray-100 p-4 text-left
        text-lg font-medium transition-all

        dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700

        hover:bg-gray-200
      `}
      >
        {title}
        <ChevronDown
          className={`
            h-5 w-5 transition-transform duration-200

            data-[state=open]:rotate-180
          `}
        />
      </Accordion.Trigger>
      <Accordion.Content asChild>
        <div className={`
          overflow-hidden

          data-[state=closed]:animate-slideUp

          data-[state=open]:animate-slideDown
        `}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="mb-4 h-48 w-full object-cover"
            />
          )}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}
