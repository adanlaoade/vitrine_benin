import {
  calculateAvailability,
  getStatusLabel,
} from '@/lib/availability'
import type { AvailabilitySchedule, AvailabilityStatus } from '@/types'

interface AvailabilityBadgeProps {
  schedule: AvailabilitySchedule
  showReason?: boolean
}

const statusStyles: Record<AvailabilityStatus, string> = {
  available_now: 'bg-primary-light text-primary border-primary/30',
  available_by_schedule: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  closed_by_schedule: 'bg-amber-50 text-amber-800 border-amber-200',
  unavailable: 'bg-red-50 text-red-700 border-red-200',
}

const statusIcons: Record<AvailabilityStatus, string> = {
  available_now: '●',
  available_by_schedule: '◐',
  closed_by_schedule: '○',
  unavailable: '✕',
}

export function AvailabilityBadge({
  schedule,
  showReason = false,
}: AvailabilityBadgeProps) {
  const { status, reason } = calculateAvailability(schedule)
  const label = getStatusLabel(status)

  return (
    <div className="flex flex-col gap-0.5">
      <span
        className={[
          'inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
          statusStyles[status],
        ].join(' ')}
        aria-label={`Statut : ${label}`}
      >
        <span aria-hidden="true">{statusIcons[status]}</span>
        {label}
      </span>
      {showReason && (
        <span className="text-xs text-text-muted">{reason}</span>
      )}
    </div>
  )
}
