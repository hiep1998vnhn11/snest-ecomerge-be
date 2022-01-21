import React, { useCallback, useState } from 'react'
import {
  Card,
  Filters,
  IndexTable,
  Select,
  TextField,
  TextStyle,
} from '@shopify/polaris'
import useDataTable from './useDataTable'
import type { CategoryModel } from '/@/api/models/categoryModel'
import { formatDate } from '/@/utils/format'
import { useIndexResourceState } from '/@/components/DataTable/useResourceState'
import { useNavigate } from 'react-router-dom'
function IndexTableWithAllElement() {
  const navigate = useNavigate()
  const { data, search, setSearch, total, loading } =
    useDataTable<CategoryModel>('/admin/category')
  const resourceName = {
    singular: 'danh mục',
    plural: 'các danh mục',
  }

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data)

  const [taggedWith, setTaggedWith] = useState('')
  const [queryValue, setQueryValue] = useState('')
  const [sortValue, setSortValue] = useState('today')

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  )
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), [])
  const handleQueryValueRemove = useCallback(() => setSearch(''), [])
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove()
    handleQueryValueRemove()
  }, [handleQueryValueRemove, handleTaggedWithRemove])
  const handleSortChange = useCallback((value) => setSortValue(value), [])

  const promotedBulkActions = [
    {
      content: 'Sửa danh mục',
      onAction: () => navigate('/admin/category/edit'),
    },
    {
      content: 'Xoá danh mục đã chọn',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
  ]
  const bulkActions = [
    {
      content: 'Xoá danh mục đã chọn',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
  ]

  const filters = [
    {
      key: 'taggedWith',
      label: 'Được gắn thẻ',
      filter: (
        <TextField
          label="thẻ"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ]

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: 'taggedWith',
          label: disambiguateLabel('taggedWith', taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : []

  const sortOptions = [
    { label: 'Tên', value: 'name' },
    { label: 'Trạng thái', value: 'is_active' },
    { label: 'Ngày tạo', value: 'created_at' },
  ]

  const rowMarkup = data.map(
    (
      {
        id,
        name,
        slug,
        description,
        parent_id,
        is_active,
        image,
        created_at,
        updated_at,
      },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{slug}</IndexTable.Cell>
        <IndexTable.Cell>{image}</IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell>{parent_id}</IndexTable.Cell>
        <IndexTable.Cell>
          {is_active ? 'Hoạt động' : 'Ngừng hoạt động'}
        </IndexTable.Cell>
        <IndexTable.Cell>{formatDate(created_at)}</IndexTable.Cell>
        <IndexTable.Cell>{formatDate(updated_at)}</IndexTable.Cell>
      </IndexTable.Row>
    )
  )

  return (
    <Card>
      <div style={{ padding: '16px', display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Filters
            queryValue={search}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={setSearch}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
          />
        </div>
        <div style={{ paddingLeft: '0.4rem' }}>
          <Select
            labelInline
            label="Sắp xếp"
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <IndexTable
        loading={loading}
        resourceName={resourceName}
        itemCount={total}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        hasMoreItems
        promotedBulkActions={promotedBulkActions}
        headings={[
          { title: 'Tên' },
          { title: 'Slug' },
          { title: 'Ảnh' },
          { title: 'Mô tả ngắn', hidden: false },
          { title: 'Danh mục cha' },
          { title: 'Trạng thái' },
          { title: 'Ngày tạo' },
          { title: 'Ngày cập nhật' },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  )

  function disambiguateLabel(key: string, value: string) {
    switch (key) {
      case 'taggedWith':
        return `Tagged with ${value}`
      default:
        return value
    }
  }

  function isEmpty(value: any) {
    if (Array.isArray(value)) {
      return value.length === 0
    } else {
      return value === '' || value == null
    }
  }
}

export default IndexTableWithAllElement
