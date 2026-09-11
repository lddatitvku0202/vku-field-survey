import { getDatabase } from './database'
import type {
  SurveyStatus,
  SurveySubmission,
} from '../types/survey'

export async function saveSurvey(
  survey: SurveySubmission,
) {
  const db = await getDatabase()
  await db.put('surveys', survey)
}

export async function getSurvey(id: string) {
  const db = await getDatabase()
  return db.get('surveys', id)
}

export async function getAllSurveys() {
  const db = await getDatabase()

  return db.getAllFromIndex(
    'surveys',
    'by-timestamp',
  )
}

export async function getSurveysByStatus(
  status: SurveyStatus,
) {
  const db = await getDatabase()

  return db.getAllFromIndex(
    'surveys',
    'by-status',
    status,
  )
}

export async function deleteSurvey(id: string) {
  const db = await getDatabase()
  await db.delete('surveys', id)
}

export async function updateSurveyStatus(
  id: string,
  status: SurveyStatus,
  updates: Partial<SurveySubmission> = {},
) {
  const db = await getDatabase()

  const survey = await db.get(
    'surveys',
    id,
  )

  if (!survey) {
    throw new Error(
      `Survey ${id} not found`,
    )
  }

  if (import.meta.env.DEV) {
    console.debug('[DB] Before update:', survey)
    console.debug('[DB] Updating status:', id, status)
  }

  const updatedSurvey: SurveySubmission = {
    ...survey,
    ...updates,
    status,
  }

  await db.put(
    'surveys',
    updatedSurvey,
  )

  const savedSurvey = await db.get(
    'surveys',
    id,
  )

  if (!savedSurvey || savedSurvey.status !== status) {
    throw new Error(
      `Could not update survey ${id} to ${status}`,
    )
  }

  if (import.meta.env.DEV) {
    console.debug('[DB] After update:', updatedSurvey)
    console.debug('[DB] Read back:', savedSurvey)
  }

  return savedSurvey
}
