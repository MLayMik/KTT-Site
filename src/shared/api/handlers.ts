import { addresshandlers } from './address/mock'
import { announcementshandlers } from './announcements/mock'

export const handlers = [
  ...announcementshandlers,
  ...addresshandlers,
]
