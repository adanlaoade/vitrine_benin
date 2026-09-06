import type { ProDashboardStats } from '@/types'

const STATS_KEY = 'vnb.stats'

type StatsStore = Record<string, ProDashboardStats>

function emptyStats(professionalId: string): ProDashboardStats {
  return {
    professionalId,
    profileViews: 0,
    phoneClicks: 0,
    whatsappClicks: 0,
    favoritesReceived: 0,
    requestsReceived: 0,
  }
}

function loadStore(): StatsStore {
  try {
    const raw = localStorage.getItem(STATS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as StatsStore
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function saveStore(store: StatsStore): void {
  localStorage.setItem(STATS_KEY, JSON.stringify(store))
}

function mutate(
  professionalId: string,
  updater: (stats: ProDashboardStats) => ProDashboardStats,
): ProDashboardStats {
  const store = loadStore()
  const current = store[professionalId] ?? emptyStats(professionalId)
  const next = updater(current)
  store[professionalId] = next
  saveStore(store)
  return next
}

export function getStats(professionalId: string): ProDashboardStats {
  const store = loadStore()
  return store[professionalId] ?? emptyStats(professionalId)
}

export function incrementProfileView(professionalId: string): ProDashboardStats {
  return mutate(professionalId, (s) => ({
    ...s,
    profileViews: s.profileViews + 1,
  }))
}

export function incrementPhoneClick(professionalId: string): ProDashboardStats {
  return mutate(professionalId, (s) => ({
    ...s,
    phoneClicks: s.phoneClicks + 1,
  }))
}

export function incrementWhatsAppClick(professionalId: string): ProDashboardStats {
  return mutate(professionalId, (s) => ({
    ...s,
    whatsappClicks: s.whatsappClicks + 1,
  }))
}

export function incrementFavoriteReceived(professionalId: string): ProDashboardStats {
  return mutate(professionalId, (s) => ({
    ...s,
    favoritesReceived: s.favoritesReceived + 1,
  }))
}

export function incrementRequestReceived(professionalId: string): ProDashboardStats {
  return mutate(professionalId, (s) => ({
    ...s,
    requestsReceived: s.requestsReceived + 1,
  }))
}

export function resetStats(): void {
  localStorage.removeItem(STATS_KEY)
}

export const DEMO_STATS_DISCLAIMER =
  'Données de démonstration, sur cet appareil — pas une analytique réelle.'
