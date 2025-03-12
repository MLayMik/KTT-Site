import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './shared/lib/utils/server'
import '@testing-library/jest-dom'
import '@testing-library/user-event'
import '@testing-library/react'

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'bypass',
  })
},
)
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
