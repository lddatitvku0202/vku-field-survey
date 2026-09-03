<script setup lang="ts">
import type { SurveyData } from '../types/survey'

type LocationData = Pick<SurveyData, 'building' | 'floor' | 'room'>

const props = defineProps<{
  modelValue: LocationData
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: LocationData): void
}>()

function updateField(
  field: 'building' | 'floor' | 'room',
  value: string | number,
) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  })
}
</script>

<template>
  <section class="step-card">
    <div class="step-heading">
      <span class="step-icon">📍</span>

      <div>
        <h2>Vị trí khảo sát</h2>
        <p>Nhập thông tin khu vực cần kiểm tra.</p>
      </div>
    </div>

    <div class="form-group">
      <label for="building">Tòa nhà</label>

      <select
        id="building"
        :value="modelValue.building"
        @change="
          updateField(
            'building',
            ($event.target as HTMLSelectElement).value,
          )
        "
      >
        <option value="" disabled>Chọn tòa nhà</option>
        <option value="A">Tòa A</option>
        <option value="B">Tòa B</option>
        <option value="C">Tòa C</option>
        <option value="D">Tòa D</option>
      </select>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="floor">Tầng</label>

        <input
          id="floor"
          type="number"
          min="1"
          max="20"
          :value="modelValue.floor"
          @input="
            updateField(
              'floor',
              Number(($event.target as HTMLInputElement).value),
            )
          "
        />
      </div>

      <div class="form-group">
        <label for="room">Phòng</label>

        <input
          id="room"
          type="text"
          placeholder="Ví dụ: 204"
          :value="modelValue.room"
          @input="
            updateField(
              'room',
              ($event.target as HTMLInputElement).value,
            )
          "
        />
      </div>
    </div>
  </section>
</template>