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
  validateIndividualRegistration,
  type IndividualRegistrationInput,
} from '@/lib/validation'
import type { DefaultPosture, Professional } from '@/types'

interface IndividualRegistrationFormProps {
  onSuccess: (profile: Professional) => void
  onBack: () => void
}

const emptyForm: IndividualRegistrationInput = {
  displayName: '',
  phone: '',
  cipNumber: '',
  category: '',
  skills: '',
  description: '',
  city: '',
  commune: '',
  neighborhood: '',
  whatsapp: '',
  defaultPosture: 'available_now',
}

export function IndividualRegistrationForm({
  onSuccess,
  onBack,
}: IndividualRegistrationFormProps) {
  const { session, requireAuth } = useAuth()
  const [form, setForm] = useState<IndividualRegistrationInput>(() =>
    loadDraft(DRAFT_KEYS.individual) ?? emptyForm,
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    saveDraft(DRAFT_KEYS.individual, form)
  }, [form])

  function updateField<K extends keyof IndividualRegistrationInput>(
    key: K,
    value: IndividualRegistrationInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function submitProfile(userId: string) {
    const validation = validateIndividualRegistration(form)
    if (!validation.ok) {
      setErrors(validation.errors)
      return
    }

    setSubmitting(true)
    const posture = form.defaultPosture as DefaultPosture
    const profile: Professional = {
      id: userId,
      accountType: 'individual',
      displayName: form.displayName.trim(),
      category: form.category,
      skills: parseSkillsList(form.skills),
      description: form.description.trim(),
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
      cipNumber: form.cipNumber.trim(),
      portfolio: [],
      trainingDocuments: [],
    }

    const result = saveProfessionalProfile(profile)
    setSubmitting(false)

    if (!result.ok) {
      setErrors({ _form: result.error })
      return
    }

    clearDraft(DRAFT_KEYS.individual)
    onSuccess(profile)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validation = validateIndividualRegistration(form)
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
      <FieldWrapper label="Nom complet" required error={errors.displayName}>
        <TextInput
          value={form.displayName}
          onChange={(e) => updateField('displayName', e.target.value)}
          placeholder="Ex. Koffi Mensah"
          error={!!errors.displayName}
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

      <FieldWrapper
        label="Numéro CIP"
        required
        error={errors.cipNumber}
        hint="Obligatoire. Donnée privée — jamais affichée sur votre profil public."
      >
        <TextInput
          value={form.cipNumber}
          onChange={(e) => updateField('cipNumber', e.target.value)}
          placeholder="Ex. CIP-DEMO-123456"
          error={!!errors.cipNumber}
        />
      </FieldWrapper>

      <FieldWrapper label="Catégorie" required error={errors.category}>
        <SelectInput
          value={form.category}
          onChange={(e) => updateField('category', e.target.value)}
          error={!!errors.category}
        >
          <option value="">Choisir une catégorie</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </SelectInput>
      </FieldWrapper>

      <FieldWrapper
        label="Compétences"
        required
        error={errors.skills}
        hint="Séparez par des virgules."
      >
        <TextInput
          value={form.skills}
          onChange={(e) => updateField('skills', e.target.value)}
          placeholder="Ex. Fuites, Installation sanitaire"
          error={!!errors.skills}
        />
      </FieldWrapper>

      <FieldWrapper label="Description" required error={errors.description}>
        <TextArea
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Présentez votre activité…"
          error={!!errors.description}
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
          placeholder="Ex. Godomey"
        />
      </FieldWrapper>

      <FieldWrapper label="Quartier" error={errors.neighborhood}>
        <TextInput
          value={form.neighborhood ?? ''}
          onChange={(e) => updateField('neighborhood', e.target.value)}
          placeholder="Ex. Zogbadjè"
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

      <PostureSelector
        value={form.defaultPosture}
        onChange={(v) => updateField('defaultPosture', v)}
      />

      {errors._form && (
        <p className="text-sm text-danger">{errors._form}</p>
      )}

      <div className="flex flex-col gap-2 pt-2">
        <PrimaryButton type="submit" fullWidth loading={submitting}>
          Créer mon espace professionnel
        </PrimaryButton>
        <PrimaryButton type="button" variant="ghost" fullWidth onClick={onBack}>
          Retour au choix du type
        </PrimaryButton>
      </div>
    </form>
  )
}
