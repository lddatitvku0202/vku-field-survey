<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import SurveyForm from './components/SurveyForm.vue'
import SurveyList from './components/SurveyList.vue'
import { syncPendingSurveys } from './services/syncService'

const surveyList = ref<InstanceType<typeof SurveyList> | null>(null)

async function refreshAndSync() {
  await syncPendingSurveys()
  await surveyList.value?.loadSurveys()
}

async function handleSurveySaved() {
  await refreshAndSync()
}

async function handleOnline() {
  console.log('Network restored. Starting sync...')

  await refreshAndSync()

  console.log('Sync completed and survey list refreshed.')
}

onMounted(() => {
  window.addEventListener('online', handleOnline)

  if (navigator.onLine) {
    refreshAndSync()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('online', handleOnline)
})
</script>

<template>
  <main class="survey-page">
    <div class="survey-container">
      <SurveyForm @saved="handleSurveySaved" />

      <SurveyList ref="surveyList" />
    </div>
  </main>
</template>