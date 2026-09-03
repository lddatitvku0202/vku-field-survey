<script setup lang="ts">
import type { SurveyData } from '../types/survey'

type ConditionData = Pick<SurveyData, 'rating' | 'notes'>

const props = defineProps<{
  modelValue: ConditionData
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ConditionData): void
}>()

function updateField(field: 'rating' | 'notes', value: string | number) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  })
}

const ratingOptions = [
  {
    value: 1,
    label: 'Rất kém',
    description: 'Thiết bị hỏng hoặc không thể sử dụng',
  },
  {
    value: 2,
    label: 'Kém',
    description: 'Hoạt động không ổn định',
  },
  {
    value: 3,
    label: 'Trung bình',
    description: 'Có thể sử dụng nhưng cần theo dõi',
  },
  {
    value: 4,
    label: 'Tốt',
    description: 'Hoạt động bình thường',
  },
  {
    value: 5,
    label: 'Rất tốt',
    description: 'Hoạt động tốt, không có lỗi',
  },
]
</script>

<template>
  <section class="step-card">
    <div class="step-heading">
      <span class="step-icon">⭐</span>

      <div>
        <h2>Đánh giá tình trạng</h2>
        <p>Chọn mức độ hoạt động của thiết bị.</p>
      </div>
    </div>

    <div class="rating-options">
      <button
        v-for="option in ratingOptions"
        :key="option.value"
        type="button"
        class="rating-option"
        :class="{ selected: modelValue.rating === option.value }"
        @click="updateField('rating', option.value)"
      >
        <span class="rating-number">{{ option.value }}</span>

        <span class="rating-content">
          <strong>{{ option.label }}</strong>
          <small>{{ option.description }}</small>
        </span>

        <span
          v-if="modelValue.rating === option.value"
          class="rating-check"
        >
          ✓
        </span>
      </button>
    </div>

    <div class="form-group">
      <label for="notes">Ghi chú lỗi</label>

      <textarea
        id="notes"
        rows="5"
        :value="modelValue.notes"
        placeholder="Mô tả tình trạng thiết bị, lỗi gặp phải hoặc đề xuất sửa chữa..."
        @input="
          updateField(
            'notes',
            ($event.target as HTMLTextAreaElement).value,
          )
        "
      />
    </div>
  </section>
</template>