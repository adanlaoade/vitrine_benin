import type { Professional } from '@/types'
import type { WeeklySlot } from '@/types'

const DEFAULT_SCHEDULE = [
  { day: 1, start: '08:00', end: '18:00', enabled: true },
  { day: 2, start: '08:00', end: '18:00', enabled: true },
  { day: 3, start: '08:00', end: '18:00', enabled: true },
  { day: 4, start: '08:00', end: '18:00', enabled: true },
  { day: 5, start: '08:00', end: '18:00', enabled: true },
  { day: 6, start: '09:00', end: '14:00', enabled: true },
  { day: 0, start: '09:00', end: '12:00', enabled: false },
] as const satisfies readonly WeeklySlot[]

const schedulePhone = [
  { day: 1, start: '09:00', end: '18:00', enabled: true },
  { day: 2, start: '09:00', end: '18:00', enabled: true },
  { day: 3, start: '09:00', end: '18:00', enabled: true },
  { day: 4, start: '09:00', end: '18:00', enabled: true },
  { day: 5, start: '09:00', end: '17:00', enabled: true },
  { day: 6, start: '10:00', end: '14:00', enabled: true },
  { day: 0, start: '09:00', end: '12:00', enabled: false },
]

const scheduleWeb = [
  { day: 1, start: '08:00', end: '20:00', enabled: true },
  { day: 2, start: '08:00', end: '20:00', enabled: true },
  { day: 3, start: '08:00', end: '20:00', enabled: true },
  { day: 4, start: '08:00', end: '20:00', enabled: true },
  { day: 5, start: '08:00', end: '18:00', enabled: true },
  { day: 6, start: '08:00', end: '18:00', enabled: true },
  { day: 0, start: '08:00', end: '18:00', enabled: false },
]

const scheduleHair = [
  { day: 1, start: '08:00', end: '18:00', enabled: true },
  { day: 2, start: '08:00', end: '18:00', enabled: true },
  { day: 3, start: '08:00', end: '18:00', enabled: true },
  { day: 4, start: '08:00', end: '18:00', enabled: true },
  { day: 5, start: '08:00', end: '18:00', enabled: true },
  { day: 6, start: '08:00', end: '14:00', enabled: true },
  { day: 0, start: '09:00', end: '12:00', enabled: false },
]

const scheduleMaintenance = [
  { day: 1, start: '07:00', end: '17:00', enabled: true },
  { day: 2, start: '07:00', end: '17:00', enabled: true },
  { day: 3, start: '07:00', end: '17:00', enabled: true },
  { day: 4, start: '07:00', end: '17:00', enabled: true },
  { day: 5, start: '07:00', end: '17:00', enabled: true },
  { day: 6, start: '07:00', end: '12:00', enabled: true },
  { day: 0, start: '09:00', end: '12:00', enabled: false },
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
      weeklySlots: [...DEFAULT_SCHEDULE],
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
      weeklySlots: [...DEFAULT_SCHEDULE],
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
  {
    id: 'pro-003',
    accountType: 'individual',
    displayName: 'Jean Koudoyor',
    photoUrl: undefined,
    category: 'Réparation téléphone',
    skills: ['Écrans', 'Batteries', 'Logiciels', 'Déblocage'],
    description:
      'Technicien en réparation de téléphones à Cotonou. Tous marques, réparations rapides et devis gratuit. Données fictives de démonstration.',
    location: {
      city: 'Cotonou',
      commune: 'Cotonou',
      neighborhood: 'Fidjrossè',
    },
    phone: '+22996123456',
    whatsapp: '+22996123456',
    rating: 4.5,
    reviewCount: 67,
    joinedAt: '2024-01-10T00:00:00.000Z',
    distanceKm: 1.2,
    availability: {
      timezone: 'Africa/Porto-Novo',
      weeklySlots: schedulePhone,
      manualOverride: null,
      defaultPosture: 'follow_schedule',
    },
    cipNumber: 'CIP-DEMO-003',
    trainingDocuments: [
      {
        id: 'td-003',
        title: 'Attestation en maintenance électronique',
        institution: 'Centre de formation Fidjrossè',
        year: 2020,
        description: 'Document fourni par le professionnel.',
      },
    ],
    portfolio: [
      {
        id: 'pf-003',
        imageUrl: '/placeholder-work.jpg',
        title: 'Remplacement écran iPhone',
        description: 'Réparation terminée en 30 minutes — démonstration.',
        sortOrder: 0,
        createdAt: '2024-05-15T00:00:00.000Z',
      },
    ],
  },
  {
    id: 'pro-004',
    accountType: 'individual',
    displayName: 'Aïcha Biao',
    photoUrl: undefined,
    category: 'Développement web',
    skills: ['React', 'Node.js', 'Sites vitrines', 'E-commerce'],
    description:
      'Développeuse web freelance à Fidjrossè. Création de sites modernes et applications sur mesure pour professionnels béninois. Données fictives de démonstration.',
    location: {
      city: 'Cotonou',
      commune: 'Cotonou',
      neighborhood: 'Fidjrossè',
    },
    phone: '+22995987654',
    whatsapp: '+22995987654',
    rating: 4.8,
    reviewCount: 19,
    joinedAt: '2024-06-20T00:00:00.000Z',
    distanceKm: 3.5,
    availability: {
      timezone: 'Africa/Porto-Novo',
      weeklySlots: scheduleWeb,
      manualOverride: 'on',
      defaultPosture: 'available_now',
    },
    cipNumber: 'CIP-DEMO-004',
    trainingDocuments: [
      {
        id: 'td-004',
        title: 'Certificat en développement web',
        institution: 'IFRI UAC',
        year: 2021,
        description: 'Informations déclarées par le professionnel.',
      },
    ],
    portfolio: [
      {
        id: 'pf-004',
        imageUrl: '/placeholder-work.jpg',
        title: 'Site vitrine restaurant',
        description: 'Site responsive avec réservation en ligne — démonstration.',
        sortOrder: 0,
        createdAt: '2024-08-10T00:00:00.000Z',
      },
    ],
  },
  {
    id: 'pro-005',
    accountType: 'individual',
    displayName: 'Esther Tossou',
    photoUrl: undefined,
    category: 'Coiffure',
    skills: ['Tresses', 'Extensions', 'Soins capillaires', 'Coupe homme'],
    description:
      'Coiffeuse styliste à Porto-Novo. Spécialisée en tresses africaines et extensions. Données fictives de démonstration.',
    location: {
      city: 'Porto-Novo',
      commune: 'Porto-Novo',
      neighborhood: 'Adjarra',
    },
    phone: '+22994567890',
    whatsapp: '+22994567890',
    rating: 4.6,
    reviewCount: 55,
    joinedAt: '2023-09-05T00:00:00.000Z',
    distanceKm: 8.7,
    availability: {
      timezone: 'Africa/Porto-Novo',
      weeklySlots: scheduleHair,
      manualOverride: null,
      defaultPosture: 'follow_schedule',
    },
    cipNumber: 'CIP-DEMO-005',
    trainingDocuments: [
      {
        id: 'td-005',
        title: 'CAP Coiffure',
        institution: 'Lycée technique de Porto-Novo',
        year: 2015,
        description: 'Document fourni par le professionnel.',
      },
    ],
    portfolio: [
      {
        id: 'pf-005',
        imageUrl: '/placeholder-work.jpg',
        title: 'Tresses Vanilles',
        description: 'Style protecteur pour cheveux naturels — démonstration.',
        sortOrder: 0,
        createdAt: '2024-04-20T00:00:00.000Z',
      },
    ],
  },
  {
    id: 'pro-006',
    accountType: 'business',
    displayName: 'BeniTech Maintenance',
    photoUrl: undefined,
    logoUrl: undefined,
    category: 'Maintenance',
    skills: ['Climatisation', 'Électricité', 'Plomberie', 'Nettoyage'],
    description:
      'Entreprise de maintenance multiservice à Akassato. Interventions pour particuliers et professionnels, 7j/7. Données fictives de démonstration.',
    location: {
      city: 'Abomey-Calavi',
      commune: 'Akassato',
      neighborhood: 'Kpakpamè',
    },
    phone: '+22993111223',
    whatsapp: '+22993111223',
    rating: 4.4,
    reviewCount: 89,
    joinedAt: '2022-12-01T00:00:00.000Z',
    distanceKm: 5.8,
    availability: {
      timezone: 'Africa/Porto-Novo',
      weeklySlots: scheduleMaintenance,
      manualOverride: 'on',
      defaultPosture: 'available_now',
    },
    businessDetails: {
      businessName: 'BeniTech Maintenance',
      legalName: 'BeniTech SARL',
      contactName: 'Direction commerciale',
      sector: 'Services de maintenance',
    },
    trainingDocuments: [
      {
        id: 'td-006',
        title: 'Agrément technique multiservice',
        institution: 'Ministère de l\'industrie',
        year: 2021,
        description: 'Document fourni par l\'entreprise.',
      },
    ],
    portfolio: [
      {
        id: 'pf-006',
        imageUrl: '/placeholder-work.jpg',
        title: 'Installation climatisation bureau',
        description: 'Projet pour entreprise locale — démonstration.',
        sortOrder: 0,
        createdAt: '2024-07-05T00:00:00.000Z',
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
