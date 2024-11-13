/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <React.Suspense>
      <Outlet />
    </React.Suspense>
  )
}

export default MainLayout
