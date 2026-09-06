import { useEffect, useState } from 'react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { CATEGORIES, CITIES } from '@/data/fixtures/professionals.fixture'
import { useAuth } from '@/features/auth/AuthProvider'
import { getSession } from '@/lib/auth'
import {
  FieldWrapper,
  SelectInput,
  TextArea,
  TextInput,
} from '@/features/onboarding/components/FormFields'
import { PostureSelector } from '@/features/onboarding/components/PostureSelector'
import { manualOverrideFromPosture } from '@/lib/availability'
import { saveProfessionalProfile } from '@/lib/repository'
import {
  clearDraft,
  DEFAULT_WEEKLY_SLOTS,
  DRAFT_KEYS,
  loadDraft,
  saveDraft,
} from '@/lib/schedule-defaults'
import {
  parseSkillsList,
  validateBusinessRegistration,
  type BusinessRegistrationInput,
} from '@/lib/validation'
import type { DefaultPosture, Professional } from '@/types'

interface BusinessRegistrationFormProps {
  onSuccess: (profile: Professional) => void
  onBack: () => void
}

const emptyForm: BusinessRegistrationInput = {
  businessName: '',
  legalName: '',
  contactName: '',
  sector: '',
  services: '',
  phone: '',
  whatsapp: '',
  city: '',
  commune: '',
  neighborhood: '',
  legalIdentifiers: '',
  defaultPosture: 'follow_schedule',
}

export function BusinessRegistrationForm({
  onSuccess,
  onBack,
}: BusinessRegistrationFormProps) {
  const { session, requireAuth } = useAuth()
  const [form, setForm] = useState<BusinessRegistrationInput>(() =>
    loadDraft(DRAFT_KEYS.business) ?? emptyForm,
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    saveDraft(DRAFT_KEYS.business, form)
  }, [form])

  function updateField<K extends keyof BusinessRegistrationInput>(
    key: K,
    value: BusinessRegistrationInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function submitProfile(userId: string) {
    const validation = validateBusinessRegistration(form)
    if (!validation.ok) {
      setErrors(validation.errors)
      return
    }

    setSubmitting(true)
    const posture = form.defaultPosture as DefaultPosture
    const profile: Professional = {
      id: userId,
      accountType: 'business',
      displayName: form.businessName.trim(),
      category: form.sector,
      skills: parseSkillsList(form.services),
      description: `Entreprise — ${form.sector}. Données fictives de démonstration.`,
      location: {
        city: form.city.trim(),
        commune: form.commune?.trim() || undefined,
        neighborhood: form.neighborhood?.trim() || undefined,
      },
      phone: form.phone.trim(),
      whatsapp: form.whatsapp.trim(),
      rating: 0,
      reviewCount: 0,
      joinedAt: new Date().toISOString(),
      availability: {
        timezone: 'Africa/Porto-Novo',
        weeklySlots: DEFAULT_WEEKLY_SLOTS.map((s) => ({ ...s })),
        manualOverride: manualOverrideFromPosture(posture),
        defaultPosture: posture,
        updatedAt: new Date().toISOString(),
      },
      businessDetails: {
        businessName: form.businessName.trim(),
        legalName: form.legalName?.trim() || undefined,
        contactName: form.contactName?.trim() || undefined,
        sector: form.sector,
        legalIdentifiers: form.legalIdentifiers?.trim() || undefined,
      },
      portfolio: [],
      trainingDocuments: [],
    }

    const result = saveProfessionalProfile(profile)
    setSubmitting(false)

    if (!result.ok) {
      setErrors({ _form: result.error })
      return
    }

    clearDraft(DRAFT_KEYS.business)
    onSuccess(profile)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validation = validateBusinessRegistration(form)
    if (!validation.ok) {
      setErrors(validation.errors)
      return
    }

    if (session) {
      submitProfile(session.userId)
      return
    }

    requireAuth(() => {
      const current = getSession()
      if (current?.userId) submitProfile(current.userId)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldWrapper label="Nom commercial" required error={errors.businessName}>
        <TextInput
          value={form.businessName}
          onChange={(e) => updateField('businessName', e.target.value)}
          placeholder="Ex. SARL Maintenance Plus"
          error={!!errors.businessName}
        />
      </FieldWrapper>

      <FieldWrapper label="Raison sociale" error={errors.legalName}>
        <TextInput
          value={form.legalName ?? ''}
          onChange={(e) => updateField('legalName', e.target.value)}
          placeholder="Si différent du nom commercial"
        />
      </FieldWrapper>

      <FieldWrapper label="Personne contact" error={errors.contactName}>
        <TextInput
          value={form.contactName ?? ''}
          onChange={(e) => updateField('contactName', e.target.value)}
          placeholder="Ex. Responsable commercial"
        />
      </FieldWrapper>

      <FieldWrapper label="Secteur" required error={errors.sector}>
        <SelectInput
          value={form.sector}
          onChange={(e) => updateField('sector', e.target.value)}
          error={!!errors.sector}
        >
          <option value="">Choisir un secteur</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </SelectInput>
      </FieldWrapper>

      <FieldWrapper
        label="Services proposés"
        required
        error={errors.services}
        hint="Séparez par des virgules."
      >
        <TextArea
          value={form.services}
          onChange={(e) => updateField('services', e.target.value)}
          placeholder="Ex. Climatisation, Électricité, Plomberie"
          error={!!errors.services}
        />
      </FieldWrapper>

      <FieldWrapper label="Téléphone" required error={errors.phone}>
        <TextInput
          type="tel"
          value={form.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="+229 90 00 00 00"
          error={!!errors.phone}
        />
      </FieldWrapper>

      <FieldWrapper label="WhatsApp" required error={errors.whatsapp}>
        <TextInput
          type="tel"
          value={form.whatsapp}
          onChange={(e) => updateField('whatsapp', e.target.value)}
          placeholder="+229 90 00 00 00"
          error={!!errors.whatsapp}
        />
      </FieldWrapper>

      <FieldWrapper label="Ville" required error={errors.city}>
        <SelectInput
          value={form.city}
          onChange={(e) => updateField('city', e.target.value)}
          error={!!errors.city}
        >
          <option value="">Choisir une ville</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </SelectInput>
      </FieldWrapper>

      <FieldWrapper label="Commune" error={errors.commune}>
        <TextInput
          value={form.commune ?? ''}
          onChange={(e) => updateField('commune', e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper label="Quartier" error={errors.neighborhood}>
        <TextInput
          value={form.neighborhood ?? ''}
          onChange={(e) => updateField('neighborhood', e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper
        label="Identifiants légaux"
        error={errors.legalIdentifiers}
        hint="RCCM, IFU… Donnée privée par défaut."
      >
        <TextInput
          value={form.legalIdentifiers ?? ''}
          onChange={(e) => updateField('legalIdentifiers', e.target.value)}
          placeholder="Ex. RCCM-DEMO-123"
        />
      </FieldWrapper>

      <PostureSelector
        value={form.defaultPosture}
        onChange={(v) => updateField('defaultPosture', v)}
      />

      {errors._form && (
        <p className="text-sm text-danger">{errors._form}</p>
      )}

      <div className="flex flex-col gap-2 pt-2">
        <PrimaryButton type="submit" fullWidth loading={submitting}>
          Créer mon espace entreprise
        </PrimaryButton>
        <PrimaryButton type="button" variant="ghost" fullWidth onClick={onBack}>
          Retour au choix du type
        </PrimaryButton>
      </div>
    </form>
  )
}
