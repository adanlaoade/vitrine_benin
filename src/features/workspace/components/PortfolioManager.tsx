import { useState } from 'react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { FieldWrapper, TextArea, TextInput } from '@/features/onboarding/components/FormFields'
import { PORTFOLIO_MAX_ITEMS } from '@/lib/schedule-defaults'
import type { PortfolioItem } from '@/types'

interface PortfolioManagerProps {
  items: PortfolioItem[]
  onChange: (items: PortfolioItem[]) => void
}

export function PortfolioManager({ items, onChange }: PortfolioManagerProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function addItem() {
    if (!title.trim() || items.length >= PORTFOLIO_MAX_ITEMS) return
    const item: PortfolioItem = {
      id: `pf-${Date.now()}`,
      imageUrl: '/placeholder-work.jpg',
      title: title.trim(),
      description: description.trim() || undefined,
      sortOrder: items.length,
      createdAt: new Date().toISOString(),
    }
    onChange([...items, item])
    setTitle('')
    setDescription('')
  }

  function removeItem(id: string) {
    onChange(items.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-text-muted">
        {items.length}/{PORTFOLIO_MAX_ITEMS} réalisations — modifiables à tout moment.
      </p>

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-3 rounded-md border border-border bg-surface p-3"
            >
              <div>
                <p className="text-sm font-medium text-text">{item.title}</p>
                {item.description && (
                  <p className="mt-0.5 text-xs text-text-muted">{item.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="shrink-0 text-xs text-danger hover:underline"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length < PORTFOLIO_MAX_ITEMS && (
        <div className="space-y-3 rounded-md border border-dashed border-border p-3">
          <FieldWrapper label="Titre de la réalisation">
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. Rénovation salle de bain"
            />
          </FieldWrapper>
          <FieldWrapper label="Description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Courte description…"
            />
          </FieldWrapper>
          <PrimaryButton
            type="button"
            variant="secondary"
            fullWidth
            onClick={addItem}
            disabled={!title.trim()}
          >
            Ajouter une réalisation
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
