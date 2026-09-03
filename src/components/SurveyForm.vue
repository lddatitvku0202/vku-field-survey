<script setup lang="ts">
import { computed, ref } from 'vue'
import StepLocation from './StepLocation.vue'
import StepCategory from './StepCategory.vue'
import StepCondition from './StepCondition.vue'
import StepConfirm from './StepConfirm.vue'
import { saveSurvey } from '../db/surveyRepository'
import type { SurveyData, SurveySubmission } from '../types/survey'

const currentStep = ref(1)

const form = ref<SurveyData>({
  building: '',
  floor: 1,
  room: '',
  category: 'Hardware',
  rating: 0,
  notes: '',
})

const totalSteps = 4

const stepTitle = computed(() => {
  const titles = [
    'Vị trí khảo sát',
    'Loại thiết bị',
    'Tình trạng',
    'Xác nhận',
  ]

  return titles[currentStep.value - 1]
})

function nextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

function previousStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function updateLocation(value: {
  building: string
  floor: number
  room: string
}) {
  form.value.building = value.building
  form.value.floor = value.floor
  form.value.room = value.room
}

function updateCondition(value: {
  rating: number
  notes: string
}) {
  form.value.rating = value.rating
  form.value.notes = value.notes
}

async function submitSurvey() {
  const survey: SurveySubmission = {
    ...form.value,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    status: 'PENDING_SYNC',
    retryCount: 0,
  }

  try {
    await saveSurvey(survey)

    alert('Đã ghi nhận khảo sát và lưu thành công trên thiết bị!')

    console.log('Saved survey:', survey)

    currentStep.value = 1

    form.value = {
      building: '',
      floor: 1,
      room: '',
      category: 'Hardware',
      rating: 0,
      notes: '',
    }
  } catch (error) {
    console.error('Cannot save survey:', error)
    alert('Không thể lưu khảo sát. Vui lòng thử lại.')
  }
}
</script>

<template>
  <main class="survey-page">
    <div class="survey-container">
      <header class="page-header">
        <div>
          <p class="eyebrow">VKU FIELD SURVEY</p>
          <h1>Khảo sát cơ sở vật chất</h1>
          <p class="page-description">
            Ghi nhận tình trạng thiết bị tại các phòng học VKU.
          </p>
        </div>

        <span class="offline-badge">
          ● Offline-first
        </span>
      </header>

      <section class="progress-section">
        <div class="progress-info">
          <span>Bước {{ currentStep }} / {{ totalSteps }}</span>
          <strong>{{ stepTitle }}</strong>
        </div>

        <div class="progress-track">
          <div
            class="progress-bar"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
          />
        </div>
      </section>

      <form class="survey-form" @submit.prevent="submitSurvey">
        <StepLocation
  v-if="currentStep === 1"
  :model-value="{
    building: form.building,
    floor: form.floor,
    room: form.room,
  }"
  @update:model-value="updateLocation"
/>

        <StepCategory
            v-else-if="currentStep === 2"
            v-model="form.category"
        />

        <StepCondition
  v-else-if="currentStep === 3"
  :model-value="{
    rating: form.rating,
    notes: form.notes,
  }"
  @update:model-value="updateCondition"
/>

<StepConfirm
  v-else-if="currentStep === 4"
  :model-value="form"
/>

        <section v-else class="step-card">
          <div class="step-heading">
            <span class="step-icon">✅</span>
            <div>
              <h2>Xác nhận khảo sát</h2>
              <p>Kiểm tra thông tin trước khi gửi.</p>
            </div>
          </div>

          <div class="summary-list">
            <div>
              <span>Tòa nhà</span>
              <strong>{{ form.building || 'Chưa nhập' }}</strong>
            </div>

            <div>
              <span>Tầng / Phòng</span>
              <strong>{{ form.floor }} / {{ form.room || 'Chưa nhập' }}</strong>
            </div>

            <div>
              <span>Loại thiết bị</span>
              <strong>{{ form.category }}</strong>
            </div>

            <div>
              <span>Đánh giá</span>
              <strong>{{ form.rating }}/5 sao</strong>
            </div>

            <div>
              <span>Ghi chú</span>
              <strong>{{ form.notes || 'Không có' }}</strong>
            </div>
          </div>
        </section>

        <div class="form-actions">
  <button
    type="button"
    class="secondary-button"
    @click="previousStep"
  >
    ← Quay lại
  </button>

  <button
    v-if="currentStep < totalSteps"
    type="button"
    class="primary-button"
    @click="nextStep"
  >
    Tiếp tục →
  </button>

  <button
    v-else
    type="submit"
    class="primary-button"
  >
    Ghi nhận khảo sát ✓
  </button>
</div>
      </form>
    </div>
  </main>
</template>