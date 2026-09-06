import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  getSession,
  mockSignInWithGoogle,
  signOut as authSignOut,
} from '@/lib/auth'
import type { AuthSession } from '@/types'
import { MockSignInModal } from '@/features/auth/MockSignInModal'

interface AuthContextValue {
  session: AuthSession | null
  requireAuth: (action: () => void) => void
  signOut: () => void
  refreshSession: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => getSession())
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  const refreshSession = useCallback(() => {
    setSession(getSession())
  }, [])

  const requireAuth = useCallback((action: () => void) => {
    const current = getSession()
    if (current) {
      action()
      return
    }
    setPendingAction(() => action)
    setModalOpen(true)
  }, [])

  const handleSignIn = useCallback(() => {
    mockSignInWithGoogle()
    refreshSession()
    setModalOpen(false)
    pendingAction?.()
    setPendingAction(null)
  }, [pendingAction, refreshSession])

  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
    setPendingAction(null)
  }, [])

  const handleSignOut = useCallback(() => {
    authSignOut()
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({
      session,
      requireAuth,
      signOut: handleSignOut,
      refreshSession,
    }),
    [session, requireAuth, handleSignOut, refreshSession],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
      <MockSignInModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSignIn={handleSignIn}
      />
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}
