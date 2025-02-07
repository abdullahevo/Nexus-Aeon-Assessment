<script setup lang="ts">
import { computed } from 'vue';
import type { Task, TaskStatus } from '@/types/task';
import { useTaskStore } from '@/stores/taskStore';
import { format } from 'date-fns';

const taskStore = useTaskStore();

const getTaskStatus = (task: Task): TaskStatus => {
  if (task.completed) {
    return {
      label: 'Completed',
      class: 'bg-green-100 text-green-800'
    };
  }

  if (task.dueDate < new Date() && !task.completed) {
    return {
      label: 'Overdue',
      class: 'bg-red-100 text-red-800'
    };
  }

  return {
    label: 'Pending',
    class: 'bg-yellow-100 text-yellow-800'
  };
};

const getPriorityClass = (priority: Task['priority']): string => {
  const classes = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
  };
  return classes[priority];
};

const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

const handleDelete = async (taskId: string): Promise<void> => {
  if (confirm('Are you sure you want to delete this task?')) {
    await taskStore.deleteTask(taskId);
  }
};

const handleToggleComplete = async (task: Task): Promise<void> => {
  console.log("🚀 ~ handleToggleComplete ~ task:", task)
  await taskStore.updateTask(task.id!, { completed: !task.completed , dueDate: task.dueDate });
};
</script>

<template>
 <div class="bg-white rounded-lg shadow overflow-hidden">
  <!-- Make the table scrollable on small screens -->
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <!-- Table Headers -->
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Task
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Priority
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Due Date
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="task in taskStore.paginatedTasks" :key="task.id"
            :class="{ 'bg-gray-50': task.completed }">
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getTaskStatus(task).class">
              {{ getTaskStatus(task).label }}
            </span>
          </td>

          <td class="px-6 py-4">
            <div :class="{ 'line-through': task.completed }">
              <div class="text-sm font-medium text-gray-900">{{ task.title }}</div>
              <div class="text-sm text-gray-500">{{ task.description }}</div>
            </div>
          </td>

          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getPriorityClass(task.priority)">
              {{ task.priority }}
            </span>
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatDate(task.dueDate) }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div class="flex space-x-3">
              <button @click="handleToggleComplete(task)"
                      class="text-blue-600 hover:text-blue-900">
                {{ task.completed ? 'Uncomplete' : 'Complete' }}
              </button>
              <button @click="handleDelete(task.id!)"
                      class="text-red-600 hover:text-red-900">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</template>
