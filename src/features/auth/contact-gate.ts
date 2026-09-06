import type { AuthSession } from '@/types'

/** Indique si la modale de connexion doit s'afficher avant une action protégée. */
export function shouldRequireSignIn(session: AuthSession | null): boolean {
  return session === null
}

/** Exécute l'action si session présente, sinon déclenche le callback d'authentification. */
export function runProtectedAction(
  session: AuthSession | null,
  action: () => void,
  onRequireAuth: () => void,
): void {
  if (shouldRequireSignIn(session)) {
    onRequireAuth()
    return
  }
  action()
}
