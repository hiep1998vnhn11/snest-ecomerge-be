import {
  Card,
  Page,
  Checkbox,
  FormLayout,
  TextField,
  Button,
  Modal,
  InlineError,
} from '@shopify/polaris'
import { useCallback, useState, useRef, createRef } from 'react'
import { AddMajor } from '@shopify/polaris-icons'
import DataTable from '../../components/DataTable/IndexTable'
import { useNavigate } from 'react-router-dom'
import { slugify } from '/@/utils/stringUtils'
import { createCategory } from '/@/api/category'
import useAppContext from '/@/hooks/useApp'

type State = {
  name: string
  slug: string
  description: string
  image: string
  meta: string
  metaDefault: string
  isActive: boolean
}
const Categories = () => {
  const navigate = useNavigate()
  const { toastError, toastSuccess } = useAppContext()
  const [modalActive, setModalActive] = useState(false)

  const state = useRef<State>({
    name: '',
    slug: '',
    description: '',
    image: '',
    meta: '',
    metaDefault: `<meta name="description" content="Hãy sửa đoạn này để mô tả ngắn về danh mục sản phẩm này" />
<meta name="robots" content="none" />
`,
    isActive: true,
  })
  const [name, setName] = useState(state.current.name)
  const [slug, setSlug] = useState(state.current.slug)
  const [description, setDescription] = useState(state.current.description)
  const [meta, setMeta] = useState(state.current.meta)
  const [isActive, setIsActive] = useState(state.current.isActive)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleModalActive = useCallback(() => {
    setModalActive(!modalActive)
  }, [modalActive])
  const handleNameChange = useCallback((value) => {
    setName(value)
  }, [])
  const handleSlugChange = useCallback((value) => {
    setSlug(value)
  }, [])
  const handleDescriptionChange = useCallback((value) => {
    setDescription(value)
  }, [])
  const handleMetaChange = useCallback((value) => {
    setMeta(value)
  }, [])
  const handleIsActiveChange = useCallback((value) => {
    setIsActive(value)
  }, [])

  const clearState = useCallback(() => {
    setName('')
    setSlug('')
    setDescription('')
    setMeta('')
    setIsActive(true)
    state.current = {
      name: '',
      slug: '',
      description: '',
      image: '',
      meta: '',
      metaDefault: `<meta name="description" content="Hãy sửa đoạn này để mô tả ngắn về danh mục sản phẩm này" />
  <meta name="robots" content="none" />
  `,
      isActive: true,
    }
  }, [])
  const handleSave = useCallback(() => {
    setError('')
    state.current.description = description
    state.current.name = name
    state.current.slug = slug
    state.current.meta = meta
    state.current.isActive = isActive
    handleActionCategory(state.current)
  }, [description, name, slug, meta, isActive])
  const handleActionCategory = useCallback(async (params: any) => {
    try {
      setLoading(true)
      Object.keys(params).forEach((key: string) => {
        if (params[key] === '') {
          delete params[key]
        }
      })
      await createCategory(params)
      toastSuccess('Tạo mới danh mục sản phẩm thành công!')
      clearState()
      toggleModalActive()
    } catch (err: any) {
      const errors = err.data.errors
      setError(errors[Object.keys(errors)[0]][0])
    } finally {
      setLoading(false)
    }
  }, [])
  const primaryAction = (
    <Button onClick={toggleModalActive} primary icon={AddMajor}>
      Tạo danh mục mới
    </Button>
  )

  const modalEditMarkup = () => (
    <Modal
      large
      open={modalActive}
      onClose={toggleModalActive}
      title="Cập nhật phiếu voucher"
      primaryAction={{
        content: 'Tạo mới',
        onAction: handleSave,
        loading: loading,
      }}
      secondaryActions={[
        {
          content: 'Đóng',
          onAction: toggleModalActive,
        },
      ]}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Tên danh mục sản phẩm"
            requiredIndicator
            value={name}
            onChange={handleNameChange}
            autoComplete="category"
            error={!name && 'Tên danh mục sản phẩm không được để trống'}
            helpText="Tên danh mục sản phẩm sẽ được hiển thị trên trang chủ"
          />
          <TextField
            label="Slug"
            requiredIndicator
            value={slug}
            onChange={handleSlugChange}
            autoComplete="category-slug"
            placeholder="Nhập slug"
            error={!slug && 'Slug không được để trống'}
            labelAction={{
              content: 'Tạo tự động',
              onAction: () => setSlug(slugify(name)),
            }}
          />
          <TextField
            label="Meta"
            value={meta}
            onChange={handleMetaChange}
            autoComplete="category-meta"
            placeholder="Nhập meta"
            multiline={4}
            labelAction={{
              content: 'Tạo meta mẫu',
              onAction: () => setMeta(state.current.metaDefault),
            }}
          />
          <TextField
            label="Mô tả"
            value={description}
            onChange={handleDescriptionChange}
            autoComplete="category-description"
            multiline={4}
            helpText="Mô tả sẽ được hiển thị trên trang danh mục sản phẩm"
          />
          <Checkbox
            label="Kích hoạt"
            checked={isActive}
            onChange={handleIsActiveChange}
          />
        </FormLayout>
        {!!error ? <InlineError message={error} fieldID="myFieldID" /> : null}
      </Modal.Section>
    </Modal>
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
      <DataTable />
      {modalEditMarkup()}
    </Page>
  )
}

export default Categories
