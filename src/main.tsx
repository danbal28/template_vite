Sentry.init({
  dsn: import.meta.env.VITE_APP_SENTRY_DNS as string,
  maxBreadcrumbs: 50,
  environment: 'production',
  debug: true,
})

import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'

import App from './App.tsx'

import './styles.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
