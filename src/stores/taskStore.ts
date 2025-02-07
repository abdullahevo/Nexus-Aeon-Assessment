import { defineStore } from 'pinia';
import { taskService } from '@/firebase/taskService';
import type { Task, TaskFormData, TasksState } from '@/types/task';

export const useTaskStore = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [],
    loading: false,
    error: null,
    sortField: 'dueDate',
    sortDirection: 'asc',
    searchQuery: '',
    currentPage: 1,
    tasksPerPage: 5
  }),

  getters: {
    sortedAndFilteredTasks(): Task[] {
      let filtered = [...this.tasks];

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(task =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        if (this.sortField === 'priority') {
          const priorityOrder = { Low: 1, Medium: 2, High: 3 };
          return this.sortDirection === 'asc'
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority];
        }

        return this.sortDirection === 'asc'
          ? a[this.sortField] > b[this.sortField] ? 1 : -1
          : a[this.sortField] < b[this.sortField] ? 1 : -1;
      });

      return filtered;
    },

    paginatedTasks(): Task[] {
      const start = (this.currentPage - 1) * this.tasksPerPage;
      const end = start + this.tasksPerPage;
      return this.sortedAndFilteredTasks.slice(start, end);
    },

    totalPages(): number {
      return Math.ceil(this.sortedAndFilteredTasks.length / this.tasksPerPage);
    }
  },

  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      try {
        this.tasks = await taskService.getTasks();
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async addTask(taskData: TaskFormData) {
      this.loading = true;
      this.error = null;
      try {
        await taskService.addTask(taskData);
        await this.fetchTasks();
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async updateTask(taskId: string, updates: Partial<Task>) {
      this.loading = true;
      this.error = null;
      try {
        await taskService.updateTask(taskId, updates);
        await this.fetchTasks();
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async deleteTask(taskId: string) {
      this.loading = true;
      this.error = null;
      try {
        await taskService.deleteTask(taskId);
        await this.fetchTasks();
      } catch (error) {
        this.error = (error as Error).message;
      } finally {
        this.loading = false;
      }
    }
  }
});
