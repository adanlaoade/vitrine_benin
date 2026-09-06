import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer'
import { EmptyState } from '@/components/ui/EmptyState'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { Toast } from '@/components/ui/Toast'
import { ContactGate } from '@/features/auth/ContactGate'
import { useFavorite } from '@/features/auth/useFavorite'
import { AvailabilityBadge } from '@/features/professionals/components/AvailabilityBadge'
import { TrainingDocumentCard } from '@/features/professionals/components/TrainingDocumentCard'
import {
  formatLocationSearch,
  formatPhoneLink,
  formatWeeklySchedule,
  formatWhatsAppLink,
} from '@/lib/formatters'
import { getProfessionalById } from '@/lib/repository'
import type { Professional } from '@/types'

function formatLocation(pro: Professional): string {
  const parts = [
    pro.location.neighborhood,
    pro.location.commune,
    pro.location.city,
  ].filter(Boolean)
  return parts.join(', ')
}

export function ProfessionalProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { favorited, toggle, toast } = useFavorite(id ?? '')

  useEffect(() => {
    if (!id) {
      setError('Identifiant du professionnel manquant.')
      setLoading(false)
      return
    }

    const result = getProfessionalById(id)
    if (!result.ok) {
      setError(result.error)
    } else if (!result.data) {
      setError('Professionnel introuvable.')
    } else {
      setProfessional(result.data)
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <PageContainer title="Profil">
        <div className="space-y-4" role="status" aria-label="Chargement">
          <div className="h-24 animate-pulse rounded-lg bg-border" />
          <div className="h-32 animate-pulse rounded-lg bg-border" />
        </div>
      </PageContainer>
    )
  }

  if (error || !professional) {
    return (
      <PageContainer title="Profil">
        <EmptyState
          title="Profil indisponible"
          description={error ?? 'Ce professionnel n\'existe pas.'}
          icon="👷"
        />
        <PrimaryButton
          variant="secondary"
          fullWidth
          className="mt-4"
          onClick={() => navigate('/trouver')}
        >
          Retour à la recherche
        </PrimaryButton>
      </PageContainer>
    )
  }

  const displayName =
    professional.accountType === 'business' &&
    professional.businessDetails?.businessName
      ? professional.businessDetails.businessName
      : professional.displayName

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const scheduleRows = formatWeeklySchedule(professional.availability.weeklySlots)
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatLocationSearch(professional))}`

  return (
    <PageContainer>
      <Toast message={toast} />

      <header className="mb-6">
        <div className="flex items-start gap-3">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-light text-lg font-bold text-primary"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-text">{displayName}</h1>
            <p className="text-sm text-primary">{professional.category}</p>
            <p className="text-sm text-text-muted">
              {formatLocation(professional)}
              {professional.distanceKm != null && (
                <span> · {professional.distanceKm.toFixed(1)} km</span>
              )}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <AvailabilityBadge
                schedule={professional.availability}
                showReason
              />
              <span className="text-xs text-text-muted">
                ★ {professional.rating.toFixed(1)} ({professional.reviewCount} avis)
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={
              favorited
                ? `Retirer ${displayName} des favoris`
                : `Ajouter ${displayName} aux favoris`
            }
            aria-pressed={favorited}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl transition-colors hover:bg-primary-light"
          >
            {favorited ? '❤️' : '🤍'}
          </button>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-2 gap-2" aria-label="Actions de contact">
        <ContactGate onAuthorized={() => { window.location.href = formatPhoneLink(professional.phone) }}>
          {({ trigger }) => (
            <PrimaryButton fullWidth onClick={trigger}>
              Appeler
            </PrimaryButton>
          )}
        </ContactGate>
        <ContactGate
          onAuthorized={() => {
            window.open(formatWhatsAppLink(professional.whatsapp), '_blank', 'noopener,noreferrer')
          }}
        >
          {({ trigger }) => (
            <PrimaryButton fullWidth variant="secondary" onClick={trigger}>
              WhatsApp
            </PrimaryButton>
          )}
        </ContactGate>
        <PrimaryButton
          variant="ghost"
          fullWidth
          onClick={() => window.open(mapUrl, '_blank', 'noopener,noreferrer')}
        >
          Voir la localisation
        </PrimaryButton>
        <ContactGate onAuthorized={() => navigate('/demandes')}>
          {({ trigger }) => (
            <PrimaryButton variant="ghost" fullWidth onClick={trigger}>
              Demander un service
            </PrimaryButton>
          )}
        </ContactGate>
      </section>

      <section className="mb-6" aria-labelledby="about-heading">
        <h2 id="about-heading" className="mb-2 text-base font-semibold text-text">
          À propos
        </h2>
        <p className="text-sm text-text-muted">{professional.description}</p>
      </section>

      <section className="mb-6" aria-labelledby="services-heading">
        <h2 id="services-heading" className="mb-2 text-base font-semibold text-text">
          Services
        </h2>
        <ul className="flex flex-wrap gap-2">
          {professional.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-text"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {professional.portfolio && professional.portfolio.length > 0 && (
        <section className="mb-6" aria-labelledby="portfolio-heading">
          <h2 id="portfolio-heading" className="mb-3 text-base font-semibold text-text">
            Réalisations
          </h2>
          <div className="space-y-3">
            {professional.portfolio.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <h3 className="font-semibold text-text">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-text-muted">{item.description}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {professional.trainingDocuments &&
        professional.trainingDocuments.length > 0 && (
          <section className="mb-6" aria-labelledby="training-heading">
            <h2
              id="training-heading"
              className="mb-3 text-base font-semibold text-text"
            >
              Formation / Diplômes
            </h2>
            <div className="space-y-2">
              {professional.trainingDocuments.map((doc) => (
                <TrainingDocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </section>
        )}

      <section className="mb-6" aria-labelledby="schedule-heading">
        <h2 id="schedule-heading" className="mb-3 text-base font-semibold text-text">
          Horaires
        </h2>
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
          {scheduleRows.map((row) => (
            <li
              key={row.day}
              className="flex justify-between px-4 py-2.5 text-sm"
            >
              <span className="font-medium text-text">{row.day}</span>
              <span className="text-text-muted">{row.hours}</span>
            </li>
          ))}
        </ul>
      </section>
    </PageContainer>
  )
}
