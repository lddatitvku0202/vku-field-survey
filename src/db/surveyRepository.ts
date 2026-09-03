import { getDatabase } from './database'
import type { SurveyStatus, SurveySubmission } from '../types/survey'

export async function saveSurvey(survey: SurveySubmission) {
  const db = await getDatabase()
  await db.put('surveys', survey)
}

export async function getSurvey(id: string) {
  const db = await getDatabase()
  return db.get('surveys', id)
}

export async function getAllSurveys() {
  const db = await getDatabase()
  return db.getAllFromIndex('surveys', 'by-timestamp')
}

export async function getSurveysByStatus(status: SurveyStatus) {
  const db = await getDatabase()
  return db.getAllFromIndex('surveys', 'by-status', status)
}

export async function deleteSurvey(id: string) {
  const db = await getDatabase()
  await db.delete('surveys', id)
}