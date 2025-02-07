<!-- src/components/tasks/TaskForm.vue -->
<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { TaskFormData, FormErrors, Priority } from '@/types/task';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();

const initialFormState: TaskFormData = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: ''
};

const formData = reactive<TaskFormData>({ ...initialFormState });
const errors = ref<FormErrors>({});

const priorities: Priority[] = ['Low', 'Medium', 'High'];

const validateForm = (): boolean => {
  errors.value = {};

  if (!formData.title.trim()) {
    errors.value.title = 'Title is required';
  }

  if (!formData.dueDate) {
    errors.value.dueDate = 'Due date is required';
  } else {
    const selectedDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.value.dueDate = 'Due date cannot be in the past';
    }
  }

  return Object.keys(errors.value).length === 0;
};

const resetForm = (): void => {
  Object.assign(formData, initialFormState);
  errors.value = {};
};

const handleSubmit = async (): Promise<void> => {
  if (validateForm()) {
    try {
      await taskStore.addTask(formData);
      resetForm();
    } catch (error) {
      errors.value.submit = (error as Error).message;
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md">
    <div class="space-y-4">
      <!-- Title Input -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.title }"
        />
        <p v-if="errors.title" class="mt-1 text-sm text-red-600">
          {{ errors.title }}
        </p>
      </div>

      <!-- Description Input -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <!-- Priority Select -->
      <div>
        <label for="priority" class="block text-sm font-medium text-gray-700">
          Priority *
        </label>
        <select
          id="priority"
          v-model="formData.priority"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option v-for="priority in priorities" :key="priority" :value="priority">
            {{ priority }}
          </option>
        </select>
      </div>

      <!-- Due Date Input -->
      <div>
        <label for="dueDate" class="block text-sm font-medium text-gray-700">
          Due Date *
        </label>
        <input
          id="dueDate"
          v-model="formData.dueDate"
          type="date"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.dueDate }"
        />
        <p v-if="errors.dueDate" class="mt-1 text-sm text-red-600">
          {{ errors.dueDate }}
        </p>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Task
        </button>
      </div>
    </div>
  </form>
</template>
