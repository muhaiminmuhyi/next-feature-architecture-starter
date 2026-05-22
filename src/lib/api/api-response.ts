export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface ListFilters {
  page: number
  limit: number
  search: string
  sortBy: string
  sortOrder: "asc" | "desc"
}
