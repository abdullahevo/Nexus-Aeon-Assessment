export interface Task {
  id?: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
}

export type Priority = 'Low' | 'Medium' | 'High';

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

export interface FormErrors {
  title?: string;
  description?: string;
  priority?: string;
  dueDate?: string;
}

export interface TaskFilters {
  sortField: 'dueDate' | 'priority';
  sortDirection: 'asc' | 'desc';
  searchQuery: string;
}

export interface TaskStatus {
  label: string;
  class: string;
}
