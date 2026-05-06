import { DashboardHeader } from "@/components/dashboard/header"
import { ContractsStats } from "@/components/contracts/contracts-stats"
import { ContractsFilters } from "@/components/contracts/contracts-filters"
import { ContractsGrid } from "@/components/contracts/contracts-grid"

export default function ContractsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Contract Management</h2>
          <p className="text-muted-foreground">Monitor and manage all active and past contracts</p>
        </div>

        <ContractsStats />
        <ContractsFilters />
        <ContractsGrid />
      </main>
    </div>
  )
}
