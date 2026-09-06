import { seedProfessionals } from '@/data/fixtures/professionals.fixture'
import type {
  FavoriteItem,
  Professional,
  RepositoryResponse,
  ServiceRequest,
} from '@/types'

const DATA_KEY = 'vnb.data'

interface StoredData {
  professionals: Professional[]
  favorites: FavoriteItem[]
  serviceRequests: ServiceRequest[]
}

function createDefaultData(): StoredData {
  return {
    professionals: seedProfessionals,
    favorites: [],
    serviceRequests: [],
  }
}

function loadData(): StoredData {
  try {
    const raw = localStorage.getItem(DATA_KEY)
    if (!raw) {
      const defaults = createDefaultData()
      saveData(defaults)
      return defaults
    }
    const parsed = JSON.parse(raw) as StoredData
    if (!Array.isArray(parsed.professionals)) {
      const defaults = createDefaultData()
      saveData(defaults)
      return defaults
    }
    return {
      professionals: parsed.professionals,
      favorites: parsed.favorites ?? [],
      serviceRequests: parsed.serviceRequests ?? [],
    }
  } catch {
    const defaults = createDefaultData()
    saveData(defaults)
    return defaults
  }
}

function saveData(data: StoredData): void {
  localStorage.setItem(DATA_KEY, JSON.stringify(data))
}

/** Strip private fields before public exposure */
export function toPublicProfessional(pro: Professional): Professional {
  const { cipNumber: _cip, ...publicPro } = pro
  return publicPro
}

export function listProfessionals(): RepositoryResponse<Professional[]> {
  try {
    const data = loadData()
    return {
      ok: true,
      data: data.professionals.map(toPublicProfessional),
    }
  } catch {
    return { ok: false, error: 'Impossible de charger les professionnels.' }
  }
}

export function getProfessionalById(
  id: string,
): RepositoryResponse<Professional | null> {
  try {
    const data = loadData()
    const found = data.professionals.find((p) => p.id === id)
    return {
      ok: true,
      data: found ? toPublicProfessional(found) : null,
    }
  } catch {
    return { ok: false, error: 'Impossible de charger le professionnel.' }
  }
}

/** Returns full profile including private fields — for the owner only */
export function getOwnedProfessional(
  userId: string,
): RepositoryResponse<Professional | null> {
  try {
    const data = loadData()
    const found = data.professionals.find((p) => p.id === userId)
    return { ok: true, data: found ?? null }
  } catch {
    return { ok: false, error: 'Impossible de charger votre profil.' }
  }
}

export function hasProfessionalProfile(userId: string): boolean {
  const data = loadData()
  return data.professionals.some((p) => p.id === userId)
}

export function saveProfessionalProfile(
  profile: Professional,
): RepositoryResponse<Professional> {
  try {
    const data = loadData()
    const index = data.professionals.findIndex((p) => p.id === profile.id)
    if (index >= 0) {
      data.professionals[index] = profile
    } else {
      data.professionals.push(profile)
    }
    saveData(data)
    return { ok: true, data: toPublicProfessional(profile) }
  } catch {
    return { ok: false, error: 'Impossible de sauvegarder le profil.' }
  }
}

export function toggleFavorite(
  userId: string,
  professionalId: string,
): RepositoryResponse<boolean> {
  try {
    const data = loadData()
    const existing = data.favorites.find(
      (f) => f.userId === userId && f.professionalId === professionalId,
    )
    if (existing) {
      data.favorites = data.favorites.filter((f) => f.id !== existing.id)
      saveData(data)
      return { ok: true, data: false }
    }
    const item: FavoriteItem = {
      id: `fav-${Date.now()}`,
      userId,
      professionalId,
      createdAt: new Date().toISOString(),
    }
    data.favorites.push(item)
    saveData(data)
    return { ok: true, data: true }
  } catch {
    return { ok: false, error: 'Impossible de modifier les favoris.' }
  }
}

export function listFavorites(
  userId: string,
): RepositoryResponse<Professional[]> {
  try {
    const data = loadData()
    const ids = data.favorites
      .filter((f) => f.userId === userId)
      .map((f) => f.professionalId)
    const pros = data.professionals
      .filter((p) => ids.includes(p.id))
      .map(toPublicProfessional)
    return { ok: true, data: pros }
  } catch {
    return { ok: false, error: 'Impossible de charger les favoris.' }
  }
}

export function isFavorite(
  userId: string,
  professionalId: string,
): boolean {
  const data = loadData()
  return data.favorites.some(
    (f) => f.userId === userId && f.professionalId === professionalId,
  )
}

export function saveServiceRequest(
  request: ServiceRequest,
): RepositoryResponse<ServiceRequest> {
  try {
    const data = loadData()
    data.serviceRequests.push(request)
    saveData(data)
    return { ok: true, data: request }
  } catch {
    return { ok: false, error: 'Impossible d\'enregistrer la demande.' }
  }
}

export function listServiceRequests(
  requesterId?: string,
): RepositoryResponse<ServiceRequest[]> {
  try {
    const data = loadData()
    const requests = requesterId
      ? data.serviceRequests.filter((r) => r.requesterId === requesterId)
      : data.serviceRequests
    return { ok: true, data: requests }
  } catch {
    return { ok: false, error: 'Impossible de charger les demandes.' }
  }
}

export function resetRepository(): void {
  localStorage.removeItem(DATA_KEY)
}
