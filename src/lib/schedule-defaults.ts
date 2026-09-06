import type { WeeklySlot } from '@/types'

export const DEFAULT_WEEKLY_SLOTS: WeeklySlot[] = [
  { day: 1, start: '08:00', end: '18:00', enabled: true },
  { day: 2, start: '08:00', end: '18:00', enabled: true },
  { day: 3, start: '08:00', end: '18:00', enabled: true },
  { day: 4, start: '08:00', end: '18:00', enabled: true },
  { day: 5, start: '08:00', end: '18:00', enabled: true },
  { day: 6, start: '09:00', end: '14:00', enabled: true },
  { day: 0, start: '09:00', end: '12:00', enabled: false },
]

export const DAY_LABELS = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
] as const

export const PORTFOLIO_MAX_ITEMS = 6

export const DRAFT_KEYS = {
  individual: 'vnb.draft.individual',
  business: 'vnb.draft.business',
} as const

export function loadDraft<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function saveDraft<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function clearDraft(key: string): void {
  localStorage.removeItem(key)
}
