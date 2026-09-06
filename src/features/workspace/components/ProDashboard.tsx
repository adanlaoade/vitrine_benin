import { DEMO_STATS_DISCLAIMER, getStats } from '@/lib/stats'
import type { Professional } from '@/types'

interface ProDashboardProps {
  profile: Professional
}

const METRIC_LABELS: {
  key: keyof ReturnType<typeof getStats>
  label: string
  icon: string
}[] = [
  { key: 'profileViews', label: 'Vues du profil', icon: '👁' },
  { key: 'phoneClicks', label: 'Clics téléphone', icon: '📞' },
  { key: 'whatsappClicks', label: 'Clics WhatsApp', icon: '💬' },
  { key: 'requestsReceived', label: 'Demandes reçues', icon: '📋' },
  { key: 'favoritesReceived', label: 'Favoris reçus', icon: '❤️' },
]

export function ProDashboard({ profile }: ProDashboardProps) {
  const stats = getStats(profile.id)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-text">Tableau de bord</h2>
        <p className="mt-1 text-xs text-text-muted">{DEMO_STATS_DISCLAIMER}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {METRIC_LABELS.map(({ key, label, icon }) => (
          <div
            key={key}
            className="rounded-lg border border-border bg-surface p-3"
          >
            <p className="text-lg" aria-hidden>{icon}</p>
            <p className="mt-1 text-2xl font-bold text-text">
              {stats[key]}
            </p>
            <p className="text-xs text-text-muted">{label}</p>
          </div>
        ))}

        <div className="rounded-lg border border-border bg-surface p-3">
          <p className="text-lg" aria-hidden>⭐</p>
          <p className="mt-1 text-2xl font-bold text-text">
            {profile.reviewCount}
          </p>
          <p className="text-xs text-text-muted">
            Avis (fixture démo)
          </p>
        </div>
      </div>
    </div>
  )
}
