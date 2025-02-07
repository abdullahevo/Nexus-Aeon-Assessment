import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Pagination from '../common/Pagination.vue';

describe('Pagination', () => {
  it('renders correct page numbers', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 3,
        totalPages: 10,
        maxVisiblePages: 5
      }
    });

    expect(wrapper.text()).toContain('1');
    expect(wrapper.text()).toContain('...');
    expect(wrapper.text()).toContain('10');
  });

  it('disables Previous button on first page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5
      }
    });

    const prevButton = wrapper.find('button:first-child');
    expect(prevButton.attributes('disabled')).toBeDefined();
  });
});
