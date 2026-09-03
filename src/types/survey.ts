export type SurveyCategory =
  | 'Hardware'
  | 'Projector'
  | 'AC'
  | 'Electrical'
  | 'Furniture'

export type SurveyStatus = 'PENDING_SYNC' | 'SYNCED' | 'FAILED'

export interface SurveyData {
  building: string
  floor: number
  room: string
  category: SurveyCategory
  rating: number
  notes: string
  photo?: string
}

export interface SurveyDraft extends SurveyData {
  id: string
  updatedAt: number
}

export interface SurveySubmission extends SurveyData {
  id: string
  timestamp: number
  status: SurveyStatus
  retryCount?: number
  lastError?: string
}