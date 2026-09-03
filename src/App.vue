<script setup lang="ts">
import SurveyForm from './components/SurveyForm.vue'
import SurveyList from './components/SurveyList.vue'
</script>

<template>
  <main class="survey-page">
    <div class="survey-container">
      <SurveyForm />

      <SurveyList />
    </div>
  </main>
</template>