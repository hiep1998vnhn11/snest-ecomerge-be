import { Layout, Banner, Card, FormLayout, TextField } from '@shopify/polaris'
const BannerLayout = () => {
  return (
    <Layout>
      <Layout.Section>
        <Banner title="Order archived" onDismiss={() => {}}>
          <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
        </Banner>
      </Layout.Section>
      <Layout.AnnotatedSection
        id="storeDetails"
        title="Store details"
        description="Shopify and your customers will use this information to contact you."
      >
        <Card sectioned>
          <FormLayout>
            <TextField
              label="Store name"
              onChange={() => {}}
              autoComplete="off"
            />
            <TextField
              type="email"
              label="Account email"
              onChange={() => {}}
              autoComplete="email"
            />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
    </Layout>
  )
}

export default BannerLayout
