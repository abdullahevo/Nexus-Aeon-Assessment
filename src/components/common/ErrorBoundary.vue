<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

interface Props {
  fallback?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fallback: 'Something went wrong. Please try again later.'
});

const error = ref<Error | null>(null);

onErrorCaptured((err: Error) => {
  error.value = err;
  return false; // Prevent error from propagating
});

const resetError = () => {
  error.value = null;
};
</script>

<template>
  <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <h3 class="text-lg font-medium text-red-800">Error</h3>
        <div class="mt-2 text-sm text-red-700">
          {{ error.message || fallback }}
        </div>
      </div>
      <button
        @click="resetError"
        class="ml-4 text-red-600 hover:text-red-800"
      >
        Try Again
      </button>
    </div>
  </div>
  <slot v-else></slot>
</template>
