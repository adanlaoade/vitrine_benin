interface FilterChipProps {
  label: string
  selected?: boolean
  onClick?: () => void
}

export function FilterChip({ label, selected = false, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        selected
          ? 'border-primary bg-primary text-white'
          : 'border-border bg-surface text-text hover:border-primary hover:text-primary',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
