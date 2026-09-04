<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | undefined]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const preview = ref(props.modelValue)

function openCamera() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    return
  }

  if (!file.type.startsWith('image/')) {
    alert('Vui lòng chọn một file hình ảnh.')
    return
  }

  const maxSize = 5 * 1024 * 1024

  if (file.size > maxSize) {
    alert('Ảnh không được vượt quá 5MB.')
    return
  }

  const reader = new FileReader()

  reader.onload = () => {
    const result = reader.result

    if (typeof result !== 'string') {
      return
    }

    preview.value = result
    emit('update:modelValue', result)
  }

  reader.onerror = () => {
    alert('Không thể đọc ảnh. Vui lòng thử lại.')
  }

  reader.readAsDataURL(file)
}

function removePhoto() {
  preview.value = undefined
  emit('update:modelValue', undefined)

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<template>
  <section class="photo-capture">
    <div class="photo-header">
      <div>
        <h3>Ảnh hiện trạng</h3>
        <p>Chụp ảnh thiết bị hoặc phòng học để lưu cùng khảo sát.</p>
      </div>

      <span class="photo-optional">Không bắt buộc</span>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="photo-input"
      @change="handleFileChange"
    />

    <div v-if="preview" class="photo-preview-wrapper">
      <img
        :src="preview"
        alt="Ảnh hiện trạng đã chụp"
        class="photo-preview"
      />

      <button
        type="button"
        class="photo-remove"
        @click="removePhoto"
      >
        Xóa ảnh
      </button>
    </div>

    <button
      v-else
      type="button"
      class="photo-button"
      @click="openCamera"
    >
      <span class="photo-icon">📷</span>
      <span>Chụp ảnh hoặc chọn ảnh</span>
    </button>
  </section>
</template>

<style scoped>
.photo-capture {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border: 1px solid #dbe3ef;
  border-radius: 16px;
  background: #f8fafc;
}

.photo-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.photo-header h3 {
  margin: 0;
  color: #172033;
  font-size: 16px;
}

.photo-header p {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.5;
}

.photo-optional {
  flex-shrink: 0;
  color: #64748b;
  font-size: 12px;
}

.photo-input {
  display: none;
}

.photo-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-height: 110px;
  border: 2px dashed #93c5fd;
  border-radius: 14px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.photo-button:hover {
  background: #dbeafe;
}

.photo-icon {
  font-size: 28px;
}

.photo-preview-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.photo-preview {
  width: 100%;
  max-height: 280px;
  object-fit: contain;
  border-radius: 12px;
  background: #e2e8f0;
}

.photo-remove {
  align-self: flex-start;
  padding: 8px 14px;
  border: 0;
  border-radius: 8px;
  background: #fee2e2;
  color: #b91c1c;
  font-weight: 600;
  cursor: pointer;
}
</style>