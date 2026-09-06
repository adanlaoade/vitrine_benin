interface FilterChipProps {
  label: string
  selected?: boolean
  onClick?: () => void
  onRemove?: () => void
}

export function FilterChip({
  label,
  selected = false,
  onClick,
  onRemove,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onRemove ?? onClick}
      aria-pressed={selected}
      aria-label={onRemove ? `Retirer le filtre ${label}` : label}
      className={[
        'inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        selected
          ? 'border-primary bg-primary text-white'
          : 'border-border bg-surface text-text hover:border-primary hover:text-primary',
      ].join(' ')}
    >
      {label}
      {onRemove && (
        <span aria-hidden="true" className="text-xs opacity-80">
          ✕
        </span>
      )}
    </button>
  )
}
