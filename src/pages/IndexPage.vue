<script setup lang="ts">
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskForm from '@/components/tasks/TaskForm.vue';
import TaskList from '@/components/tasks/TaskList.vue';
import TaskFilters from '@/components/tasks/TaskFilters.vue';
import Pagination from '@/components/common/Pagination.vue';

const taskStore = useTaskStore();

onMounted(async () => {
  await taskStore.fetchTasks();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Task Management</h1>

      <TaskForm class="mb-8" />

      <TaskFilters class="mb-6" />

      <div v-if="taskStore.loading" class="text-center py-4">
        Loading...
      </div>

      <div v-else-if="taskStore.error" class="text-red-500 text-center py-4">
        {{ taskStore.error }}
      </div>

      <template v-else>
        <TaskList />

        <Pagination
          :current-page="taskStore.currentPage"
          :total-pages="taskStore.totalPages"
          @page-change="page => taskStore.currentPage = page"
          class="mt-6"
        />
      </template>
    </div>
  </div>
</template>
