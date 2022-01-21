import useAuth from '../hooks/useAuth'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { TopBar, ActionList, Frame, Navigation } from '@shopify/polaris'
import { useState, useRef, useCallback } from 'react'
import {
  ConversationMinor,
  HomeMajor,
  OrdersMajor,
  ProductsMajor,
  CustomersMajor,
  AnalyticsMajor,
  SettingsMajor,
  DiscountsMajor,
  MarketingMajor,
  CategoriesMajor,
} from '@shopify/polaris-icons'

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  if (!user) return <Navigate to="/login" state={{ from: location }} />
  const skipToContentRef = useRef<any>()
  const [searchActive, setSearchActive] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [userMenuActive, setUserMenuActive] = useState(false)
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false)
  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false)
    setSearchValue('')
  }, [])
  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value)
    setSearchActive(value.length > 0)
  }, [])
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  )
  const toggleMobileNavigationActive = useCallback(
    () => setMobileNavigationActive((value) => !value),
    []
  )
  const userMenuActions = [
    {
      items: [{ content: 'Community forums' }],
    },
  ]
  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={user.name}
      detail="Phụ tùng Hải Trung"
      initials={user.name.charAt(0)}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  )
  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  )
  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: 'Shopify help center' },
        { content: 'Community forums' },
      ]}
    />
  )
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  )
  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        title="Phụ tùng Hải Trung"
        items={[
          {
            label: 'Home',
            icon: HomeMajor,
            onClick: () => navigate('/'),
            selected: location.pathname === '/',
            subNavigationItems: [
              {
                label: 'Orders',
                url: '/orders',
              },
            ],
          },
          {
            label: 'Danh mục sản phẩm',
            icon: CategoriesMajor,
            onClick: () => navigate('/categories'),
            selected: location.pathname === '/categories',
          },
          {
            label: 'Orders',
            icon: OrdersMajor,
            onClick: () => navigate('/orders'),
            selected: location.pathname === '/orders',
          },
          {
            label: 'Products',
            icon: ProductsMajor,
            onClick: () => navigate('/products'),
            selected: location.pathname === '/products',
          },
          {
            label: 'Customers',
            icon: CustomersMajor,
            onClick: () => navigate('/customers'),
            selected: location.pathname === '/customers',
          },
          {
            label: 'Analytics',
            icon: AnalyticsMajor,
            onClick: () => navigate('/analytics'),
            selected: location.pathname === '/analytics',
          },
          {
            label: 'Marketing',
            icon: MarketingMajor,
            onClick: () => navigate('/marketing'),
            selected: location.pathname === '/marketing',
          },
          {
            label: 'Discounts',
            icon: DiscountsMajor,
            onClick: () => navigate('/discounts'),
            selected: location.pathname === '/discounts',
          },
          {
            label: 'Cài đặt',
            icon: SettingsMajor,
            onClick: () => navigate('/apps'),
            selected: location.pathname === '/apps',
          },
        ]}
        action={{
          icon: ConversationMinor,
          accessibilityLabel: 'Contact support',
          onClick: () => {},
        }}
      />
    </Navigation>
  )

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
      skipToContentTarget={skipToContentRef.current}
    >
      {children}
    </Frame>
  )
}

export default RequireAuth
