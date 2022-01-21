import { EmptyState, Link } from '@shopify/polaris'

const NotFound = () => {
  const handleReload = () => window.location.reload()
  return (
    <EmptyState
      heading="Trang này hiện chưa có nội dung hoặc nội dung đã bị lỗi!"
      action={{ content: 'Thử kết nối lại', onAction: handleReload }}
      secondaryAction={{
        content: 'Learn more',
        url: 'https://help.shopify.com',
      }}
      footerContent={
        <p>
          If you don’t want to add a transfer, you can import your inventory
          from{' '}
          <Link monochrome url="/settings">
            settings
          </Link>
          .
        </p>
      }
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>Track and receive your incoming inventory from suppliers.</p>
    </EmptyState>
  )
}

export default NotFound
