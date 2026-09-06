import { describe, expect, it } from 'vitest'
import {
  validateBusinessRegistration,
  validateCipNumber,
  validateIndividualRegistration,
} from '@/lib/validation'

describe('validateCipNumber', () => {
  it('rejects empty CIP', () => {
    expect(validateCipNumber('')).toBe('Le numéro CIP est obligatoire.')
  })

  it('rejects invalid format', () => {
    expect(validateCipNumber('abc')).toBe(
      'Format CIP invalide (6 à 24 caractères alphanumériques).',
    )
  })

  it('accepts valid CIP', () => {
    expect(validateCipNumber('CIP-DEMO-001')).toBeNull()
  })
})

describe('validateIndividualRegistration', () => {
  const valid = {
    displayName: 'Jean Dupont',
    phone: '+22990123456',
    cipNumber: 'CIP-DEMO-123',
    category: 'Plomberie',
    skills: 'Fuites, Débouchage',
    description: 'Plombier expérimenté.',
    city: 'Cotonou',
    whatsapp: '+22990123456',
    defaultPosture: 'available_now' as const,
  }

  it('passes with valid data', () => {
    const result = validateIndividualRegistration(valid)
    expect(result.ok).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('requires CIP', () => {
    const result = validateIndividualRegistration({ ...valid, cipNumber: '' })
    expect(result.ok).toBe(false)
    expect(result.errors.cipNumber).toBeTruthy()
  })
})

describe('validateBusinessRegistration', () => {
  const valid = {
    businessName: 'SARL Maintenance Plus',
    sector: 'Maintenance',
    services: 'Climatisation, Électricité',
    phone: '+22997112233',
    whatsapp: '+22997112233',
    city: 'Porto-Novo',
    defaultPosture: 'follow_schedule' as const,
  }

  it('passes with valid data', () => {
    const result = validateBusinessRegistration(valid)
    expect(result.ok).toBe(true)
  })

  it('requires business name', () => {
    const result = validateBusinessRegistration({ ...valid, businessName: '' })
    expect(result.ok).toBe(false)
    expect(result.errors.businessName).toBeTruthy()
  })
})
