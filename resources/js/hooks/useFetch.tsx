import { useState, useEffect } from 'react'

export function useFetch<T>(api: () => Promise<T[]>) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
}
