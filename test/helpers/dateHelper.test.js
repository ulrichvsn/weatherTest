import { describe, it, expect } from 'vitest'
import { formatDay, formatTime } from '@/helpers/dateHelper'

// formatDay
describe('Test function formatDay', () => {
  it('should return "Aujourd’hui" if the date is today', () => {
    const today = new Date()
    expect(formatDay(today)).toBe('Aujourd’hui')
  })

  it('should return the correctly formatted string if the date is not today', () => {
    // create tomorrow
    const notToday = new Date()
    notToday.setDate(notToday.getDate() + 1) // tomorrow

    const expected = notToday.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' })
    expect(formatDay(notToday)).toBe(expected)
  })
})

// formatTime
describe('formatTime', () => {
  it('should format a given date and time string into "HH:MM"', () => {
    const dateTimeString = '2023-10-05 03:00:00'
    const expectedTime = '03:00'
    expect(formatTime(dateTimeString)).toBe(expectedTime)
  })

  it('should correctly handle times', () => {
    const dateTimeString = '2023-10-05 09:25:00'
    const expectedTime = '09:25'
    expect(formatTime(dateTimeString)).toBe(expectedTime)
  })
})
