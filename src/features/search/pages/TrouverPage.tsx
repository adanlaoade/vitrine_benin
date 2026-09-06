import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer'
import { FilterChip } from '@/components/ui/FilterChip'
import { EmptyState } from '@/components/ui/EmptyState'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { NotFoundPrompt } from '@/features/search/components/NotFoundPrompt'
import { SearchBar } from '@/features/search/components/SearchBar'
import { SearchIntentSummary } from '@/features/search/components/SearchIntentSummary'
import { FavoriteProfessionalCard } from '@/features/professionals/components/FavoriteProfessionalCard'
import { CATEGORIES } from '@/data/fixtures/professionals.fixture'
import { listProfessionals } from '@/lib/repository'
import {
  filterProfessionals,
  searchProfessionals,
  sortProfessionals,
  type SortOption,
} from '@/lib/search-parser'
import type { Professional, SearchIntent } from '@/types'

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'distance', label: 'Distance' },
  { value: 'availability', label: 'Disponibilité' },
  { value: 'rating', label: 'Note' },
]

export function TrouverPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const queryFromUrl = searchParams.get('q') ?? ''
  const categoryFromUrl = searchParams.get('category') ?? undefined
  const sourceFromUrl =
    searchParams.get('source') === 'voice' ? 'voice' : 'text'

  const [query, setQuery] = useState(queryFromUrl)
  const [intent, setIntent] = useState<SearchIntent | null>(null)
  const [results, setResults] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('distance')
  const [accountFilter, setAccountFilter] = useState<
    'all' | 'individual' | 'business'
  >('all')

  useEffect(() => {
    setQuery(queryFromUrl)
  }, [queryFromUrl])

  const professionals = useMemo(() => {
    const response = listProfessionals()
    return response.ok ? response.data : []
  }, [])

  useEffect(() => {
    const response = listProfessionals()
    if (!response.ok) {
      setError(response.error)
      setLoading(false)
      return
    }

    const { intent: parsedIntent, results: matched } = searchProfessionals(
      response.data,
      queryFromUrl,
      {
        sortBy,
        categoryFromUrl,
        filters:
          accountFilter === 'all'
            ? undefined
            : { accountType: accountFilter },
      },
    )

    setIntent(parsedIntent)
    setResults(matched)
    setError(null)
    setLoading(false)
  }, [queryFromUrl, categoryFromUrl, sortBy, accountFilter])

  const handleSearch = (value: string) => {
    const params: Record<string, string> = {}
    if (value.trim()) params.q = value.trim()
    if (categoryFromUrl) params.category = categoryFromUrl
    setSearchParams(params)
  }

  const handleIntentUpdate = (nextIntent: SearchIntent) => {
    setIntent(nextIntent)

    const filters =
      accountFilter === 'all' ? undefined : { accountType: accountFilter }

    let filtered = filterProfessionals(professionals, nextIntent, filters)
    filtered = sortProfessionals(filtered, sortBy)
    setResults(filtered)

    const params: Record<string, string> = {}
    if (nextIntent.rawQuery) params.q = nextIntent.rawQuery
    if (nextIntent.category) params.category = nextIntent.category
    setSearchParams(params)
  }

  const handleCategoryFilter = (category: string) => {
    const params: Record<string, string> = {}
    if (queryFromUrl) params.q = queryFromUrl
    if (categoryFromUrl === category) {
      setSearchParams(params)
      return
    }
    params.category = category
    setSearchParams(params)
  }

  const mapUrl = useMemo(() => {
    const location =
      intent?.location ?? results[0]?.location.city ?? 'Cotonou'
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ', Bénin')}`
  }, [intent?.location, results])

  return (
    <PageContainer title="Trouver" subtitle="Résultats et filtres">
      <section className="mb-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          showVoiceButton
        />
      </section>

      {intent && !loading && (
        <SearchIntentSummary intent={intent} onUpdate={handleIntentUpdate} />
      )}

      <section className="mb-4" aria-labelledby="filters-heading">
        <h2 id="filters-heading" className="mb-2 text-sm font-semibold text-text">
          Filtres
        </h2>
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              selected={categoryFromUrl === cat || intent?.category === cat}
              onClick={() => handleCategoryFilter(cat)}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { value: 'all', label: 'Tous' },
              { value: 'individual', label: 'Individuel' },
              { value: 'business', label: 'Entreprise' },
            ] as const
          ).map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              selected={accountFilter === option.value}
              onClick={() => setAccountFilter(option.value)}
            />
          ))}
        </div>
      </section>

      <section className="mb-4 flex items-center justify-between gap-2">
        <p className="text-sm text-text-muted">
          {loading ? 'Recherche…' : `${results.length} résultat${results.length > 1 ? 's' : ''}`}
        </p>
        <label className="flex items-center gap-2 text-sm text-text">
          <span className="sr-only">Trier par</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-sm"
            aria-label="Trier les résultats"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <PrimaryButton
        variant="ghost"
        fullWidth
        className="mb-4"
        onClick={() => window.open(mapUrl, '_blank', 'noopener,noreferrer')}
      >
        Voir sur la carte
      </PrimaryButton>

      {loading && (
        <div className="space-y-3" role="status" aria-label="Chargement">
          {[1, 2].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-border" />
          ))}
        </div>
      )}

      {error && (
        <EmptyState title="Erreur de recherche" description={error} />
      )}

      {!loading && !error && results.length === 0 && (
        <EmptyState
          title="Aucun professionnel trouvé"
          description="Essayez d'autres mots-clés, élargissez la zone ou décrivez votre besoin ci-dessous."
          icon="🔍"
        />
      )}

      {!loading && !error && results.length > 0 && (
        <div className="space-y-3">
          {results.map((pro) => (
            <FavoriteProfessionalCard
              key={pro.id}
              professional={pro}
              onPress={(id) => navigate(`/professionnel/${id}`)}
            />
          ))}
        </div>
      )}

      <NotFoundPrompt
        hasResults={results.length > 0}
        onSubmitRequest={() => navigate('/demandes')}
      />
    </PageContainer>
  )
}
