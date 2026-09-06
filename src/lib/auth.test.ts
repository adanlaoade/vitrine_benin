import { describe, expect, it, beforeEach } from 'vitest'
import { getSession, mockSignInWithGoogle, signOut } from '@/lib/auth'

describe('auth', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null when no session exists', () => {
    expect(getSession()).toBeNull()
  })

  it('creates a mock session on sign in', () => {
    const session = mockSignInWithGoogle()
    expect(session.isMock).toBe(true)
    expect(session.userId).toBeTruthy()
    expect(getSession()?.userId).toBe(session.userId)
  })

  it('clears session on sign out', () => {
    mockSignInWithGoogle()
    signOut()
    expect(getSession()).toBeNull()
  })
})
