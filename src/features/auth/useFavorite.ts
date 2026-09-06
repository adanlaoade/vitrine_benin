import { useCallback, useEffect, useState } from 'react'
import { getSession } from '@/lib/auth'
import { isFavorite, toggleFavorite } from '@/lib/repository'
import { useAuth } from '@/features/auth/AuthProvider'

export function useFavorite(professionalId: string) {
  const { requireAuth, session } = useAuth()
  const [favorited, setFavorited] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const syncFavorite = useCallback(() => {
    const current = getSession()
    if (!current) {
      setFavorited(false)
      return
    }
    setFavorited(isFavorite(current.userId, professionalId))
  }, [professionalId])

  useEffect(() => {
    syncFavorite()
  }, [syncFavorite, session])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 2500)
    return () => window.clearTimeout(timer)
  }, [toast])

  const toggle = () => {
    requireAuth(() => {
      const userId = getSession()?.userId
      if (!userId) return

      const wasFavorite = isFavorite(userId, professionalId)
      const result = toggleFavorite(userId, professionalId)
      if (result.ok) {
        setFavorited(result.data)
        if (wasFavorite && !result.data) {
          setToast('Retiré des favoris')
        }
      }
    })
  }

  return { favorited, toggle, toast }
}
