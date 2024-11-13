import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '@sentry/react'
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AppRouter from './routes'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 60 * 5 * 60,
        placeholderData: keepPreviousData,
        networkMode: 'offlineFirst',
      },
    },
  })

  return (
    <ErrorBoundary fallback={<div>An error has occurred</div>}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          <Toaster
            gutter={16}
            position='bottom-left'
            containerClassName=''
            toastOptions={{
              duration: 3000,
              className:
                'max-md:!flex-1 md:!w-fit !p-0 max-sm:!mb-8 !max-w-[100vw] !overflow-hidden !bg-text !rounded-[8px]',
              iconTheme: {
                primary: 'white',
                secondary: '#111111',
              },
            }}
          ></Toaster>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
