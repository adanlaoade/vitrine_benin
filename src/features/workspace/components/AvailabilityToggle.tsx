import { calculateAvailability, getStatusLabel } from '@/lib/availability'
import { defaultPostureLabel } from '@/lib/validation'
import type { AvailabilitySchedule, ManualOverride } from '@/types'

interface AvailabilityToggleProps {
  schedule: AvailabilitySchedule
  onChange: (override: ManualOverride) => void
}

export function AvailabilityToggle({ schedule, onChange }: AvailabilityToggleProps) {
  const { status, reason } = calculateAvailability(schedule)
  const isOn = schedule.manualOverride === 'on'
  const isOff = schedule.manualOverride === 'off'

  return (
    <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
      <div>
        <p className="text-sm font-medium text-text">Disponibilité manuelle</p>
        <p className="mt-1 text-xs text-text-muted">
          Posture initiale : {defaultPostureLabel(schedule.defaultPosture)}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange('on')}
          className={[
            'flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors',
            isOn
              ? 'bg-primary text-white'
              : 'border border-border bg-surface-muted text-text',
          ].join(' ')}
        >
          Disponible
        </button>
        <button
          type="button"
          onClick={() => onChange('off')}
          className={[
            'flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors',
            isOff
              ? 'bg-danger text-white'
              : 'border border-border bg-surface-muted text-text',
          ].join(' ')}
        >
          Indisponible
        </button>
        <button
          type="button"
          onClick={() => onChange(null)}
          className={[
            'flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors',
            !isOn && !isOff
              ? 'bg-primary-light text-primary'
              : 'border border-border bg-surface-muted text-text',
          ].join(' ')}
        >
          Horaires
        </button>
      </div>

      <div className="rounded-md bg-surface-muted p-3">
        <p className="text-sm font-medium text-text">
          Statut actuel : {getStatusLabel(status)}
        </p>
        <p className="mt-0.5 text-xs text-text-muted">{reason}</p>
      </div>
    </div>
  )
}
