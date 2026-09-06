import { Toast } from '@/components/ui/Toast'
import { useFavorite } from '@/features/auth/useFavorite'
import { ProfessionalCard } from '@/features/professionals/components/ProfessionalCard'
import type { Professional } from '@/types'

interface FavoriteProfessionalCardProps {
  professional: Professional
  onPress?: (id: string) => void
  showActions?: boolean
}

export function FavoriteProfessionalCard({
  professional,
  onPress,
  showActions = true,
}: FavoriteProfessionalCardProps) {
  const { favorited, toggle, toast } = useFavorite(professional.id)

  return (
    <>
      <Toast message={toast} />
      <ProfessionalCard
        professional={professional}
        onPress={onPress}
        onFavoriteToggle={() => toggle()}
        isFavorite={favorited}
        showActions={showActions}
      />
    </>
  )
}
