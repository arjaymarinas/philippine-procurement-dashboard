"use client"

import { SWRConfig } from "swr"

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 30000, // Refresh every 30 seconds
        revalidateOnFocus: true,
        dedupingInterval: 5000,
      }}
    >
      {children}
    </SWRConfig>
  )
}
