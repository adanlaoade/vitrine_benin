import { useState } from 'react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { VoiceInput } from '@/features/search/components/VoiceInput'

interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string, source?: 'text' | 'voice') => void
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
  const [lastSource, setLastSource] = useState<'text' | 'voice'>('text')
  const value = controlledValue ?? internalValue

  const handleChange = (next: string) => {
    setLastSource('text')
    if (onChange) onChange(next)
    else setInternalValue(next)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (value.trim() && onSubmit) {
      onSubmit(value.trim(), lastSource)
    }
  }

  const handleVoiceTranscript = (transcript: string) => {
    setLastSource('voice')
    if (onChange) onChange(transcript)
    else setInternalValue(transcript)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-start gap-2" role="search">
      <label htmlFor="search-input" className="sr-only">
        Recherche
      </label>
      <div className="relative min-w-0 flex-1">
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
        {lastSource === 'voice' && value && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary">
            🎤
          </span>
        )}
      </div>
      {showVoiceButton && (
        <VoiceInput onTranscript={handleVoiceTranscript} disabled={disabled} />
      )}
      <PrimaryButton type="submit" disabled={disabled || !value.trim()}>
        Trouver
      </PrimaryButton>
    </form>
  )
}
