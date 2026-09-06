import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer'
import { EmptyState } from '@/components/ui/EmptyState'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { Toast } from '@/components/ui/Toast'
import { CITIES } from '@/data/fixtures/professionals.fixture'
import {
  FieldWrapper,
  SelectInput,
  TextArea,
} from '@/features/onboarding/components/FormFields'
import { getSession } from '@/lib/auth'
import { listServiceRequests, saveServiceRequest } from '@/lib/repository'
import type { ServiceRequest } from '@/types'

function formatStatus(status: ServiceRequest['status']): string {
  return status === 'closed' ? 'Clôturée' : 'Envoyée'
}

export function DemandesPage() {
  const [searchParams] = useSearchParams()
  const prefilledQuery = searchParams.get('q') ?? ''

  const [description, setDescription] = useState(prefilledQuery)
  const [location, setLocation] = useState('')
  const [consent, setConsent] = useState(false)
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (prefilledQuery) setDescription(prefilledQuery)
  }, [prefilledQuery])

  useEffect(() => {
    const session = getSession()
    const result = listServiceRequests(session?.userId)
    if (result.ok) {
      setRequests(
        [...result.data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      )
    }
    setLoading(false)
  }, [success])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!description.trim()) {
      setError('Décrivez votre besoin.')
      return
    }
    if (!consent) {
      setError('Acceptez le consentement minimal pour envoyer la demande.')
      return
    }

    setSubmitting(true)
    setError(null)

    const session = getSession()
    const request: ServiceRequest = {
      id: `req-${Date.now()}`,
      requesterId: session?.userId,
      description: description.trim(),
      location: location.trim() || undefined,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    }

    const result = saveServiceRequest(request)
    setSubmitting(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    setSuccess('Demande enregistrée sur cet appareil.')
    setDescription('')
    setLocation('')
    setConsent(false)
  }

  return (
    <PageContainer
      title="Demandes"
      subtitle="Besoins non couverts — conservés localement"
    >
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <p className="text-sm text-text-muted">
          Décrivez un service que vous n&apos;avez pas trouvé. Votre demande
          reste sur cet appareil (démonstration).
        </p>

        <FieldWrapper label="Description du besoin" required error={error && !description.trim() ? error : undefined}>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex. Réparation de climatiseur à Godomey, disponible en semaine…"
            error={!!error && !description.trim()}
          />
        </FieldWrapper>

        <FieldWrapper label="Localisation" hint="Facultatif — ville ou quartier.">
          <SelectInput
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Non précisée</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <label className="flex items-start gap-2 text-sm text-text">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-primary"
          />
          <span>
            J&apos;accepte que cette demande soit conservée localement sur mon
            appareil à des fins de démonstration (aucune donnée envoyée à un serveur).
          </span>
        </label>

        {error && description.trim() && !consent && (
          <p className="text-sm text-danger">{error}</p>
        )}

        <PrimaryButton type="submit" fullWidth loading={submitting}>
          Envoyer la demande
        </PrimaryButton>
      </form>

      <section aria-labelledby="history-heading">
        <h2 id="history-heading" className="mb-3 text-base font-semibold text-text">
          Historique
        </h2>

        {loading && (
          <div className="h-16 animate-pulse rounded-lg bg-border" role="status" />
        )}

        {!loading && requests.length === 0 && (
          <EmptyState
            title="Aucune demande pour le moment"
            description="Les demandes envoyées apparaîtront ici."
            icon="📋"
          />
        )}

        {!loading && requests.length > 0 && (
          <ul className="space-y-3">
            {requests.map((req) => (
              <li
                key={req.id}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-text">{req.description}</p>
                  <span className="shrink-0 rounded-full bg-primary-light px-2 py-0.5 text-xs font-medium text-primary">
                    {formatStatus(req.status)}
                  </span>
                </div>
                {req.location && (
                  <p className="mt-1 text-xs text-text-muted">📍 {req.location}</p>
                )}
                <p className="mt-1 text-xs text-text-muted">
                  {new Date(req.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {success && <Toast message={success} />}
    </PageContainer>
  )
}
