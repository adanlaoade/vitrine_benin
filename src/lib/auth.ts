import type { AuthSession } from '@/types'

const SESSION_KEY = 'vnb.session'

const MOCK_USERS: Omit<AuthSession, 'userId'>[] = [
  {
    displayName: 'Kofi Mensah',
    email: 'kofi.mensah.demo@gmail.com',
    avatarUrl: undefined,
    isMock: true,
  },
  {
    displayName: 'Aïcha Dossou',
    email: 'aicha.dossou.demo@gmail.com',
    avatarUrl: undefined,
    isMock: true,
  },
]

function generateUserId(): string {
  return `mock-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function isValidSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== 'object') return false
  const session = value as Record<string, unknown>
  return (
    typeof session.userId === 'string' &&
    typeof session.displayName === 'string' &&
    typeof session.email === 'string' &&
    session.isMock === true
  )
}

export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!isValidSession(parsed)) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return parsed
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function mockSignInWithGoogle(): AuthSession {
  const template = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)]
  const session: AuthSession = {
    userId: generateUserId(),
    ...template,
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function signOut(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}
