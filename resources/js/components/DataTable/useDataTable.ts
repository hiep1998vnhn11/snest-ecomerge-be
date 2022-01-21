import { useState, useEffect, useRef, useCallback } from 'react'
import { defHttp } from '/@/utils/http'
import { useDebounce } from '/@/hooks/common'
import { PaginationResult } from './types'
export const DEFAULT_LIMIT = 20
export default function useDataTable<T>(url: string, params: any = {}) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [sortType, setSortType] = useState<'asc' | 'desc'>('desc')
  const [sortBy, setSortBy] = useState('created_at')
  const [to, setTo] = useState(0)
  const [from, setFrom] = useState(0)
  const isMounted = useRef(false)
  const fetchData = useCallback(
    async (fetchParams: any = {}) => {
      try {
        setLoading(true)
        if (!('limit' in params)) {
          params.limit = DEFAULT_LIMIT
        } else {
          setLimit(params.limit)
        }
        const response: PaginationResult<T> = await defHttp.get({
          url,
          params: {
            ...params,
            limit,
            search_key: search,
            page,
            sort_by: sortBy,
            sort_type: sortType,
            ...fetchParams,
          },
        })
        setPage(response.current_page)
        setLimit(response.per_page)
        setData(response.data)
        setTotal(response.total)
        setFrom(response.from)
        setTo(response.to)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    },
    [page, search, sortType, sortBy, page, limit]
  )

  useEffect(() => {
    isMounted.current = true
    fetchData()

    return () => {
      isMounted.current = false
      setData([])
    }
  }, [])

  useDebounce(() => fetchData(), 500, [search])
  useEffect(() => {
    if (!isMounted.current) return
    fetchData()
  }, [sortBy, sortType, page, limit])

  return {
    data,
    setData,
    loading,
    error,
    fetchData,
    search,
    setSearch,
    total,
    limit,
    sortType,
    setSortBy,
    sortBy,
    setSortType,
    to,
    from,
    page,
    setLimit,
    setPage,
  }
}
