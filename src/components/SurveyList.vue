<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { deleteSurvey, getAllSurveys } from '../db/surveyRepository'
import type { SurveySubmission } from '../types/survey'

const surveys = ref<SurveySubmission[]>([])
const loading = ref(false)

async function loadSurveys() {
  loading.value = true

  try {
    surveys.value = await getAllSurveys()
  } catch (error) {
    console.error('Cannot load surveys:', error)
  } finally {
    loading.value = false
  }
}

defineExpose({
  loadSurveys,
})

async function removeSurvey(id: string) {
  const confirmed = window.confirm(
    'Bạn có chắc muốn xóa khảo sát này không?',
  )

  if (!confirmed) {
    return
  }

  try {
    await deleteSurvey(id)
    await loadSurveys()
  } catch (error) {
    console.error('Cannot delete survey:', error)
    alert('Không thể xóa khảo sát. Vui lòng thử lại.')
  }
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp))
}

onMounted(loadSurveys)

</script>

<template>
  <section class="survey-list-card">
    <div class="survey-list-header">
      <div>
        <p class="section-eyebrow">LOCAL STORAGE</p>
        <h2>Khảo sát đã lưu</h2>
        <p class="section-description">
          Các khảo sát đang được lưu trên thiết bị này.
        </p>
      </div>

      <span class="survey-count">
        {{ surveys.length }} bản ghi
      </span>
    </div>

    <div v-if="loading" class="empty-survey">
      Đang tải dữ liệu...
    </div>

    <div v-else-if="surveys.length === 0" class="empty-survey">
      <span class="empty-icon">📋</span>
      <strong>Chưa có khảo sát nào</strong>
      <p>Những khảo sát bạn ghi nhận sẽ xuất hiện ở đây.</p>
    </div>

    <div v-else class="survey-items">
      <article
        v-for="survey in surveys"
        :key="survey.id"
        class="survey-item"
      >
        <div class="survey-item-main">
          <div class="survey-item-title">
            <strong>
              Tòa {{ survey.building }} · Phòng {{ survey.room }}
            </strong>

            <span class="status-badge">
              {{ survey.status === 'PENDING_SYNC' ? 'Chờ đồng bộ' : survey.status }}
            </span>
          </div>

          <p class="survey-item-meta">
            Tầng {{ survey.floor }} · {{ survey.category }}
          </p>

          <p class="survey-item-rating">
            Đánh giá: <strong>{{ survey.rating }}/5</strong>
          </p>

          <p v-if="survey.notes" class="survey-item-notes">
            {{ survey.notes }}
          </p>

          <small class="survey-item-date">
            {{ formatDate(survey.timestamp) }}
          </small>
        </div>

        <button
          type="button"
          class="delete-button"
          @click="removeSurvey(survey.id)"
        >
          Xóa
        </button>
      </article>
    </div>
  </section>
</template>