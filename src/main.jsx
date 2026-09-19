import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Berry from './components/Berry.jsx'
import Barbie from './components/Barbie.jsx'
import TipsDashboard from './components/Dashboard.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import TermsAndConditions from './components/TermsAndConditions.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import ShippingDeliveryPolicy from './components/ShippingPolicy.jsx'
import RefundPolicy from './components/RefundPolicy.jsx'
import ContactUs from './components/ContactUs.jsx'
import GoalOverlay from './components/GoalOverlay.jsx'
import TopDonators from './components/TopDonators.jsx'
import AlertOverlay from './components/AlertOverlay.jsx'
import VerifyEmail from './components/VerifyEmail.jsx'
import { Analytics } from "@vercel/analytics/react";
import Moli from './components/Moli.jsx'

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
    path: '/BarbieOwO',
    element: <Barbie />,
  },
  {
    path: '/Molislays',
    element: <Moli />
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
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
  {
    path: '/:streamer/overlay/goal',
    element: <GoalOverlay/>
  },
  {
    path: '/:streamer/overlay/top-donators',
    element: <TopDonators/>
  },
  {
    path: '/:streamer/alert',
    element: <AlertOverlay  />
  },
  {
    path:"/verify-email" ,
    element: <VerifyEmail />
  }
])

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
    <Analytics />
  </>,
)
