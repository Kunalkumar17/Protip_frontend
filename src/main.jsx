import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Berry from './components/Berry.jsx'
import TipsDashboard from './components/Dashboard.jsx'
import TermsAndConditions from './components/TermsAndConditions.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import ShippingDeliveryPolicy from './components/ShippingPolicy.jsx'
import RefundPolicy from './components/RefundPolicy.jsx'
import ContactUs from './components/ContactUs.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/Berry',
    element: <Berry />,
  },
  {
    path: '/TipsDashBoard/911Berry',
    element: <TipsDashboard />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: '/Privacy-Policy',
    element: <PrivacyPolicy/>,
  },
  {
    path: '/Shipping-Policy',
    element: <ShippingDeliveryPolicy/>,
  },
  {
    path: '/Refund-Policy',
    element: <RefundPolicy/>,
  },
  {
    path: '/ContactUs',
    element: <ContactUs/>,
  },
])

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
