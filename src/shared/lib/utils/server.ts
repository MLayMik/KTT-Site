import { handlers } from '@/shared/api/handlers'
import { setupServer } from 'msw/node'

export const server = setupServer(...handlers)
