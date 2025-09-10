import { type FilterStructure } from "@/lib/filter-columns"
import type { JoinOperator } from "@/types/data-table";

export type BenchmarkSearch = {
  page?: number
  from?: number
  to?: number
  apply?: boolean
}

export type GeneralSearchWithPagination = {
  page?: number
  from?: number
  to?: number
  apply?: boolean
  filters?: FilterStructure[]
  joinOperator?: JoinOperator
  applyFilters?: boolean
}

export type GeneralSearch = {
  from?: number
  to?: number
  apply?: boolean
}