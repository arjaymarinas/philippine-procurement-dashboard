"use client"

import { StatCard } from "@/components/dashboard/stat-card"
import { useStats, useAwards, useVendors, formatCurrency } from "@/hooks/use-procurement-data"
import {
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function StatsGrid() {
  const { stats, isLoading: statsLoading } = useStats()
  const { count: bidCount, isLoading: awardsLoading } = useAwards()
  const { count: vendorCount, isLoading: vendorsLoading } = useVendors()

  const isLoading = statsLoading || awardsLoading || vendorsLoading

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-6 bg-card border border-border rounded-lg">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    )
  }

  const totalValue = stats?.totalContractValue ?? 0
  const avgBidValue = bidCount > 0 ? totalValue / bidCount : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      <StatCard
        title="Total Bids"
        value={bidCount}
        change={10.2}
        changeLabel="vs last year"
        icon={<FileText className="h-4 w-4" />}
      />
      <StatCard
        title="Contract Value"
        value={formatCurrency(totalValue).replace('$', '')}
        prefix="$"
        change={14.5}
        changeLabel="vs last year"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <StatCard
        title="Active Vendors"
        value={vendorCount}
        change={8.3}
        changeLabel="vs last year"
        icon={<Users className="h-4 w-4" />}
      />
      <StatCard
        title="Avg Bid Value"
        value={formatCurrency(avgBidValue).replace('$', '')}
        prefix="$"
        change={6.1}
        changeLabel="vs last year"
        icon={<TrendingUp className="h-4 w-4" />}
      />
      <StatCard
        title="Avg Cycle Time"
        value="18.5"
        suffix=" days"
        change={-12.4}
        changeLabel="vs last year"
        icon={<Clock className="h-4 w-4" />}
      />
      <StatCard
        title="Awards Made"
        value={stats?.awardsThisYear ?? 0}
        change={9.8}
        changeLabel="vs last year"
        icon={<Award className="h-4 w-4" />}
      />
    </div>
  )
}
