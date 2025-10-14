'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
const queryClient = new QueryClient()
export function Providers(props: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <TooltipProvider>
          <SidebarProvider {...props}>{props.children}</SidebarProvider>
        </TooltipProvider>
      </NuqsAdapter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}
