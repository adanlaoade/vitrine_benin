import type {
  AvailabilitySchedule,
  AvailabilityStatus,
  DefaultPosture,
  ManualOverride,
} from '@/types'

const STATUS_LABELS: Record<AvailabilityStatus, string> = {
  available_now: 'Disponible maintenant',
  available_by_schedule: 'Disponible selon les horaires',
  closed_by_schedule: 'Fermé selon les horaires',
  unavailable: 'Indisponible',
}

export function getStatusLabel(status: AvailabilityStatus): string {
  return STATUS_LABELS[status]
}

export function manualOverrideFromPosture(
  posture: DefaultPosture,
): ManualOverride {
  return posture === 'available_now' ? 'on' : null
}

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function isWithinSlot(
  currentMinutes: number,
  start: string,
  end: string,
): boolean {
  const startMinutes = parseTimeToMinutes(start)
  const endMinutes = parseTimeToMinutes(end)
  return currentMinutes >= startMinutes && currentMinutes < endMinutes
}

export interface AvailabilityResult {
  status: AvailabilityStatus
  reason: string
}

export function calculateAvailability(
  schedule: AvailabilitySchedule,
  now: Date = new Date(),
): AvailabilityResult {
  if (schedule.manualOverride === 'off') {
    return {
      status: 'unavailable',
      reason: 'Le professionnel s\'est déclaré indisponible.',
    }
  }

  if (schedule.manualOverride === 'on') {
    return {
      status: 'available_now',
      reason: 'Le professionnel s\'est déclaré disponible maintenant.',
    }
  }

  const day = now.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const todaySlots = schedule.weeklySlots.filter(
    (slot) => slot.day === day && slot.enabled,
  )

  const isOpen = todaySlots.some((slot) =>
    isWithinSlot(currentMinutes, slot.start, slot.end),
  )

  if (isOpen) {
    return {
      status: 'available_by_schedule',
      reason: 'Le professionnel est dans un créneau horaire ouvert.',
    }
  }

  return {
    status: 'closed_by_schedule',
    reason: 'Le professionnel est en dehors de ses horaires déclarés.',
  }
}
