import useSWR from 'swr'
import { api, type Award, type DashboardStats, type Vendor } from '@/lib/api'

export function useStats() {
  const { data, error, isLoading, mutate } = useSWR<DashboardStats>(
    'stats',
    () => api.getStats()
  )

  return {
    stats: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useAwards() {
  const { data, error, isLoading, mutate } = useSWR<{ data: Award[]; count: number }>(
    'awards',
    () => api.getAwards()
  )

  return {
    awards: data?.data ?? [],
    count: data?.count ?? 0,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useVendors() {
  const { data, error, isLoading, mutate } = useSWR<{ data: Vendor[]; count: number }>(
    'vendors',
    () => api.getVendors()
  )

  return {
    vendors: data?.data ?? [],
    count: data?.count ?? 0,
    isLoading,
    isError: error,
    mutate,
  }
}

// Format currency for display
export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`
  }
  return `$${value.toFixed(0)}`
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    if (diffHours === 0) {
      return 'Just now'
    }
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  } else if (diffDays === 1) {
    return '1 day ago'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  }
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
