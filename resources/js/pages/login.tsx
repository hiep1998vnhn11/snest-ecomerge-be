import { useState, useCallback } from 'react'
import {
  FormLayout,
  TextField,
  Button,
  Frame,
  Page,
  Layout,
  Card,
} from '@shopify/polaris'
import useAuth from '/@/hooks/useAuth'
import useApp from '../hooks/useApp'

const Login = () => {
  const { login } = useAuth()
  const { loading } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onLogin = () => login(email, password)
  const handleChangeEmail = useCallback((value) => setEmail(value), [])
  const handleChangePassword = useCallback((value) => setPassword(value), [])
  return (
    <Page title="Đăng nhập">
      <Layout>
        <Layout.AnnotatedSection
          title="Chào mừng đến với Shopify"
          description="Hãy đăng nhập để tiếp tục sửa dụng các tính năng của Shopify"
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Tài khoản"
                autoComplete="username"
                onChange={handleChangeEmail}
                value={email}
              />
              <TextField
                autoComplete="password"
                type="password"
                label="Mật khẩu"
                onChange={handleChangePassword}
                value={password}
              />
              <Button onClick={onLogin} loading={loading}>
                Đăng nhập
              </Button>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  )
}

export default Login
