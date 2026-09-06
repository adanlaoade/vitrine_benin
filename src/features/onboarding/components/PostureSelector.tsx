import type { DefaultPosture } from '@/types'
import { defaultPostureLabel } from '@/lib/validation'

interface PostureSelectorProps {
  value: DefaultPosture
  onChange: (value: DefaultPosture) => void
}

export function PostureSelector({ value, onChange }: PostureSelectorProps) {
  const options: DefaultPosture[] = ['available_now', 'follow_schedule']

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-text">
        Disponibilité par défaut
      </legend>
      <p className="text-xs text-text-muted">
        Ce choix devient la valeur initiale de votre interrupteur dans Mon espace.
      </p>
      {options.map((option) => (
        <label
          key={option}
          className={[
            'flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors',
            value === option
              ? 'border-primary bg-primary-light'
              : 'border-border bg-surface',
          ].join(' ')}
        >
          <input
            type="radio"
            name="defaultPosture"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="mt-0.5 accent-primary"
          />
          <span className="text-sm text-text">{defaultPostureLabel(option)}</span>
        </label>
      ))}
    </fieldset>
  )
}
