const DAY_LABELS = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
] as const

export function formatWeeklySchedule(
  slots: Array<{ day: number; start: string; end: string; enabled: boolean }>,
): Array<{ day: string; hours: string }> {
  return DAY_LABELS.map((dayLabel, index) => {
    const daySlots = slots.filter((s) => s.day === index && s.enabled)
    if (daySlots.length === 0) {
      return { day: dayLabel, hours: 'Fermé' }
    }
    const hours = daySlots
      .map((s) => `${s.start} – ${s.end}`)
      .join(', ')
    return { day: dayLabel, hours }
  })
}

export function formatPhoneLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`
}

export function formatWhatsAppLink(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, '')
  return `https://wa.me/${digits}`
}

export function formatLocationSearch(pro: {
  location: {
    city: string
    commune?: string
    neighborhood?: string
  }
}): string {
  const parts = [
    pro.location.neighborhood,
    pro.location.commune,
    pro.location.city,
    'Bénin',
  ].filter(Boolean)
  return parts.join(', ')
}
