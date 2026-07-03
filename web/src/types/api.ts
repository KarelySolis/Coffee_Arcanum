export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface PaginatedMeta {
  total: number;
  page: number;
  page_size: number;
  next: string | null;
  previous: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginatedMeta;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details: string[];
  };
}
