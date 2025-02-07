export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  showEdges?: boolean;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}
