"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { ContractValueChart } from "@/components/dashboard/contract-value-chart"
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { VendorPerformance } from "@/components/dashboard/vendor-performance"
import { ProcurementPieChart } from "@/components/dashboard/pie-chart"
import { BudgetVsActualChart } from "@/components/dashboard/budget-actual-chart"
import { BidsVsAwardsChart } from "@/components/charts/bids-vs-award-chart"
import {
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react"

export default function ProcurementDashboard() {

  const currencyFormatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });

  const [stats, setStats] = useState(null)

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    fetch(`${apiUrl}/dashboard`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Bids Posted"
            value={currencyFormatter.format(stats?.bids?.bid_posted ?? 0)}
            change={10.2}
            changeLabel="vs last year"
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard
            title="Total ABC"
            value={currencyFormatter.format(stats?.bids?.total_abc ?? 0)}
            prefix="₱"
            change={14.5}
            changeLabel="vs last year"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <StatCard
            title="Awards Posted"
            value={currencyFormatter.format(stats?.awards?.award_posted ?? 0)}
            change={10.2}
            changeLabel="vs last year"
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard
            title="Contract Amount"
            value={currencyFormatter.format(stats?.awards?.total_contract_amount ?? 0)}
            prefix="₱"
            change={14.5}
            changeLabel="vs last year"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <StatCard
            title="Active Merchants"
            value={currencyFormatter.format(stats?.merchants?.total_active_merchant ?? 0)}
            change={8.3}
            changeLabel="vs last year"
            icon={<Users className="h-4 w-4" />}
          />
          {/* <StatCard
            title="Avg Bid Value"
            value="57.5"
            prefix="₱"
            suffix="K"
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
          />*/}
          <StatCard
            title="Platinum Merchants"
            value={currencyFormatter.format(stats?.merchants?.total_platinum_merchant ?? 0)}
            change={200}
            changeLabel="vs last year"
            icon={<Award className="h-4 w-4" />}
          />
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ProcurementPieChart bids_abc_by_classification={stats?.bids_abc_by_classification} />
          <div className="lg:col-span-2">
            <BidsVsAwardsChart bids_abc_per_month={stats?.bids_abc_per_month} awards_ca_per_month={stats?.awards_ca_per_month} />
            {/*<ActivityChart bids_abc_per_month={stats?.bids_abc_per_month} awards_ca_per_month={stats?.awards_ca_per_month} />*/}
          </div>
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ProcurementPieChart bids_abc_by_classification={stats?.bids_abc_by_classification} />
          <div className="lg:col-span-2">
            <BudgetVsActualChart bids_abc_per_month={stats?.bids_abc_per_month} awards_ca_per_month={stats?.awards_ca_per_month} />
          </div>
        </div>

        {/* Charts Row 
        <div className="mb-8">
          <ContractValueChart />
        </div>
        */}

        {/* Bottom Row 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CategoryBreakdown />
          <div className="lg:col-span-2">
            <RecentActivities />
          </div>
        </div>*/}

        {/* Vendor Performance */}
        <div className="mt-6">
          <VendorPerformance top_10_merchants_by_ca={stats?.top_10_merchants_by_ca} />
        </div>

        {/* Bar Chart */}
        <div className="mt-6">
          <BidsVsAwardsChart bids_abc_per_month={stats?.bids_abc_per_month} awards_ca_per_month={stats?.awards_ca_per_month} />
        </div>
      </main>
    </div>
  )
}
