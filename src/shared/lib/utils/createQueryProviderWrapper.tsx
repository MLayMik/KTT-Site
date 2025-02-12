import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }, // Отключаем повторные запросы для тестов
  },
})

export function createQueryProviderWrapper() {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  }
}
