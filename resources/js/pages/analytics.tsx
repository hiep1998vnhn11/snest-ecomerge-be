import { Navigation, EmptyState } from '@shopify/polaris'
import { useCallback } from 'react'
import {
  ArrowLeftMinor,
  ConversationMinor,
  HomeMajor,
  OrdersMajor,
  ProductsMajor,
  CustomersMajor,
  AnalyticsMajor,
  SettingsMajor,
  DiscountsMajor,
  AppsMajor,
  MarketingMajor,
  OnlineStoreMajor,
  ViewMinor,
  CirclePlusOutlineMinor,
} from '@shopify/polaris-icons'
const Categories = () => {
  const onAction = useCallback(() => {
    console.log('123123')
  }, [])
  return (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: '/path/to/place',
            label: 'Inactive item',
            icon: HomeMajor,
          },
          {
            url: '/path/to/place',
            label: 'Item with indicator',
            icon: HomeMajor,
            subNavigationItems: [
              {
                url: '/path/to/place/index',
                disabled: false,
                new: true,
                label: 'New item',
              },
            ],
          },
          {
            url: '/path/to/place',
            label: 'External link item',
            icon: HomeMajor,
            external: true,
          },
          {
            url: '/path/to/place',
            label: 'New item',
            new: true,
            icon: HomeMajor,
          },
          {
            url: '/path/to/place',
            label: 'Badged item',
            badge: 'Old',
            icon: HomeMajor,
          },
          {
            url: '/path/to/place',
            label: 'Active with secondary action',
            icon: OrdersMajor,
            selected: true,
            secondaryAction: {
              url: '/admin/orders/add',
              accessibilityLabel: 'Add an order',
              icon: CirclePlusOutlineMinor,
            },
          },
          {
            url: '/admin/products',
            label: 'Active item with sub navigation',
            icon: ProductsMajor,
            selected: true,
            subNavigationItems: [
              {
                url: '/admin/products',
                disabled: false,
                selected: true,
                label: 'Selected sub item',
              },
              {
                url: '/admin/products/transfers',
                disabled: false,
                label: 'Default sub item',
              },
              {
                url: '/admin/products/inventory',
                disabled: true,
                label: 'Disabled sub item',
              },
            ],
          },
          {
            url: '/path/to/place',
            label: 'Disabled item',
            icon: CustomersMajor,
            disabled: true,
          },
          {
            url: '/path/to/place',
            label: 'Overflow item',
            icon: MarketingMajor,
          },
        ]}
        rollup={{
          after: 7,
          view: 'view',
          hide: 'hide',
          activePath: '/',
        }}
      />
      <Navigation.Section
        title="These icons should have the same color"
        items={[
          {
            url: '/path/to/place',
            label: 'Icon as svg',
            icon: OnlineStoreMajor,
          },
          {
            url: '/path/to/place',
            label: 'Icon as img',
            icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1.791 2.253l-.597 3.583A1 1 0 0 0 2.18 7h.893a1.5 1.5 0 0 0 1.342-.83L5 5l.585 1.17A1.5 1.5 0 0 0 6.927 7h1.146a1.5 1.5 0 0 0 1.342-.83L10 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h1.146a1.5 1.5 0 0 0 1.342-.83L15 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h.893a1 1 0 0 0 .986-1.164l-.597-3.583A1.5 1.5 0 0 0 16.729 1H3.271a1.5 1.5 0 0 0-1.48 1.253zM4 18.5A1.5 1.5 0 0 1 5.5 17H8v-3h4v3h2.5a1.5 1.5 0 0 1 1.5 1.5v.5H4v-.5z"></path><path d="M2 9h2v4h12V9h2v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 13.5V9z"></path></svg>',
          },
          {
            url: '/path/to/place',
            label: 'Other secondary action',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M2.771 14.055A8 8 0 1 1 16 8c0 2.385-1.086 4.629-2.704 5.983A7.956 7.956 0 0 1 7.991 16c-.613 0-2.022-.003-5-.01h-.928l.708-1.935zm5.973-6.757c-.554-.302-.837-.565-.837-.92 0-.446.4-.735 1.017-.735a3.62 3.62 0 0 1 1.365.302l.502-1.577S10.328 4 8.963 4C7.057 4 5.73 5.117 5.73 6.68c0 .894.618 1.565 1.442 2.05.67.382.901.658.901 1.065 0 .42-.334.762-.952.762-.915 0-1.79-.486-1.79-.486l-.54 1.577s.797.552 2.15.552c1.956 0 3.373-.986 3.373-2.76-.013-.959-.721-1.642-1.571-2.142z"/></svg>',
            secondaryAction: {
              url: '/path/to/place/view',
              accessibilityLabel: 'View your online store',
              icon: ViewMinor,
            },
          },
        ]}
        action={{
          accessibilityLabel: 'Add sales channel',
          icon: CirclePlusOutlineMinor,
          onClick: () => {},
        }}
        separator
      />
    </Navigation>
  )
}

export default Categories
