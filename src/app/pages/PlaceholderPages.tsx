import { PageContainer } from '@/components/layout/PageContainer'
import { EmptyState } from '@/components/ui/EmptyState'

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
