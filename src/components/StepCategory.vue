<script setup lang="ts">
import type { SurveyCategory } from '../types/survey'

defineProps<{
  modelValue: SurveyCategory
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: SurveyCategory): void
}>()

const categories: {
  value: SurveyCategory
  label: string
  description: string
  icon: string
}[] = [
  {
    value: 'Hardware',
    label: 'Máy tính',
    description: 'Máy tính, màn hình và thiết bị IT',
    icon: '💻',
  },
  {
    value: 'Projector',
    label: 'Máy chiếu',
    description: 'Máy chiếu và thiết bị trình chiếu',
    icon: '📽️',
  },
  {
    value: 'AC',
    label: 'Điều hòa',
    description: 'Điều hòa và hệ thống làm mát',
    icon: '❄️',
  },
  {
    value: 'Electrical',
    label: 'Điện',
    description: 'Ổ cắm, đèn và thiết bị điện',
    icon: '⚡',
  },
  {
    value: 'Furniture',
    label: 'Nội thất',
    description: 'Bàn, ghế và vật dụng trong phòng',
    icon: '🪑',
  },
]
</script>

<template>
  <section class="step-card">
    <div class="step-heading">
      <span class="step-icon">🛠️</span>

      <div>
        <h2>Loại thiết bị</h2>
        <p>Chọn nhóm cơ sở vật chất cần khảo sát.</p>
      </div>
    </div>

    <div class="category-grid">
      <button
        v-for="category in categories"
        :key="category.value"
        type="button"
        class="category-button"
        :class="{ selected: modelValue === category.value }"
        @click="emit('update:modelValue', category.value)"
      >
        <span class="category-icon">{{ category.icon }}</span>

        <span class="category-content">
          <strong>{{ category.label }}</strong>
          <small>{{ category.description }}</small>
        </span>

        <span
          v-if="modelValue === category.value"
          class="category-check"
        >
          ✓
        </span>
      </button>
    </div>
  </section>
</template>