import { queryClient } from '@/shared/api/lib/index.ts'
import { Theme } from '@radix-ui/themes'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/route/App.tsx'
import { ENVIRONMENT } from './shared/config/index.ts'
import './index.css'

if (ENVIRONMENT === 'development') {
  import('@/shared/lib/utils/worker.ts').then(({ worker }) => {
    worker
      .start({ onUnhandledRequest: 'bypass' })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Theme>
          <App />
        </Theme>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
