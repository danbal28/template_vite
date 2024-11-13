import { Route, Routes, useLocation } from 'react-router-dom'
import AuthLayout from '@src/components/layout/auth-layout'
import MainLayout from '@src/components/layout/main-layout'
import SignIn from '@src/components/signin'
import { AnimatePresence } from 'framer-motion'
import Home from '@src/components/home'

const AppRouter = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/' element={<AuthLayout />}>
            <Route path='/sign_in' element={<SignIn />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default AppRouter
