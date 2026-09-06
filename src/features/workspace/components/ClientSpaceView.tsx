import { useState } from 'react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { useAuth } from '@/features/auth/AuthProvider'
import { FavoritesList } from '@/features/workspace/components/FavoritesList'
import { OnboardingFlow } from '@/features/onboarding/components/OnboardingFlow'
import type { Professional } from '@/types'

interface ClientSpaceViewProps {
  onProfileCreated: (profile: Professional) => void
}

export function ClientSpaceView({ onProfileCreated }: ClientSpaceViewProps) {
  const { session, signOut } = useAuth()
  const [showOnboarding, setShowOnboarding] = useState(false)

  if (showOnboarding) {
    return (
      <div className="space-y-4">
        <PrimaryButton
          variant="ghost"
          fullWidth
          onClick={() => setShowOnboarding(false)}
        >
          ← Retour à Mes favoris
        </PrimaryButton>
        <OnboardingFlow onComplete={onProfileCreated} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {session && (
        <p className="text-sm text-text-muted">
          Connecté en tant que {session.displayName}
        </p>
      )}

      <section aria-labelledby="favorites-heading">
        <h2 id="favorites-heading" className="mb-3 text-base font-semibold text-text">
          Mes favoris
        </h2>
        <FavoritesList />
      </section>

      <section className="rounded-lg border border-dashed border-border bg-surface p-4">
        <p className="text-sm font-medium text-text">Vous êtes professionnel ?</p>
        <p className="mt-1 text-xs text-text-muted">
          Créez votre espace pour gérer votre profil, vos horaires et votre portfolio.
        </p>
        <PrimaryButton
          fullWidth
          className="mt-3"
          onClick={() => setShowOnboarding(true)}
        >
          Créer mon espace professionnel
        </PrimaryButton>
      </section>

      {session && (
        <PrimaryButton variant="ghost" fullWidth onClick={signOut}>
          Se déconnecter
        </PrimaryButton>
      )}
    </div>
  )
}
