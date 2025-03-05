import { useMeetings } from '@/shared/api/meetings'
import { cn } from '@/shared/lib/styles'
import { FilePenLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface TypeLinkProps {
  typeLink?: 'meeting' | 'ministry-meeting' | 'service'
  idProgram: number
}

export function KEditLink({ typeLink = 'meeting', idProgram }: TypeLinkProps) {
  const { data: meetings } = useMeetings()

  const [finalTypeLink, setFinalTypeLink] = useState(typeLink)
  const [finalIdProgram, setFinalIdProgram] = useState(idProgram)

  useEffect(() => {
    if (finalTypeLink === 'service' && meetings) {
      const foundMeeting = meetings.find(meet => meet.service && meet.service.id === finalIdProgram)

      if (foundMeeting) {
        setFinalTypeLink('meeting')
        setFinalIdProgram(foundMeeting.id)
      }
    }
  })

  const isAuth = localStorage.getItem('isAuth') === 'true'

  return (
    <Link
      to={`/admin/${finalTypeLink}/${finalIdProgram}`}
      className={cn(
        isAuth ? 'block' : 'hidden',
        typeLink === 'ministry-meeting'
          ? `
            mt-2

            sm:mt-0
          `
          : `
            absolute right-2

            sm:right-0
          `,
      )}
    >
      <FilePenLine className={`
        size-5 text-gray-700

        dark:text-gray-400
      `}
      />
    </Link>
  )
}
