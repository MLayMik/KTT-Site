import { queryClient, worker } from '@/shared/api/lib/index.ts'
import { Theme } from '@radix-ui/themes'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/route/App.tsx'
import './index.css'

async function startWorker() {
  if (import.meta.env.VITE_API_ENVIRONMENT === 'development') {
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}

startWorker().then(() => {
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
})
