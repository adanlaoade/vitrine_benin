import { describe, expect, it, beforeEach } from 'vitest'
import {
  getStats,
  incrementFavoriteReceived,
  incrementPhoneClick,
  incrementProfileView,
  resetStats,
} from '@/lib/stats'

describe('stats', () => {
  beforeEach(() => {
    resetStats()
  })

  it('returns zeroed stats for unknown professional', () => {
    expect(getStats('pro-001')).toEqual({
      professionalId: 'pro-001',
      profileViews: 0,
      phoneClicks: 0,
      whatsappClicks: 0,
      favoritesReceived: 0,
      requestsReceived: 0,
    })
  })

  it('increments profile views', () => {
    incrementProfileView('pro-001')
    incrementProfileView('pro-001')
    expect(getStats('pro-001').profileViews).toBe(2)
  })

  it('increments phone clicks independently per professional', () => {
    incrementPhoneClick('pro-001')
    incrementPhoneClick('pro-002')
    expect(getStats('pro-001').phoneClicks).toBe(1)
    expect(getStats('pro-002').phoneClicks).toBe(1)
  })

  it('increments favorites received', () => {
    incrementFavoriteReceived('pro-001')
    expect(getStats('pro-001').favoritesReceived).toBe(1)
  })
})
