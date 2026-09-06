import { PrimaryButton } from '@/components/ui/PrimaryButton'

interface MockSignInModalProps {
  open: boolean
  onClose: () => void
  onSignIn: () => void
}

export function MockSignInModal({ open, onClose, onSignIn }: MockSignInModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-title"
        className="w-full max-w-sm rounded-lg bg-surface p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="signin-title" className="text-lg font-bold text-text">
          Connexion requise
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Pour contacter un professionnel ou ajouter un favori, connectez-vous
          avec un compte de démonstration.
        </p>
        <p className="mt-1 text-xs text-text-muted">
          Authentification simulée — aucune donnée n&apos;est envoyée à Google.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <PrimaryButton fullWidth onClick={onSignIn}>
            Continuer avec Google
          </PrimaryButton>
          <PrimaryButton variant="ghost" fullWidth onClick={onClose}>
            Annuler
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
