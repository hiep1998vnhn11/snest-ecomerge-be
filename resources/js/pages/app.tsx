import {
  Card,
  Page,
  Layout,
  FormLayout,
  TextField,
  Button,
} from '@shopify/polaris'
import { useCallback, useState, useRef, createRef } from 'react'
import { AddMajor } from '@shopify/polaris-icons'
import DataTable from '/@/components/DataTable'
import { useNavigate } from 'react-router-dom'
const Categories = () => {
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  const onAction = useCallback(() => {
    setCount((oldCount) => oldCount + 1)
  }, [])
  const handleCreate = useCallback(() => {
    navigate('/categories/create')
  }, [])
  const primaryAction = (
    <Button onClick={handleCreate} primary icon={AddMajor}>
      Tạo danh mục mới
    </Button>
  )
  return (
    <Page
      title="Danh mục sản phẩm"
      primaryAction={primaryAction}
      secondaryActions={[
        { content: 'Duplicate', url: '#' },
        { content: 'View on your store', url: '#' },
      ]}
    >
      <Card sectioned>
        <DataTable />
      </Card>
    </Page>
  )
}

export default Categories
