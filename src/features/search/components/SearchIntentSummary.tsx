import { FilterChip } from '@/components/ui/FilterChip'
import type { SearchIntent } from '@/types'

interface SearchIntentSummaryProps {
  intent: SearchIntent
  onUpdate: (intent: SearchIntent) => void
}

function buildChips(intent: SearchIntent): Array<{
  key: keyof SearchIntent
  label: string
  value: string
}> {
  const chips: Array<{ key: keyof SearchIntent; label: string; value: string }> = []

  if (intent.service) {
    chips.push({ key: 'service', label: 'Service', value: intent.service })
  }
  if (intent.category) {
    chips.push({ key: 'category', label: 'Catégorie', value: intent.category })
  }
  if (intent.location) {
    chips.push({ key: 'location', label: 'Lieu', value: intent.location })
  }
  if (intent.availability === 'available_now') {
    chips.push({
      key: 'availability',
      label: 'Disponibilité',
      value: 'Disponible maintenant',
    })
  }

  return chips
}

export function SearchIntentSummary({ intent, onUpdate }: SearchIntentSummaryProps) {
  const chips = buildChips(intent)

  const removeChip = (key: keyof SearchIntent) => {
    const next = { ...intent }
    if (key === 'availability') {
      delete next.availability
    } else if (key === 'service') {
      next.service = undefined
      next.rawQuery = ''
    } else {
      delete next[key]
    }
    onUpdate(next)
  }

  return (
    <section aria-labelledby="intent-heading" className="mb-4">
      <h2 id="intent-heading" className="mb-2 text-sm font-semibold text-text">
        J&apos;ai compris
        {intent.confidence != null && (
          <span className="ml-2 font-normal text-text-muted">
            (interprétation partielle — modifiable)
          </span>
        )}
      </h2>

      {chips.length === 0 ? (
        <p className="text-sm text-text-muted">
          Aucun critère extrait. Affinez votre recherche ou utilisez les filtres ci-dessous.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <FilterChip
              key={chip.key}
              label={`${chip.label} : ${chip.value}`}
              selected
              onRemove={() => removeChip(chip.key)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
