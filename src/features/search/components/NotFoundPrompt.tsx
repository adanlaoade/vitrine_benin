import { PrimaryButton } from '@/components/ui/PrimaryButton'

interface NotFoundPromptProps {
  hasResults: boolean
  onSubmitRequest: () => void
}

export function NotFoundPrompt({ hasResults, onSubmitRequest }: NotFoundPromptProps) {
  return (
    <section
      className="mt-6 rounded-lg border border-dashed border-primary/40 bg-primary-light p-4"
      aria-labelledby="not-found-heading"
    >
      <h2 id="not-found-heading" className="text-base font-semibold text-text">
        {hasResults
          ? 'Vous ne trouvez toujours pas ?'
          : 'Je ne trouve pas ce que je cherche'}
      </h2>
      <p className="mt-2 text-sm text-text-muted">
        {hasResults
          ? 'Décrivez votre besoin et nous le conserverons pour le relayer aux professionnels.'
          : 'Aucun résultat ne correspond. Décrivez votre besoin — nous le garderons en mémoire sur cet appareil.'}
      </p>
      <PrimaryButton
        variant="secondary"
        fullWidth
        className="mt-4"
        onClick={onSubmitRequest}
      >
        Décrire ma demande
      </PrimaryButton>
    </section>
  )
}
