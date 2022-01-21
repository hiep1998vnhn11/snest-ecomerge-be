import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react'
import { Toast, Frame, Loading } from '@shopify/polaris'
interface AppContextType {
  toastError: (error: string) => void
  toastSuccess: (message: string) => void
  loading: boolean
  toggleLoading: (loading?: any) => void
}

const AppContext = createContext<AppContextType>({} as AppContextType)

// Export the provider as we need to wrap the entire app with it
export function AppContextProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const message = useRef('')
  const isToastError = useRef(false)
  const [activeToast, setActiveToast] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const toggleActive = useCallback(
    () => setActiveToast((active) => !active),
    []
  )
  const toggleLoading = useCallback((loading?: any) => {
    if (typeof loading === 'boolean') {
      setLoading(loading)
    } else {
      setLoading((loading) => !loading)
    }
  }, [])

  const toastMarkup = useMemo(() => {
    if (!activeToast) return null
    return (
      <Toast
        content={message.current}
        onDismiss={toggleActive}
        error={isToastError.current}
      />
    )
  }, [activeToast])

  const toastError = useCallback((error: string) => {
    message.current = error
    isToastError.current = true
    toggleActive()
  }, [])

  const toastSuccess = useCallback((msg: string) => {
    message.current = msg
    isToastError.current = false
    toggleActive()
  }, [])

  const memoValue = useMemo(
    () => ({
      toastError,
      toastSuccess,
      toggleLoading,
      loading,
    }),
    [loading]
  )

  const loadingMarkup = useMemo(() => {
    if (!loading) return null
    return <Loading />
  }, [loading])

  return (
    <AppContext.Provider value={memoValue}>
      <Frame>
        {loadingMarkup}
        {children}
        {toastMarkup}
      </Frame>
    </AppContext.Provider>
  )
}

export default function useApp() {
  return useContext(AppContext)
}
