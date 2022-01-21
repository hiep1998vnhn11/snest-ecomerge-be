import React, { useCallback, useRef, useState, useMemo } from 'react'
import {
  Card,
  ContextualSaveBar,
  FormLayout,
  Layout,
  Modal,
  Page,
  InlineError,
  TextField,
  Toast,
  Checkbox,
} from '@shopify/polaris'
import { useLocation, useNavigate } from 'react-router-dom'
import { createCategory } from '/@/api/category'
type State = {
  name: string
  slug: string
  description: string
  image: string
  meta: string
  metaDefault: string
  isActive: boolean
}
const CreateOrEditCategories = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const isCreate = useMemo(
    () => location.pathname.includes('create'),
    [location]
  )
  const state = useRef<State>({
    name: '',
    slug: '',
    description: '',
    image: '',
    meta: '',
    metaDefault: `<meta name="description" content="Hãy sửa đoạn này để mô tả ngắn về danh mục sản phẩm này" />
<meta name="robots" content="none" />
`,
    isActive: false,
  })
  const skipToContentRef = useRef<any>()
  const [toastActive, setToastActive] = useState(false)
  const [toastError, setToastError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [modalActive, setModalActive] = useState(false)

  const [name, setName] = useState(state.current.name)
  const [slug, setSlug] = useState(state.current.slug)
  const [description, setDescription] = useState(state.current.description)
  const [meta, setMeta] = useState(state.current.meta)
  const [isActive, setIsActive] = useState(state.current.isActive)

  const [supportSubject, setSupportSubject] = useState('')
  const [supportMessage, setSupportMessage] = useState('')

  const handleSubjectChange = useCallback(
    (value) => setSupportSubject(value),
    []
  )
  const handleMessageChange = useCallback(
    (value) => setSupportMessage(value),
    []
  )
  const handleDiscard = useCallback(() => {
    setName(state.current.name)
    setSlug(state.current.slug)
    setDescription(state.current.description)
    setMeta(state.current.meta)
    setIsActive(state.current.isActive)
    setIsDirty(false)
  }, [])

  const handleSave = useCallback(() => {
    setIsDirty(false)

    state.current.description = description
    state.current.name = name
    state.current.slug = slug
    state.current.meta = meta
    state.current.isActive = isActive
    handleActionCategory(state.current)
  }, [description, name, slug, meta, isActive])
  const handleActionCategory = async (params: any) => {
    try {
      setIsLoading(true)
      Object.keys(params).forEach((key: string) => {
        if (params[key] === '') {
          delete params[key]
        }
      })
      await createCategory(params)
      setToastActive(true)
    } catch (err: any) {
      const errors = err.data.errors
      setError(errors[Object.keys(errors)[0]][0])
    } finally {
      setIsLoading(false)
    }
  }
  const handleNameChange = useCallback((value) => {
    setName(value)
    value && setIsDirty(true)
  }, [])
  const handleSlugChange = useCallback((value) => {
    setSlug(value)
    value && setIsDirty(true)
  }, [])
  const handleDescriptionChange = useCallback((value) => {
    setDescription(value)
    value && setIsDirty(true)
  }, [])
  const handleMetaChange = useCallback((value) => {
    setMeta(value)
    value && setIsDirty(true)
  }, [])
  const handleIsActiveChange = useCallback((value) => {
    setIsActive(value)
    value && setIsDirty(true)
  }, [])
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  )
  const toggleToastError = useCallback(
    () => setToastError((toastActive) => !toastActive),
    []
  )
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    []
  )

  const toastMarkup = toastActive ? (
    <Toast
      onDismiss={toggleToastActive}
      content={
        isCreate
          ? 'Tạo mới danh mục sản phẩm thành công'
          : 'Sửa danh mục sản phẩm thành công'
      }
      duration={5000}
      action={{
        content: 'Hoàn tác',
        onAction: toggleToastActive,
      }}
    />
  ) : null

  const toastErrorMarkup = toastError ? (
    <Toast
      onDismiss={toggleToastError}
      content="Có lỗi xảy ra, vui lòng thử lại sau"
      duration={2000}
    />
  ) : null

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Thay đổi chưa được lưu"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null

  const skipToContentTarget = (
    <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
  )

  const slugify = (str: string) => {
    const a =
      'ọếỗỹồầệãảàáâäæãåāăąçćčđďẻèéẽêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b =
      'oeoyoaeaaaaaaaaaaaacccddeeeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return str
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  const actualPageMarkup = (
    <Page
      title={(isCreate ? 'Thêm mới' : 'Sửa') + ' danh mục sản phẩm'}
      breadcrumbs={[
        {
          content: 'Danh mục sản phẩm',
          onAction: () => navigate('/categories'),
        },
      ]}
    >
      <Layout>
        {skipToContentTarget}
        <Layout.AnnotatedSection
          title="Hướng dẫn danh mục sản phẩm"
          description="Chú ý tạo danh mục sản phẩm cùng với slug và meta sẽ giúp ích cho việc SEO được tốt hơn!"
        >
          <Card
            sectioned
            primaryFooterAction={{
              content: isCreate ? 'Thêm mới' : 'Sửa',
              onAction: handleSave,
              loading: isLoading,
            }}
            secondaryFooterActions={[
              {
                content: 'Hoàn tác',
                onAction: handleDiscard,
              },
            ]}
          >
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
            {!!error ? (
              <InlineError message={error} fieldID="myFieldID" />
            ) : null}
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  )

  // const loadingPageMarkup = (
  //   <SkeletonPage>
  //     <Layout>
  //       <Layout.Section>
  //         <Card sectioned>
  //           <TextContainer>
  //             <SkeletonDisplayText size="small" />
  //             <SkeletonBodyText lines={9} />
  //           </TextContainer>
  //         </Card>
  //       </Layout.Section>
  //     </Layout>
  //   </SkeletonPage>
  // )

  const modalMarkup = (
    <Modal
      open={modalActive}
      onClose={toggleModalActive}
      title="Contact support"
      primaryAction={{
        content: 'Send',
        onAction: toggleModalActive,
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Subject"
            value={supportSubject}
            onChange={setSupportSubject}
            autoComplete="off"
          />
          <TextField
            label="Message"
            value={supportMessage}
            onChange={handleMessageChange}
            autoComplete="off"
            multiline
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  )

  return (
    <>
      {contextualSaveBarMarkup}
      {actualPageMarkup}
      {toastMarkup}
      {modalMarkup}
      {toastErrorMarkup}
    </>
  )
}

export default CreateOrEditCategories
