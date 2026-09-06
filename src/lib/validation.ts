import type { AccountType, DefaultPosture } from '@/types'

export interface ValidationResult {
  ok: boolean
  errors: Record<string, string>
}

export interface IndividualRegistrationInput {
  displayName: string
  phone: string
  cipNumber: string
  category: string
  skills: string
  description: string
  city: string
  commune?: string
  neighborhood?: string
  whatsapp: string
  defaultPosture: DefaultPosture
}

export interface BusinessRegistrationInput {
  businessName: string
  legalName?: string
  contactName?: string
  sector: string
  services: string
  phone: string
  whatsapp: string
  city: string
  commune?: string
  neighborhood?: string
  legalIdentifiers?: string
  defaultPosture: DefaultPosture
}

const CIP_PATTERN = /^[A-Za-z0-9-]{6,24}$/
const PHONE_PATTERN = /^\+?[0-9\s-]{8,15}$/

export function validateCipNumber(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) {
    return 'Le numéro CIP est obligatoire.'
  }
  if (!CIP_PATTERN.test(trimmed)) {
    return 'Format CIP invalide (6 à 24 caractères alphanumériques).'
  }
  return null
}

export function validatePhone(value: string, fieldLabel = 'Téléphone'): string | null {
  const trimmed = value.trim()
  if (!trimmed) {
    return `${fieldLabel} obligatoire.`
  }
  if (!PHONE_PATTERN.test(trimmed)) {
    return `${fieldLabel} invalide.`
  }
  return null
}

function validateRequired(value: string, fieldLabel: string): string | null {
  if (!value.trim()) {
    return `${fieldLabel} obligatoire.`
  }
  return null
}

function validateSkills(value: string): string | null {
  const skills = value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (skills.length === 0) {
    return 'Indiquez au moins une compétence (séparées par des virgules).'
  }
  return null
}

function collectErrors(
  checks: Array<[string, string | null]>,
): ValidationResult {
  const errors: Record<string, string> = {}
  for (const [field, message] of checks) {
    if (message) errors[field] = message
  }
  return { ok: Object.keys(errors).length === 0, errors }
}

export function validateIndividualRegistration(
  data: IndividualRegistrationInput,
): ValidationResult {
  return collectErrors([
    ['displayName', validateRequired(data.displayName, 'Nom complet')],
    ['phone', validatePhone(data.phone)],
    ['cipNumber', validateCipNumber(data.cipNumber)],
    ['category', validateRequired(data.category, 'Catégorie')],
    ['skills', validateSkills(data.skills)],
    ['description', validateRequired(data.description, 'Description')],
    ['city', validateRequired(data.city, 'Ville')],
    ['whatsapp', validatePhone(data.whatsapp, 'WhatsApp')],
  ])
}

export function validateBusinessRegistration(
  data: BusinessRegistrationInput,
): ValidationResult {
  return collectErrors([
    ['businessName', validateRequired(data.businessName, 'Nom commercial')],
    ['sector', validateRequired(data.sector, 'Secteur')],
    ['services', validateSkills(data.services)],
    ['phone', validatePhone(data.phone)],
    ['whatsapp', validatePhone(data.whatsapp, 'WhatsApp')],
    ['city', validateRequired(data.city, 'Ville')],
  ])
}

export function parseSkillsList(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function accountTypeLabel(type: AccountType): string {
  return type === 'individual'
    ? 'Professionnel individuel'
    : 'Entreprise ou personne morale'
}

export function defaultPostureLabel(posture: DefaultPosture): string {
  return posture === 'available_now'
    ? 'Je suis disponible maintenant'
    : 'Je suis mes horaires'
}
