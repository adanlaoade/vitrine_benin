import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { Toast } from '@/components/ui/Toast'
import { CATEGORIES, CITIES } from '@/data/fixtures/professionals.fixture'
import { useAuth } from '@/features/auth/AuthProvider'
import {
  FieldWrapper,
  SelectInput,
  TextArea,
  TextInput,
} from '@/features/onboarding/components/FormFields'
import { AvailabilityToggle } from '@/features/workspace/components/AvailabilityToggle'
import { PortfolioManager } from '@/features/workspace/components/PortfolioManager'
import { TrainingManager } from '@/features/workspace/components/TrainingManager'
import { WeeklyScheduleEditor } from '@/features/workspace/components/WeeklyScheduleEditor'
import { saveProfessionalProfile } from '@/lib/repository'
import { accountTypeLabel } from '@/lib/validation'
import type { ManualOverride, Professional } from '@/types'

interface WorkspaceViewProps {
  profile: Professional
  onProfileUpdate: (profile: Professional) => void
}

type Section = 'profil' | 'disponibilite' | 'horaires' | 'realisations' | 'formations'

const SECTIONS: { id: Section; label: string }[] = [
  { id: 'profil', label: 'Profil' },
  { id: 'disponibilite', label: 'Disponibilité' },
  { id: 'horaires', label: 'Horaires' },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'formations', label: 'Formations' },
]

export function WorkspaceView({ profile, onProfileUpdate }: WorkspaceViewProps) {
  const { session, signOut } = useAuth()
  const [draft, setDraft] = useState(profile)
  const [section, setSection] = useState<Section>('profil')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function updateDraft(patch: Partial<Professional>) {
    setDraft((prev) => ({ ...prev, ...patch }))
    setSaved(false)
  }

  function updateAvailability(manualOverride: ManualOverride) {
    setDraft((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        manualOverride,
        updatedAt: new Date().toISOString(),
      },
    }))
    setSaved(false)
  }

  function handleSave() {
    const result = saveProfessionalProfile(draft)
    if (!result.ok) {
      setError(result.error)
      return
    }
    onProfileUpdate(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="text-sm font-semibold text-text">{draft.displayName}</p>
        <p className="text-xs text-text-muted">
          {accountTypeLabel(draft.accountType)}
          {session && ` · ${session.displayName}`}
        </p>
        <Link
          to={`/professionnel/${draft.id}`}
          className="mt-2 inline-block text-sm text-primary hover:underline"
        >
          Voir mon profil public →
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSection(id)}
            className={[
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              section === id
                ? 'bg-primary text-white'
                : 'bg-surface border border-border text-text-muted',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      {section === 'profil' && (
        <div className="space-y-4">
          <FieldWrapper label="Nom affiché">
            <TextInput
              value={draft.displayName}
              onChange={(e) => updateDraft({ displayName: e.target.value })}
            />
          </FieldWrapper>
          <FieldWrapper label="Catégorie">
            <SelectInput
              value={draft.category}
              onChange={(e) => updateDraft({ category: e.target.value })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </SelectInput>
          </FieldWrapper>
          <FieldWrapper label="Compétences" hint="Séparez par des virgules.">
            <TextInput
              value={draft.skills.join(', ')}
              onChange={(e) =>
                updateDraft({
                  skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                })
              }
            />
          </FieldWrapper>
          <FieldWrapper label="Description">
            <TextArea
              value={draft.description}
              onChange={(e) => updateDraft({ description: e.target.value })}
            />
          </FieldWrapper>
          <FieldWrapper label="Téléphone">
            <TextInput
              type="tel"
              value={draft.phone}
              onChange={(e) => updateDraft({ phone: e.target.value })}
            />
          </FieldWrapper>
          <FieldWrapper label="WhatsApp">
            <TextInput
              type="tel"
              value={draft.whatsapp}
              onChange={(e) => updateDraft({ whatsapp: e.target.value })}
            />
          </FieldWrapper>
          <FieldWrapper label="Ville">
            <SelectInput
              value={draft.location.city}
              onChange={(e) =>
                updateDraft({ location: { ...draft.location, city: e.target.value } })
              }
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </SelectInput>
          </FieldWrapper>
          {draft.accountType === 'individual' && draft.cipNumber && (
            <p className="text-xs text-text-muted">
              CIP enregistré (privé) — non visible sur le profil public.
            </p>
          )}
        </div>
      )}

      {section === 'disponibilite' && (
        <AvailabilityToggle
          schedule={draft.availability}
          onChange={updateAvailability}
        />
      )}

      {section === 'horaires' && (
        <WeeklyScheduleEditor
          slots={draft.availability.weeklySlots}
          onChange={(weeklySlots) =>
            setDraft((prev) => ({
              ...prev,
              availability: { ...prev.availability, weeklySlots },
            }))
          }
        />
      )}

      {section === 'realisations' && (
        <PortfolioManager
          items={draft.portfolio ?? []}
          onChange={(portfolio) => updateDraft({ portfolio })}
        />
      )}

      {section === 'formations' && (
        <TrainingManager
          documents={draft.trainingDocuments ?? []}
          onChange={(trainingDocuments) => updateDraft({ trainingDocuments })}
        />
      )}

      <PrimaryButton fullWidth onClick={handleSave}>
        Enregistrer les modifications
      </PrimaryButton>

      <PrimaryButton variant="ghost" fullWidth onClick={signOut}>
        Se déconnecter
      </PrimaryButton>

      {saved && <Toast message="Modifications enregistrées." />}
      {error && <Toast message={error} />}
    </div>
  )
}
