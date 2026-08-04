<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const storageKey = 'f4-python-classroom-mode'
const isClassroomMode = ref(false)

function applyMode(enabled: boolean) {
  isClassroomMode.value = enabled
  document.documentElement.classList.toggle('classroom-mode', enabled)
  localStorage.setItem(storageKey, enabled ? 'on' : 'off')
}

function toggleMode() {
  applyMode(!isClassroomMode.value)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isClassroomMode.value) {
    applyMode(false)
  }
}

onMounted(() => {
  applyMode(localStorage.getItem(storageKey) === 'on')
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.classList.remove('classroom-mode')
})
</script>

<template>
  <div class="classroom-controls" aria-label="閱讀版面控制">
    <button
      class="classroom-controls__toggle"
      type="button"
      :aria-pressed="isClassroomMode"
      @click="toggleMode"
    >
      <span aria-hidden="true">{{ isClassroomMode ? '☰' : '▣' }}</span>
      {{ isClassroomMode ? '顯示導覽' : '上課投影' }}
    </button>
    <span v-if="isClassroomMode" class="classroom-controls__hint">按 Esc 也可返回</span>
  </div>
</template>
