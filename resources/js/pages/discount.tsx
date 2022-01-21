import { Card, EmptyState, Link } from '@shopify/polaris'
import { useCallback, useEffect, useRef, createRef } from 'react'
import PageLoading from '/@/components/PageLoading'
import NotFound from '/@/components/NotFound'
import useEditor from '/@/hooks/useEditor'
const Categories = () => {
  const editorRef = useRef<any>()
  const { error, loading, data } = useEditor(editorRef, '')
  if (error) return <NotFound />
  // if (loading) return <PageLoading />
  return (
    <Card sectioned>
      23
      <div ref={editorRef} />
      {loading && <PageLoading />}
    </Card>
  )
}

export default Categories
