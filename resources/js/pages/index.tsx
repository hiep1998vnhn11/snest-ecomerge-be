import React, { useCallback, useRef, useState, useEffect } from 'react'
import {
  AppProvider,
  ActionList,
  Avatar,
  Card,
  ContextualSaveBar,
  FormLayout,
  Layout,
  Loading,
  Modal,
  Navigation,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  TextField,
  Toast,
  Button,
} from '@shopify/polaris'
const App = () => {
  const defaultState = useRef({
    emailFieldValue: 'dharma@jadedpixel.com',
    nameFieldValue: 'Jaded Pixel',
  })
  const skipToContentRef = useRef<any>()
  const [toastActive, setToastActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue
  )
  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue
  )
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue
  )
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
    setEmailFieldValue(defaultState.current.emailFieldValue)
    setNameFieldValue(defaultState.current.nameFieldValue)
    setIsDirty(false)
  }, [])
  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue
    defaultState.current.emailFieldValue = emailFieldValue

    setIsDirty(false)
    setToastActive(true)
    setStoreName(defaultState.current.nameFieldValue)
  }, [emailFieldValue, nameFieldValue])
  const handleNameFieldChange = useCallback((value) => {
    setNameFieldValue(value)
    value && setIsDirty(true)
  }, [])
  const handleEmailFieldChange = useCallback((value) => {
    setEmailFieldValue(value)
    value && setIsDirty(true)
  }, [])
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  )
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    []
  )

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
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

  const actualPageMarkup = (
    <Page title="Account">
      <Layout>
        {skipToContentTarget}
        <Layout.AnnotatedSection
          title="Account details"
          description="Jaded Pixel will use this as your account information."
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Full name"
                value={nameFieldValue}
                onChange={handleNameFieldChange}
                autoComplete="name"
              />
              <TextField
                type="email"
                label="Email"
                value={emailFieldValue}
                onChange={handleEmailFieldChange}
                autoComplete="email"
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  )

  const loadingPageMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  )

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup

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
      {pageMarkup}
      {toastMarkup}
      {modalMarkup}
    </>
  )
}

export default App
