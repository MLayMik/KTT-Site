/* eslint-disable max-len */
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { KAnnouncementCard } from './KAnnouncementCard'

describe('announcemnt Card', () => {
  it('render with title', () => {
    render(
      <KAnnouncementCard
        title="Test ann"
        url="https://drive.google.com/file/d/15SHO9O0NyoWKreZI26U01J-wzjl-q-En/preview"
      />,
    )
    expect(screen.getByText('Test ann')).toBeInTheDocument()
  })
  it('render with url', () => {
    render(
      <KAnnouncementCard
        title="Test ann"
        url="https://drive.google.com/file/d/15SHO9O0NyoWKreZI26U01J-wzjl-q-En/preview"
      />,
    )
    expect(screen
      .getByTitle('announcement'))
      .toHaveAttribute('src', 'https://drive.google.com/file/d/15SHO9O0NyoWKreZI26U01J-wzjl-q-En/preview#toolbar=0&navpanes=0&view=FitH')
  })
})
