import { AvailabilityBadge } from '@/features/professionals/components/AvailabilityBadge'
import type { Professional } from '@/types'

interface ProfessionalCardProps {
  professional: Professional
  onPress?: (id: string) => void
  onFavoriteToggle?: (id: string) => void
  isFavorite?: boolean
  showActions?: boolean
}

function formatLocation(pro: Professional): string {
  const parts = [
    pro.location.neighborhood,
    pro.location.commune,
    pro.location.city,
  ].filter(Boolean)
  return parts.join(', ')
}

export function ProfessionalCard({
  professional,
  onPress,
  onFavoriteToggle,
  isFavorite = false,
  showActions = true,
}: ProfessionalCardProps) {
  const initials = professional.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article
      className="rounded-lg border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md"
      aria-label={`Profil de ${professional.displayName}`}
    >
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onPress?.(professional.id)}
          className="flex flex-1 gap-3 text-left"
        >
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light text-base font-bold text-primary"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-text">
              {professional.displayName}
            </h3>
            <p className="text-sm text-primary">{professional.category}</p>
            <p className="truncate text-sm text-text-muted">
              {formatLocation(professional)}
              {professional.distanceKm != null && (
                <span> · {professional.distanceKm.toFixed(1)} km</span>
              )}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <AvailabilityBadge schedule={professional.availability} />
              <span className="text-xs text-text-muted">
                ★ {professional.rating.toFixed(1)} ({professional.reviewCount})
              </span>
            </div>
          </div>
        </button>

        {showActions && onFavoriteToggle && (
          <button
            type="button"
            onClick={() => onFavoriteToggle(professional.id)}
            aria-label={
              isFavorite
                ? `Retirer ${professional.displayName} des favoris`
                : `Ajouter ${professional.displayName} aux favoris`
            }
            aria-pressed={isFavorite}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl transition-colors hover:bg-primary-light"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        )}
      </div>
    </article>
  )
}
