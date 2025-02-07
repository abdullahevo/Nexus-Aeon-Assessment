import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TaskList from '../tasks/TaskList.vue';
import { createTestingPinia } from '@pinia/testing';

describe('TaskList', () => {
  const mockTasks = [
    {
      id: '1',
      title: 'Test Task',
      description: 'Description',
      priority: 'High',
      dueDate: new Date(),
      completed: false,
      createdAt: new Date()
    }
  ];

  it('renders tasks correctly', () => {
    const wrapper = mount(TaskList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            tasks: { tasks: mockTasks }
          }
        })]
      }
    });

    expect(wrapper.text()).toContain('Test Task');
    expect(wrapper.text()).toContain('High');
  });


     wrapper.find('input[type="checkbox"]').trigger('change');

    const store = useTaskStore();
    expect(store.updateTask).toHaveBeenCalledWith('1', { completed: true });
  });
});
