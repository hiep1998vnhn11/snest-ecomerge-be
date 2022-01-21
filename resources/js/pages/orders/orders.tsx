import LayoutTwoCard from '/@/components/Layout/TwoCard'
import LayoutThreeCard from '/@/components/Layout/ThreeCard'
import LayoutDifference from '/@/components/Layout/Difference'
import LayoutBanner from '/@/components/Layout/Banner'
import { Page, MediaCard, VideoThumbnail } from '@shopify/polaris'
const Orders = () => {
  return (
    <Page
      title="Danh mục sản phẩm"
      secondaryActions={[
        { content: 'Duplicate', url: '#' },
        { content: 'View on your store', url: '#' },
      ]}
    >
      <MediaCard
        portrait
        title="Turn your side-project into a business"
        primaryAction={{
          content: 'Learn more',
          onAction: () => {},
        }}
        description="In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business."
        popoverActions={[{ content: 'Dismiss', onAction: () => {} }]}
      >
        <VideoThumbnail
          videoLength={80}
          thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
          onClick={() => {}}
        />
      </MediaCard>
      <LayoutBanner />
      <LayoutDifference />
      <LayoutTwoCard />
      <LayoutThreeCard />
    </Page>
  )
}

export default Orders
