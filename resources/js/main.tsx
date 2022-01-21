import React from 'react'
import ReactDOM from 'react-dom'
import '@shopify/polaris/build/esm/styles.css'
import viTranslations from '@shopify/polaris/locales/vi.json'
import { AppProvider } from '@shopify/polaris'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '/@/hooks/useAuth'
import { AppContextProvider } from '/@/hooks/useApp'
import './assets/scss/global.scss'
const theme = {
  logo: {
    width: 42,
    topBarSource: '/images/logo.svg',
    contextualSaveBarSource: '/images/logo.svg',
    url: '/',
  },
}
ReactDOM.render(
  <React.StrictMode>
    <AppProvider i18n={viTranslations} theme={theme}>
      <BrowserRouter>
        <AppContextProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </AppContextProvider>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('app')
)
