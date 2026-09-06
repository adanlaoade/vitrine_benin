import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmptyState } from '@/components/ui/EmptyState'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { useAuth } from '@/features/auth/AuthProvider'
import { getSession } from '@/lib/auth'
import { FavoriteProfessionalCard } from '@/features/professionals/components/FavoriteProfessionalCard'
import { listFavorites } from '@/lib/repository'
import type { Professional } from '@/types'

export function FavoritesList() {
  const { session, requireAuth } = useAuth()
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      setFavorites([])
      setLoading(false)
      return
    }
    const result = listFavorites(session.userId)
    if (result.ok) {
      setFavorites(result.data)
    }
    setLoading(false)
  }, [session])

  function handleViewFavorites() {
    requireAuth(() => {
      const current = getSession()
      if (!current) return
      const result = listFavorites(current.userId)
      if (result.ok) setFavorites(result.data)
    })
  }

  if (!session) {
    return (
      <div className="space-y-4">
        <EmptyState
          title="Connectez-vous pour voir vos favoris"
          description="Vos professionnels enregistrés apparaîtront ici après connexion."
          icon="❤️"
        />
        <PrimaryButton fullWidth onClick={handleViewFavorites}>
          Continuer avec Google
        </PrimaryButton>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="h-24 animate-pulse rounded-lg bg-border" role="status" />
    )
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="Aucun favori pour le moment"
        description="Ajoutez des professionnels en appuyant sur le cœur depuis Accueil, Trouver ou un profil."
        icon="❤️"
      />
    )
  }

  return (
    <div className="space-y-3">
      {favorites.map((pro) => (
        <FavoriteProfessionalCard
          key={pro.id}
          professional={pro}
          onPress={(id) => navigate(`/professionnel/${id}`)}
        />
      ))}
    </div>
  )
}
