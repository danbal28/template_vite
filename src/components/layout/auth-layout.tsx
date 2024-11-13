import { getIsNotSignIn } from '@src/utils/local-storage'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!getIsNotSignIn()) {
      navigate('/')
    }
  }, [])
  return (
    <React.Suspense>
      <Outlet />
    </React.Suspense>
  )
}

export default AuthLayout
