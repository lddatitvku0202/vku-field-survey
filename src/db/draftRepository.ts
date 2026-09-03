import { getDatabase } from './database'
import type { SurveyDraft } from '../types/survey'

export async function saveDraft(draft: SurveyDraft) {
  const db = await getDatabase()

  await db.put('drafts', draft)
}

export async function getDraft(id: string) {
  const db = await getDatabase()

  return db.get('drafts', id)
}

export async function deleteDraft(id: string) {
  const db = await getDatabase()

  await db.delete('drafts', id)
}

export async function getAllDrafts() {
  const db = await getDatabase()

  return db.getAllFromIndex('drafts', 'by-updatedAt')
}