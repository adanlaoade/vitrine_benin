import type { AccountType } from '@/types'

interface AccountTypeChoiceProps {
  onSelect: (type: AccountType) => void
}

export function AccountTypeChoice({ onSelect }: AccountTypeChoiceProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-text-muted">
        Choisissez le type de compte avant de remplir le formulaire.
      </p>
      <button
        type="button"
        onClick={() => onSelect('individual')}
        className="flex w-full items-start gap-4 rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:border-primary hover:bg-primary-light"
      >
        <span className="text-2xl" aria-hidden>👤</span>
        <div>
          <p className="font-semibold text-text">Professionnel individuel</p>
          <p className="mt-1 text-sm text-text-muted">
            Artisan, freelance ou prestataire indépendant. Numéro CIP obligatoire
            (donnée privée, jamais affichée publiquement).
          </p>
        </div>
      </button>
      <button
        type="button"
        onClick={() => onSelect('business')}
        className="flex w-full items-start gap-4 rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:border-primary hover:bg-primary-light"
      >
        <span className="text-2xl" aria-hidden>🏢</span>
        <div>
          <p className="font-semibold text-text">Entreprise ou personne morale</p>
          <p className="mt-1 text-sm text-text-muted">
            Société, SARL ou structure avec plusieurs services. Formulaire
            distinct adapté aux entreprises.
          </p>
        </div>
      </button>
    </div>
  )
}
