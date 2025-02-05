import { useAnnouncements } from '@/shared/api/announcements'
import { KAnnouncementCard, KCreateAnnouncementCard } from '@/shared/ui/KAnnouncementCard'
import { KDropdown, KDropDownLogIn } from '@/shared/ui/KDropdown'

export function Announcements() {
  const { data } = useAnnouncements()

  const isAuth = localStorage.getItem('isAuth') === 'true'

  return (
    <div className={`
      mx-3 mt-1 py-4 text-sm font-medium

      dark:text-gray-200

      sm:mx-8 sm:my-5 sm:text-base
    `}
    >
      <p className="mb-4 text-center text-2xl">Объявления</p>

      <div className={`
        grid grid-cols-2 gap-4

        sm:grid-cols-3
      `}
      >
        {data?.map((announcement, index) => <KAnnouncementCard key={index} url={announcement.announcementUrl} title={announcement.title} />)}
        {isAuth && <KCreateAnnouncementCard />}
      </div>

      <KDropDownLogIn />
      <KDropdown />
    </div>
  )
}
