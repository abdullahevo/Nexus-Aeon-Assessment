<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  loading?: boolean;
  error?: Error | null;
  loadingFallback?: string;
  errorFallback?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  loadingFallback: 'Loading...',
  errorFallback: 'Something went wrong. Please try again.'
});

const emit = defineEmits<{
  retry: []
}>();
</script>

<template>
  <div>
    <div v-if="loading" class="p-4 text-center text-gray-600">
      {{ loadingFallback }}
    </div>

    <div
      v-else-if="error"
      class="p-4 bg-red-50 border border-red-200 rounded-lg"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <h3 class="text-lg font-medium text-red-800">Error</h3>
          <div class="mt-2 text-sm text-red-700">
            {{ error.message || errorFallback }}
          </div>
        </div>
        <button
          @click="emit('retry')"
          class="ml-4 text-red-600 hover:text-red-800"
        >
          Retry
        </button>
      </div>
    </div>

    <slot v-else></slot>
  </div>
</template>
