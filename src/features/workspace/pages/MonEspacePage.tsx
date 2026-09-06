import { useCallback, useEffect, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { OnboardingFlow } from '@/features/onboarding/components/OnboardingFlow'
import { WorkspaceView } from '@/features/workspace/components/WorkspaceView'
import { useAuth } from '@/features/auth/AuthProvider'
import { getOwnedProfessional } from '@/lib/repository'
import type { Professional } from '@/types'

export function MonEspacePage() {
  const { session } = useAuth()
  const [profile, setProfile] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(() => {
    if (!session) {
      setProfile(null)
      setLoading(false)
      return
    }
    const result = getOwnedProfessional(session.userId)
    if (result.ok) {
      setProfile(result.data)
    }
    setLoading(false)
  }, [session])

  useEffect(() => {
    setLoading(true)
    loadProfile()
  }, [loadProfile])

  if (loading) {
    return (
      <PageContainer title="Mon espace">
        <div className="h-32 animate-pulse rounded-lg bg-border" role="status" />
      </PageContainer>
    )
  }

  if (profile) {
    return (
      <PageContainer
        title="Mon espace"
        subtitle="Gérez votre profil, horaires et portfolio"
      >
        <WorkspaceView profile={profile} onProfileUpdate={setProfile} />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Mon espace"
      subtitle="Créez votre espace professionnel"
    >
      <OnboardingFlow onComplete={setProfile} />
    </PageContainer>
  )
}
