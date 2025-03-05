import { expect, it } from 'vitest'
import { formatTime } from './formatTime'

const date = new Date(2025, 0, 1, 14, 30, 0)
it('returns formatted time', () => {
  expect(formatTime(date)).toBe('14:30')
})
