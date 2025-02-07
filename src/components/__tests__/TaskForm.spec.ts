import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TaskForm from '../tasks/TaskForm.vue';
import { createTestingPinia } from '@pinia/testing';
import { useTaskStore } from '@/stores/taskStore';

describe('TaskForm', () => {
  it('validates required fields', async () => {
    const wrapper = mount(TaskForm, {
      global: {
        plugins: [createTestingPinia()]
      }
    });

    await wrapper.find('form').trigger('submit');

    expect(wrapper.text()).toContain('Title is required');
    expect(wrapper.text()).toContain('Due date is required');
  });

  it('submits form with valid data', async () => {
    const wrapper = mount(TaskForm, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn
        })]
      }
    });

    await wrapper.find('input[type="text"]').setValue('Test Task');
    await wrapper.find('textarea').setValue('Test Description');
    await wrapper.find('select').setValue('High');
    await wrapper.find('input[type="date"]').setValue('2025-12-31');
    await wrapper.find('form').trigger('submit');

    const store = useTaskStore();
    expect(store.addTask).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
      priority: 'High',
      dueDate: '2025-12-31'
    });
  });
});
