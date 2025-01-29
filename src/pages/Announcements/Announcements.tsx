import { KAnnouncmentCard } from '@/shared/ui/KAnnouncmentCard'
import { announcements } from '@/shared/ui/KAnnouncmentCard/temp/tempImg'

export function Announcements() {
  return (
    <div className={`
      mx-3 mt-1 py-4 text-sm font-medium

      dark:text-gray-200

      sm:mx-8 sm:my-5 sm:text-base
    `}
    >
      <p className="mb-4 text-center text-2xl">Объявления</p>
      <div className={`
        grid auto-rows-fr grid-cols-2 gap-5

        md:grid-cols-3
      `}
      >
        {announcements.map((announcement, index) => <KAnnouncmentCard key={index} imageUrl={announcement.image} title={announcement.title} />)}
      </div>
    </div>
  )
}
