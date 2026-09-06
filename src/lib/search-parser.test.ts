import { describe, expect, it } from 'vitest'
import { seedProfessionals } from '@/data/fixtures/professionals.fixture'
import {
  filterProfessionals,
  parseSearchQuery,
  searchProfessionals,
  sortProfessionals,
} from '@/lib/search-parser'

describe('search-parser', () => {
  it('extrait catégorie et ville depuis une requête naturelle', () => {
    const intent = parseSearchQuery('plombier à Godomey disponible maintenant')
    expect(intent.category).toBe('Plomberie')
    expect(intent.location).toBe('Godomey')
    expect(intent.availability).toBe('available_now')
    expect(intent.editable).toBe(true)
  })

  it('normalise les accents', () => {
    const intent = parseSearchQuery('couture Abomey-Calavi')
    expect(intent.category).toBe('Couture')
    expect(intent.location).toBe('Abomey-Calavi')
  })

  it('filtre par catégorie', () => {
    const intent = parseSearchQuery('plomberie')
    const results = filterProfessionals(seedProfessionals, intent)
    expect(results).toHaveLength(1)
    expect(results[0]?.displayName).toBe('Marc Agossa')
  })

  it('trie par note décroissante', () => {
    const sorted = sortProfessionals(seedProfessionals, 'rating')
    expect(sorted[0]?.rating).toBeGreaterThanOrEqual(sorted[1]?.rating ?? 0)
  })

  it('retourne intent + résultats via searchProfessionals', () => {
    const { intent, results } = searchProfessionals(seedProfessionals, 'couture')
    expect(intent.category).toBe('Couture')
    expect(results).toHaveLength(1)
    expect(results[0]?.displayName).toBe('Fatou Adébayo')
  })
})
