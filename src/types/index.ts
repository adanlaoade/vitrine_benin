export type AccountType = 'individual' | 'business'

export type AvailabilityStatus =
  | 'available_now'
  | 'available_by_schedule'
  | 'closed_by_schedule'
  | 'unavailable'

export type ManualOverride = 'on' | 'off' | null

export type DefaultPosture = 'available_now' | 'follow_schedule'

export type ServiceRequestStatus = 'draft' | 'submitted' | 'viewed' | 'closed'

export interface WeeklySlot {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6
  start: string
  end: string
  enabled: boolean
}

export interface AvailabilitySchedule {
  timezone: 'Africa/Porto-Novo'
  weeklySlots: WeeklySlot[]
  manualOverride: ManualOverride
  defaultPosture: DefaultPosture
  updatedAt?: string
}

export interface Location {
  city: string
  commune?: string
  district?: string
  neighborhood?: string
  latitude?: number
  longitude?: number
}

export interface BusinessDetails {
  businessName: string
  legalName?: string
  contactName?: string
  sector?: string
  legalIdentifiers?: string
}

export interface PortfolioItem {
  id: string
  imageUrl: string
  title: string
  description?: string
  sortOrder: number
  createdAt: string
}

export interface TrainingDocument {
  id: string
  title: string
  institution?: string
  year?: number
  documentUrl?: string
  description?: string
}

export interface Professional {
  id: string
  accountType: AccountType
  displayName: string
  photoUrl?: string
  logoUrl?: string
  category: string
  skills: string[]
  description: string
  location: Location
  phone: string
  whatsapp: string
  rating: number
  reviewCount: number
  joinedAt: string
  availability: AvailabilitySchedule
  businessDetails?: BusinessDetails
  portfolio?: PortfolioItem[]
  trainingDocuments?: TrainingDocument[]
  /** Private field — never exposed in public views */
  cipNumber?: string
  distanceKm?: number
}

export interface AuthSession {
  userId: string
  displayName: string
  email: string
  avatarUrl?: string
  isMock: true
}

export interface FavoriteItem {
  id: string
  userId: string
  professionalId: string
  createdAt: string
}

export interface ProDashboardStats {
  professionalId: string
  profileViews: number
  phoneClicks: number
  whatsappClicks: number
  favoritesReceived: number
  requestsReceived: number
}

export interface ServiceRequest {
  id: string
  requesterId?: string
  description: string
  location?: string
  status: ServiceRequestStatus
  createdAt: string
}

export interface SearchIntent {
  rawQuery: string
  service?: string
  category?: string
  location?: string
  availability?: AvailabilityStatus
  confidence?: number
  editable: boolean
  source: 'text' | 'voice'
}

export interface RepositoryResult<T> {
  ok: true
  data: T
}

export interface RepositoryError {
  ok: false
  error: string
}

export type RepositoryResponse<T> = RepositoryResult<T> | RepositoryError
