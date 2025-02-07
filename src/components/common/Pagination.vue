<script setup lang="ts">
interface Props {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  showEdges?: boolean;
}

interface Emits {
  (e: 'page-change', page: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5,
  showEdges: true
});

const emit = defineEmits<Emits>();

const getPageNumbers = () => {
  const pageNumbers: (number | string)[] = [];
  const halfVisible = Math.floor(props.maxVisiblePages / 2);
  let startPage = Math.max(1, props.currentPage - halfVisible);
  let endPage = Math.min(props.totalPages, startPage + props.maxVisiblePages - 1);

  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < props.maxVisiblePages) {
    startPage = Math.max(1, endPage - props.maxVisiblePages + 1);
  }

  // Add first page and ellipsis if needed
  if (props.showEdges && startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) pageNumbers.push('...');
  }

  // Add visible page numbers
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Add last page and ellipsis if needed
  if (props.showEdges && endPage < props.totalPages) {
    if (endPage < props.totalPages - 1) pageNumbers.push('...');
    pageNumbers.push(props.totalPages);
  }

  return pageNumbers;
};

const handlePageClick = (page: number | string) => {
  if (typeof page === 'number' && page !== props.currentPage) {
    emit('page-change', page);
  }
};

const goToPrevious = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1);
  }
};

const goToNext = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1);
  }
};
</script>

<template>
  <nav aria-label="Pagination" class="flex justify-center items-center space-x-2">
    <!-- Previous button -->
    <button
      @click="goToPrevious"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded-md border"
      :class="[
        currentPage === 1
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      ]"
    >
      Previous
    </button>

    <!-- Page numbers -->
    <div class="flex space-x-1">
      <button
        v-for="page in getPageNumbers()"
        :key="page"
        @click="handlePageClick(page)"
        :disabled="page === '...'"
        class="px-3 py-1 rounded-md"
        :class="[
          page === currentPage
            ? 'bg-blue-500 text-white'
            : page === '...'
            ? 'cursor-default'
            : 'bg-white text-gray-700 hover:bg-gray-50 border'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next button -->
    <button
      @click="goToNext"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded-md border"
      :class="[
        currentPage === totalPages
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      ]"
    >
      Next
    </button>
  </nav>
</template>
