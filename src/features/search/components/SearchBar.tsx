import { useState } from 'react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  showVoiceButton?: boolean
  disabled?: boolean
}

export function SearchBar({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = 'Que cherchez-vous ?',
  showVoiceButton = false,
  disabled = false,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('')
  const value = controlledValue ?? internalValue

  const handleChange = (next: string) => {
    if (onChange) onChange(next)
    else setInternalValue(next)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (value.trim() && onSubmit) onSubmit(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2" role="search">
      <label htmlFor="search-input" className="sr-only">
        Recherche
      </label>
      <div className="relative flex-1">
        <input
          id="search-input"
          type="search"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full min-h-11 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          autoComplete="off"
        />
      </div>
      {showVoiceButton && (
        <PrimaryButton
          type="button"
          variant="secondary"
          aria-label="Recherche vocale (bientôt disponible)"
          disabled
          className="min-w-11 px-3"
        >
          🎤
        </PrimaryButton>
      )}
      <PrimaryButton type="submit" disabled={disabled || !value.trim()}>
        Trouver
      </PrimaryButton>
    </form>
  )
}
