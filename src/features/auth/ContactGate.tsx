import type { ReactNode } from 'react'
import { useAuth } from '@/features/auth/AuthProvider'

interface ContactGateProps {
  onAuthorized: () => void
  children: (props: { trigger: () => void }) => ReactNode
}

/** Vérifie la session avant d'exécuter une action protégée (contact, favori…). */
export function ContactGate({ onAuthorized, children }: ContactGateProps) {
  const { requireAuth } = useAuth()

  const trigger = () => {
    requireAuth(onAuthorized)
  }

  return <>{children({ trigger })}</>
}
