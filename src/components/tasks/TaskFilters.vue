<script setup lang="ts">
import { computed } from 'vue';
import type { TaskFilters } from '@/types/task';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();

const sortOptions = [
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' }
] as const;

const directionOptions = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' }
] as const;
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow mb-4">
    <div class="flex flex-wrap gap-4">
      <!-- Search Input -->
      <div class="flex-1 min-w-[200px]">
        <input
          v-model="taskStore.searchQuery"
          type="text"
          placeholder="Search tasks..."
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <!-- Sort Field Select -->
      <div class="w-40">
        <select
          v-model="taskStore.sortField"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            Sort by {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Sort Direction Select -->
      <div class="w-40">
        <select
          v-model="taskStore.sortDirection"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option v-for="option in directionOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
