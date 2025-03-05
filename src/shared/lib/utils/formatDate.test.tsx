import { expect, it } from 'vitest'
import { formatDate } from './formatDate'

const date = new Date(2025, 0, 1, 14, 30, 0)

it('returns formatted date', () => {
  expect(formatDate(date)).toBe('1 января')
})

it('returns formatted date with year', () => {
  expect(formatDate(date, { showYear: true })).toBe('1 января 2025 г.')
})

it('returns formatted date with numeric month', () => {
  expect(formatDate(date, { numericMonth: true })).toBe('01.01')
})
