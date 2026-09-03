import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { SurveyDraft, SurveySubmission } from '../types/survey'

interface SurveyDatabase extends DBSchema {
  drafts: {
    key: string
    value: SurveyDraft
    indexes: {
      'by-updatedAt': number
    }
  }

  surveys: {
    key: string
    value: SurveySubmission
    indexes: {
      'by-status': string
      'by-timestamp': number
    }
  }
}

let databasePromise: Promise<IDBPDatabase<SurveyDatabase>> | null = null

export function getDatabase() {
  if (!databasePromise) {
    databasePromise = openDB<SurveyDatabase>('vku-field-survey-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('drafts')) {
          const drafts = db.createObjectStore('drafts', {
            keyPath: 'id',
          })

          drafts.createIndex('by-updatedAt', 'updatedAt')
        }

        if (!db.objectStoreNames.contains('surveys')) {
          const surveys = db.createObjectStore('surveys', {
            keyPath: 'id',
          })

          surveys.createIndex('by-status', 'status')
          surveys.createIndex('by-timestamp', 'timestamp')
        }
      },
    })
  }

  return databasePromise
}