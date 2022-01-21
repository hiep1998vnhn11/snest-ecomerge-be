import {
  Routes,
  Route,
  RouteProps,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom'

import Index from './pages/index'
import Login from './pages/login'
import Products from './pages/products'
import Analytics from './pages/analytics'
import AppPage from './pages/app'
import Customers from './pages/customers'
import Categories from './pages/categories/categories'
import Store from './pages/store'
import Discount from './pages/discount'
import Orders from './pages/orders/orders'

import CategoriesCreate from './pages/categories/createOrEdit'
import useAuth from '/@/hooks/useAuth'
import RequireAuth from '/@/container/Auth'
function RequireGuest({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const location = useLocation()
  if (user) return <Navigate to="/" state={{ from: location }} />
  return children
}
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <RequireGuest>
              <Login />
            </RequireGuest>
          }
        ></Route>
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Routes>
                <Route path="/test" element={<Index />}></Route>
                <Route path="/" element={<Index />}></Route>
                <Route path="/users" element={<Index />}></Route>
                <Route path="/products" element={<Products />}></Route>
                <Route path="/apps" element={<AppPage />}></Route>
                <Route path="/categories" element={<Categories />}></Route>
                <Route path="/orders" element={<Orders />}></Route>
                <Route
                  path="/categories/create"
                  element={<CategoriesCreate />}
                ></Route>
                <Route path="/customers" element={<Customers />}></Route>
                <Route path="/store" element={<Store />}></Route>
                <Route path="/discounts" element={<Discount />}></Route>
                <Route path="/analytics" element={<Analytics />}></Route>
              </Routes>
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </>
  )
}
export default App
