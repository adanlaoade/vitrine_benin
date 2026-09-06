import { DAY_LABELS } from '@/lib/schedule-defaults'
import type { WeeklySlot } from '@/types'

interface WeeklyScheduleEditorProps {
  slots: WeeklySlot[]
  onChange: (slots: WeeklySlot[]) => void
}

export function WeeklyScheduleEditor({
  slots,
  onChange,
}: WeeklyScheduleEditorProps) {
  function updateSlot(day: WeeklySlot['day'], patch: Partial<WeeklySlot>) {
    onChange(
      slots.map((slot) =>
        slot.day === day ? { ...slot, ...patch } : slot,
      ),
    )
  }

  return (
    <div className="space-y-3">
      {DAY_LABELS.map((label, index) => {
        const day = index as WeeklySlot['day']
        const slot = slots.find((s) => s.day === day)
        if (!slot) return null

        return (
          <div
            key={day}
            className="rounded-md border border-border bg-surface p-3"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={slot.enabled}
                onChange={(e) => updateSlot(day, { enabled: e.target.checked })}
                className="accent-primary"
              />
              <span className="text-sm font-medium text-text">{label}</span>
            </label>
            {slot.enabled && (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="time"
                  value={slot.start}
                  onChange={(e) => updateSlot(day, { start: e.target.value })}
                  className="rounded-md border border-border px-2 py-1.5 text-sm"
                />
                <span className="text-text-muted">–</span>
                <input
                  type="time"
                  value={slot.end}
                  onChange={(e) => updateSlot(day, { end: e.target.value })}
                  className="rounded-md border border-border px-2 py-1.5 text-sm"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
