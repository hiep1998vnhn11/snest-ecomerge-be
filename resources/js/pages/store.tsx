import { Card, EmptyState } from '@shopify/polaris'
import { useCallback } from 'react'
const Categories = () => {
  const onAction = useCallback(() => {
    console.log('123123')
  }, [])
  return (
    <Card sectioned>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{ content: 'Add transfer', onAction }}
        secondaryAction={{
          content: 'Learn more',
          onAction,
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Track and receive your incoming inventory from suppliers.</p>
      </EmptyState>
    </Card>
  )
}

export default Categories
