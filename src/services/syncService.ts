import {
  getSurveysByStatus,
  updateSurveyStatus,
} from '../db/surveyRepository'

import { createSurvey } from './api'

let syncPromise: Promise<void> | null = null

export function syncPendingSurveys() {
  if (syncPromise) {
    return syncPromise
  }

  if (!navigator.onLine) {
    return Promise.resolve()
  }

  syncPromise = syncAllPendingSurveys().finally(() => {
    syncPromise = null
  })

  return syncPromise
}

async function syncAllPendingSurveys() {
  const pendingSurveys =
    await getSurveysByStatus('PENDING_SYNC')

  console.log(
    `Found ${pendingSurveys.length} pending survey(s)`,
  )

  for (const survey of pendingSurveys) {
    try {
      console.log(
        `Syncing survey ${survey.id}...`,
      )

      await createSurvey(survey)

      await updateSurveyStatus(
        survey.id,
        'SYNCED',
        {
          lastError: undefined,
        },
      )

      console.log(
        `Survey ${survey.id} synced successfully`,
      )
    } catch (error) {
      console.error(
        `Failed to sync survey ${survey.id}:`,
        error,
      )

      await updateSurveyStatus(
        survey.id,
        'PENDING_SYNC',
        {
          retryCount:
            (survey.retryCount ?? 0) + 1,
          lastError:
            error instanceof Error
              ? error.message
              : 'Unknown sync error',
        },
      )
    }
  }
}
