"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight, FileText, CheckCircle, Clock, XCircle } from "lucide-react"
import { useAwards, formatCurrency, formatDate } from "@/hooks/use-procurement-data"

const statusConfig: Record<string, { icon: typeof FileText; color: string }> = {
  active: { icon: FileText, color: "bg-primary/20 text-primary border-primary/30" },
  completed: { icon: CheckCircle, color: "bg-accent/20 text-accent border-accent/30" },
  awarded: { icon: CheckCircle, color: "bg-accent/20 text-accent border-accent/30" },
  pending: { icon: Clock, color: "bg-chart-3/20 text-chart-3 border-chart-3/30" },
  closed: { icon: XCircle, color: "bg-muted text-muted-foreground border-border" },
}

export function RecentActivities() {
  const { awards, isLoading, isError } = useAwards()

  // Get the 5 most recent activities
  const recentAwards = awards
    .sort((a, b) => new Date(b.award_date).getTime() - new Date(a.award_date).getTime())
    .slice(0, 5)

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
          <p className="text-sm text-muted-foreground mt-1">Latest procurement updates</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>Failed to load activities. Make sure the backend is running.</p>
        </div>
      ) : recentAwards.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No recent activities found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentAwards.map((award) => {
            const status = award.status?.toLowerCase() ?? 'pending'
            const config = statusConfig[status] || statusConfig.pending
            const Icon = config.icon

            return (
              <div
                key={award.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {award.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {award.vendor_name} &bull; {formatDate(award.award_date)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground hidden sm:block">
                    {formatCurrency(parseFloat(award.contract_value) || 0)}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${config.color}`}
                  >
                    {award.category || 'General'}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
