import { addresshandlers } from './address/mock'
import { announcementshandlers } from './announcement/mock'

export const handlers = [
  ...announcementshandlers,
  ...addresshandlers,
]
