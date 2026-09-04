<script setup lang="ts">
import { ref } from 'vue'
import SurveyForm from './components/SurveyForm.vue'
import SurveyList from './components/SurveyList.vue'

const surveyList = ref<InstanceType<typeof SurveyList> | null>(null)

function handleSurveySaved() {
  surveyList.value?.loadSurveys()
}
</script>

<template>
  <main class="survey-page">
    <div class="survey-container">
      <SurveyForm @saved="handleSurveySaved" />

      <SurveyList ref="surveyList" />
    </div>
  </main>
</template>