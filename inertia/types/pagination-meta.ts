export type PaginationMeta = {
  currentPage: number
  firstPage: number
  firstPageUrl: string
  lastPage: number
  lastPageUrl: string
  nextPageUrl: string
  perPage: number
  total: number
}

export type PaginationProps = {
  page: number
  limit: number
  orderBy: string
}
