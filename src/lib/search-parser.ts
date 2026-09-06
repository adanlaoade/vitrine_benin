import { CATEGORIES, CITIES } from '@/data/fixtures/professionals.fixture'
import { calculateAvailability } from '@/lib/availability'
import type {
  AccountType,
  AvailabilityStatus,
  Professional,
  SearchIntent,
} from '@/types'

export type SortOption = 'distance' | 'availability' | 'rating'

export interface SearchFilters {
  category?: string
  accountType?: AccountType
}

const AVAILABILITY_RANK: Record<AvailabilityStatus, number> = {
  available_now: 0,
  available_by_schedule: 1,
  closed_by_schedule: 2,
  unavailable: 3,
}

const AVAILABILITY_PHRASES: Array<{ phrase: string; status: AvailabilityStatus }> =
  [
    { phrase: 'disponible maintenant', status: 'available_now' },
    { phrase: 'dispo maintenant', status: 'available_now' },
    { phrase: 'maintenant', status: 'available_now' },
  ]

const CATEGORY_SYNONYMS: Record<string, string> = {
  plombier: 'Plomberie',
  plomberie: 'Plomberie',
  couturier: 'Couture',
  couturiere: 'Couture',
  couture: 'Couture',
  coiffure: 'Coiffure',
  coiffeuse: 'Coiffure',
  coiffeur: 'Coiffure',
  developpeur: 'Développement web',
  'developpement web': 'Développement web',
  maintenance: 'Maintenance',
  reparation: 'Réparation téléphone',
  telephone: 'Réparation téléphone',
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function matchesLocation(pro: Professional, location: string): boolean {
  const needle = normalizeText(location)
  const haystack = normalizeText(
    [
      pro.location.city,
      pro.location.commune,
      pro.location.district,
      pro.location.neighborhood,
    ]
      .filter(Boolean)
      .join(' '),
  )
  return haystack.includes(needle)
}

function matchesQueryText(pro: Professional, rawQuery: string): boolean {
  const query = normalizeText(rawQuery)
  if (!query) return true

  const searchable = normalizeText(
    [
      pro.displayName,
      pro.category,
      pro.description,
      ...pro.skills,
      pro.location.city,
      pro.location.commune ?? '',
      pro.location.neighborhood ?? '',
    ].join(' '),
  )

  const words = query.split(/\s+/).filter((word) => word.length > 2)
  if (words.length === 0) {
    return searchable.includes(query)
  }

  return words.some((word) => searchable.includes(word))
}

/** Extrait une intention partielle — toujours éditable, jamais présentée comme certaine. */
export function parseSearchQuery(
  rawQuery: string,
  source: 'text' | 'voice' = 'text',
): SearchIntent {
  const trimmed = rawQuery.trim()
  const normalized = normalizeText(trimmed)
  let confidence = trimmed ? 0.25 : 0

  let category: string | undefined
  for (const cat of CATEGORIES) {
    if (normalized.includes(normalizeText(cat))) {
      category = cat
      confidence += 0.25
      break
    }
  }

  if (!category) {
    for (const [synonym, cat] of Object.entries(CATEGORY_SYNONYMS)) {
      if (normalized.includes(synonym)) {
        category = cat
        confidence += 0.2
        break
      }
    }
  }

  let location: string | undefined
  for (const city of CITIES) {
    if (normalized.includes(normalizeText(city))) {
      location = city
      confidence += 0.2
      break
    }
  }

  let availability: AvailabilityStatus | undefined
  for (const { phrase, status } of AVAILABILITY_PHRASES) {
    if (normalized.includes(phrase)) {
      availability = status
      confidence += 0.15
      break
    }
  }

  return {
    rawQuery: trimmed,
    service: trimmed || undefined,
    category,
    location,
    availability,
    confidence: Math.min(Number(confidence.toFixed(2)), 0.95),
    editable: true,
    source,
  }
}

export function filterProfessionals(
  professionals: Professional[],
  intent: SearchIntent,
  filters: SearchFilters = {},
): Professional[] {
  return professionals.filter((pro) => {
    const category = filters.category ?? intent.category
    if (category && pro.category !== category) return false

    if (filters.accountType && pro.accountType !== filters.accountType) return false

    if (intent.location && !matchesLocation(pro, intent.location)) return false

    if (intent.availability === 'available_now') {
      const { status } = calculateAvailability(pro.availability)
      if (status !== 'available_now') return false
    }

    if (intent.rawQuery && !category && !intent.location) {
      if (!matchesQueryText(pro, intent.rawQuery)) return false
    }

    return true
  })
}

export function sortProfessionals(
  professionals: Professional[],
  sortBy: SortOption,
): Professional[] {
  const sorted = [...professionals]

  sorted.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating || (a.distanceKm ?? 999) - (b.distanceKm ?? 999)
      case 'availability': {
        const rankA = AVAILABILITY_RANK[calculateAvailability(a.availability).status]
        const rankB = AVAILABILITY_RANK[calculateAvailability(b.availability).status]
        return rankA - rankB || (a.distanceKm ?? 999) - (b.distanceKm ?? 999)
      }
      case 'distance':
      default:
        return (a.distanceKm ?? 999) - (b.distanceKm ?? 999) || b.rating - a.rating
    }
  })

  return sorted
}

export function searchProfessionals(
  professionals: Professional[],
  rawQuery: string,
  options: {
    sortBy?: SortOption
    filters?: SearchFilters
    source?: 'text' | 'voice'
    categoryFromUrl?: string
  } = {},
): { intent: SearchIntent; results: Professional[] } {
  const intent = parseSearchQuery(rawQuery, options.source)

  if (options.categoryFromUrl) {
    intent.category = options.categoryFromUrl
    intent.confidence = Math.min((intent.confidence ?? 0) + 0.2, 0.95)
  }

  const filters: SearchFilters = {
    ...options.filters,
    category: options.categoryFromUrl ?? options.filters?.category,
  }

  let results = filterProfessionals(professionals, intent, filters)
  results = sortProfessionals(results, options.sortBy ?? 'distance')

  return { intent, results }
}
