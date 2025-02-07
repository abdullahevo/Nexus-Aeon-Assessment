<script setup lang="ts">
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskForm from '@/components/tasks/TaskForm.vue';
import TaskList from '@/components/tasks/TaskList.vue';
import TaskFilters from '@/components/tasks/TaskFilters.vue';
import Pagination from '@/components/common/Pagination.vue';
import ErrorBoundary from '@/components/common/ErrorBoundary.vue';
import AsyncErrorBoundary from '@/components/common/AsyncErrorBoundary.vue';

const taskStore = useTaskStore();

onMounted(async () => {
  await taskStore.fetchTasks();
});
</script>


<template>
  <ErrorBoundary>
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Task Management</h1>

        <TaskForm class="mb-8" />
        <TaskFilters class="mb-6" />

        <AsyncErrorBoundary
          :loading="taskStore.loading"
          :error="taskStore.error"
          @retry="taskStore.fetchTasks"
        >
          <TaskList />
          <Pagination
            :current-page="taskStore.currentPage"
            :total-pages="taskStore.totalPages"
            @page-change="page => taskStore.currentPage = page"
            class="mt-6"
          />
        </AsyncErrorBoundary>
      </div>
    </div>
  </ErrorBoundary>
</template>
