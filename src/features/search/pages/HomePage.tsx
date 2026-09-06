import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FilterChip } from '@/components/ui/FilterChip'
import { PageContainer } from '@/components/layout/PageContainer'
import { SearchBar } from '@/features/search/components/SearchBar'
import { FavoriteProfessionalCard } from '@/features/professionals/components/FavoriteProfessionalCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { CATEGORIES, CITIES } from '@/data/fixtures/professionals.fixture'
import { listProfessionals } from '@/lib/repository'
import type { Professional } from '@/types'

export function HomePage() {
  const navigate = useNavigate()
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string>(CITIES[0])

  useEffect(() => {
    const result = listProfessionals()
    if (result.ok) {
      setProfessionals(result.data)
      setError(null)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }, [])

  const handleSearch = (query: string) => {
    navigate(`/trouver?q=${encodeURIComponent(query)}`)
  }

  const nearby = professionals.slice(0, 4)

  return (
    <PageContainer>
      <section className="mb-6">
        <SearchBar onSubmit={handleSearch} showVoiceButton />
      </section>

      <section className="mb-6" aria-labelledby="city-heading">
        <h2 id="city-heading" className="mb-3 text-sm font-semibold text-text">
          Ville
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CITIES.map((city) => (
            <FilterChip
              key={city}
              label={city}
              selected={selectedCity === city}
              onClick={() => setSelectedCity(city)}
            />
          ))}
        </div>
      </section>

      <section className="mb-6" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="mb-3 text-sm font-semibold text-text">
          Catégories
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              onClick={() => navigate(`/trouver?category=${encodeURIComponent(cat)}`)}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="nearby-heading">
        <h2 id="nearby-heading" className="mb-3 text-sm font-semibold text-text">
          Professionnels proches · {selectedCity}
        </h2>

        {loading && (
          <div className="space-y-3" role="status" aria-label="Chargement">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-lg bg-border"
              />
            ))}
          </div>
        )}

        {error && (
          <EmptyState
            title="Erreur de chargement"
            description={error}
          />
        )}

        {!loading && !error && nearby.length === 0 && (
          <EmptyState
            title="Aucun professionnel pour le moment"
            description="Revenez bientôt ou lancez une recherche."
          />
        )}

        {!loading && !error && nearby.length > 0 && (
          <div className="space-y-3">
            {nearby.map((pro) => (
              <FavoriteProfessionalCard
                key={pro.id}
                professional={pro}
                onPress={(id) => navigate(`/professionnel/${id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  )
}
