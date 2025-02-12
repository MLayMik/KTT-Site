import { handlers } from '@/shared/api/handlers'
import { setupWorker } from 'msw/browser'

export const worker = setupWorker(...handlers)
