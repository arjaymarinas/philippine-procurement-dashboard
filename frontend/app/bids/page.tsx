import { DashboardHeader } from "@/components/dashboard/header"
import { BidsTable } from "@/components/bids/bids-table"
import { BidsFilters } from "@/components/bids/bids-filters"
import { BidsStats } from "@/components/bids/bids-stats"

export default function BidsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Bids Management</h2>
          <p className="text-muted-foreground">Track and manage all procurement bids</p>
        </div>

        <BidsStats />
        <BidsFilters />
        <BidsTable />
      </main>
    </div>
  )
}
