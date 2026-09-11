import type { SurveySubmission } from '../types/survey'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000'

export async function createSurvey(
  survey: SurveySubmission,
) {
  const response = await fetch(
    `${API_BASE_URL}/api/surveys`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: survey.id,
        building: survey.building,
        floor: survey.floor,
        room: survey.room,
        category: survey.category,
        rating: survey.rating,
        notes: survey.notes,
        photo: survey.photo ?? null,
        timestamp: survey.timestamp,
      }),
    },
  )

  if (!response.ok) {
    throw new Error(
      `API error: ${response.status}`,
    )
  }

  return response.json()
}