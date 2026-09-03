<script setup lang="ts">
import type { SurveyData } from '../types/survey'

defineProps<{
  modelValue: SurveyData
}>()
</script>

<template>
  <section class="step-card">
    <div class="step-heading">
      <span class="step-icon">✅</span>

      <div>
        <h2>Xác nhận khảo sát</h2>
        <p>Kiểm tra lại thông tin trước khi ghi nhận.</p>
      </div>
    </div>

    <div class="summary-list">
      <div>
        <span>Tòa nhà</span>
        <strong>{{ modelValue.building || 'Chưa chọn' }}</strong>
      </div>

      <div>
        <span>Tầng</span>
        <strong>{{ modelValue.floor }}</strong>
      </div>

      <div>
        <span>Phòng</span>
        <strong>{{ modelValue.room || 'Chưa nhập' }}</strong>
      </div>

      <div>
        <span>Loại thiết bị</span>
        <strong>{{ modelValue.category }}</strong>
      </div>

      <div>
        <span>Mức đánh giá</span>
        <strong>{{ modelValue.rating }}/5</strong>
      </div>

      <div>
        <span>Ghi chú</span>
        <strong>{{ modelValue.notes || 'Không có ghi chú' }}</strong>
      </div>
    </div>

    <div class="confirm-note">
      <span>💾</span>
      <p>
        Dữ liệu sẽ được lưu trên thiết bị và vẫn có thể sử dụng khi không có
        Internet.
      </p>
    </div>
  </section>
</template>