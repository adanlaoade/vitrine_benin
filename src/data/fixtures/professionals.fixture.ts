import type { Professional } from '@/types'

const defaultWeeklySlots = [
  { day: 1 as const, start: '08:00', end: '18:00', enabled: true },
  { day: 2 as const, start: '08:00', end: '18:00', enabled: true },
  { day: 3 as const, start: '08:00', end: '18:00', enabled: true },
  { day: 4 as const, start: '08:00', end: '18:00', enabled: true },
  { day: 5 as const, start: '08:00', end: '18:00', enabled: true },
  { day: 6 as const, start: '09:00', end: '14:00', enabled: true },
  { day: 0 as const, start: '09:00', end: '12:00', enabled: false },
]

export const seedProfessionals: Professional[] = [
  {
    id: 'pro-001',
    accountType: 'individual',
    displayName: 'Marc Agossa',
    photoUrl: undefined,
    category: 'Plomberie',
    skills: ['Fuites', 'Installation sanitaire', 'Débouchage'],
    description:
      'Plombier expérimenté basé à Godomey. Interventions rapides pour fuites, installations et débouchages. Données fictives de démonstration.',
    location: {
      city: 'Abomey-Calavi',
      commune: 'Godomey',
      neighborhood: 'Zogbadjè',
    },
    phone: '+22990123456',
    whatsapp: '+22990123456',
    rating: 4.7,
    reviewCount: 23,
    joinedAt: '2024-03-15T00:00:00.000Z',
    distanceKm: 2.3,
    availability: {
      timezone: 'Africa/Porto-Novo',
      weeklySlots: defaultWeeklySlots,
      manualOverride: 'on',
      defaultPosture: 'available_now',
    },
    cipNumber: 'CIP-DEMO-001',
    trainingDocuments: [
      {
        id: 'td-001',
        title: 'Certificat de formation en plomberie',
        institution: 'CFP Godomey',
        year: 2019,
        description: 'Informations déclarées par le professionnel.',
      },
    ],
    portfolio: [
      {
        id: 'pf-001',
        imageUrl: '/placeholder-work.jpg',
        title: 'Réparation de fuite',
        description: 'Intervention sur canalisation — démonstration.',
        sortOrder: 0,
        createdAt: '2024-06-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 'pro-002',
    accountType: 'individual',
    displayName: 'Fatou Adébayo',
    photoUrl: undefined,
    category: 'Couture',
    skills: ['Robes sur mesure', 'Retouches', 'Tenues traditionnelles'],
    description:
      'Couturière à Abomey-Calavi, spécialisée en tenues sur mesure et retouches. Données fictives de démonstration.',
    location: {
      city: 'Abomey-Calavi',
      commune: 'Calavi',
      neighborhood: 'Togba',
    },
    phone: '+22997112233',
    whatsapp: '+22997112233',
    rating: 4.9,
    reviewCount: 41,
    joinedAt: '2023-11-02T00:00:00.000Z',
    distanceKm: 4.1,
    availability: {
      timezone: 'Africa/Porto-Novo',
      weeklySlots: defaultWeeklySlots,
      manualOverride: null,
      defaultPosture: 'follow_schedule',
    },
    cipNumber: 'CIP-DEMO-002',
    trainingDocuments: [
      {
        id: 'td-002',
        title: 'Diplôme de couture traditionnelle',
        institution: 'Atelier Togba',
        year: 2017,
        description: 'Document fourni par le professionnel.',
      },
    ],
  },
]

export const CATEGORIES = [
  'Plomberie',
  'Couture',
  'Réparation téléphone',
  'Développement web',
  'Coiffure',
  'Maintenance',
] as const

export const CITIES = [
  'Cotonou',
  'Porto-Novo',
  'Abomey-Calavi',
  'Godomey',
  'Akassato',
] as const
