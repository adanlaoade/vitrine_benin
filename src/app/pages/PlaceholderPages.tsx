import { PageContainer } from '@/components/layout/PageContainer'
import { EmptyState } from '@/components/ui/EmptyState'

export function TrouverPage() {
  return (
    <PageContainer title="Trouver" subtitle="Recherche avancée — Jour 2">
      <EmptyState
        title="Écran en construction"
        description="Les résultats de recherche et le bloc « Je ne trouve pas ce que je cherche » seront disponibles au Jour 2."
        icon="🔍"
      />
    </PageContainer>
  )
}

export function DemandesPage() {
  return (
    <PageContainer title="Demandes" subtitle="Historique de vos demandes">
      <EmptyState
        title="Aucune demande pour le moment"
        description="Les demandes non couvertes apparaîtront ici après envoi."
        icon="📋"
      />
    </PageContainer>
  )
}

export function MonEspacePage() {
  return (
    <PageContainer title="Mon espace">
      <EmptyState
        title="Créez votre espace professionnel"
        description="Inscrivez-vous comme professionnel individuel ou entreprise pour gérer votre profil, vos horaires et votre portfolio."
        icon="👤"
      />
    </PageContainer>
  )
}

export function ProfessionalProfilePage() {
  return (
    <PageContainer title="Profil professionnel">
      <EmptyState
        title="Profil en construction"
        description="L'écran de profil public sera disponible au Jour 3."
        icon="👷"
      />
    </PageContainer>
  )
}
