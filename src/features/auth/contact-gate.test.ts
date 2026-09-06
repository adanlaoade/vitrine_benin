import { describe, expect, it, vi } from 'vitest'
import { runProtectedAction, shouldRequireSignIn } from '@/features/auth/contact-gate'
import type { AuthSession } from '@/types'

const mockSession: AuthSession = {
  userId: 'user-1',
  displayName: 'Test User',
  email: 'test@demo.com',
  isMock: true,
}

describe('contact-gate', () => {
  it('requiert la connexion sans session', () => {
    expect(shouldRequireSignIn(null)).toBe(true)
    expect(shouldRequireSignIn(mockSession)).toBe(false)
  })

  it('exécute l\'action directement si session présente', () => {
    const action = vi.fn()
    const onRequireAuth = vi.fn()

    runProtectedAction(mockSession, action, onRequireAuth)

    expect(action).toHaveBeenCalledOnce()
    expect(onRequireAuth).not.toHaveBeenCalled()
  })

  it('ouvre la connexion si session absente', () => {
    const action = vi.fn()
    const onRequireAuth = vi.fn()

    runProtectedAction(null, action, onRequireAuth)

    expect(action).not.toHaveBeenCalled()
    expect(onRequireAuth).toHaveBeenCalledOnce()
  })
})
