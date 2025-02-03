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
        grid grid-cols-2 gap-4

        sm:grid-cols-3
      `}
      >
        {announcements.map((announcement, index) => <KAnnouncmentCard key={index} imageUrl={announcement.image} title={announcement.title} />)}
      </div>

      {/* <Accordion.Root type="single" collapsible className="mx-auto w-full max-w-3xl">
        {announcements.map((announcement, index) => <KAnnouncmentCardAccordion key={index} imageUrl={announcement.image} id={`'${index}'`} title={announcement.title} />)}
      </Accordion.Root> */}
      {/* <iframe
        // https:// drive.google.com/file/d/1HA7gYgqVvpl0pPbDxxZ0MdjUItYBYj6o/view?usp=sharing
        src="https://drive.google.com/file/d/1oWN8v_qWDZooViWdib58wm4IDYflkLBQ/preview"
        width="640"
        className="h-[900px] w-full"
        allow="autoplay"
      >
      </iframe> */}
      {/* <a href="https://www.swiftuploads.com/LK0G144az917/file">[DODI Repack] (1).torrent</a> */}
    </div>
  )
}
