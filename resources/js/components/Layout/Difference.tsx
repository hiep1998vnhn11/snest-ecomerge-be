import React from 'react'
import { Card, Layout } from '@shopify/polaris'

const Difference = () => {
  return (
    <Layout>
      <Layout.Section>
        <Card title="Order details" sectioned>
          <p>View a summary of your order.</p>
        </Card>
        <Card title="Tags" sectioned>
          <p>Add tags to your order.</p>
        </Card>
        <Card title="Tags" sectioned>
          <p>Add tags to your order.</p>
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card title="Tags" sectioned>
          <p>Add tags to your order.</p>
        </Card>
        <Card title="Tags" sectioned>
          <p>Add tags to your order.</p>
        </Card>
        <Card title="Tags" sectioned>
          <p>Add tags to your order.</p>
        </Card>
      </Layout.Section>
    </Layout>
  )
}
export default Difference
