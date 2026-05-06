"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, FileText, CheckCircle, Clock, XCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    title: "IT Infrastructure Upgrade",
    type: "Bid Posted",
    status: "active",
    amount: "$2.5M",
    date: "2 hours ago",
    icon: FileText,
  },
  {
    id: 2,
    title: "Office Renovation Phase 2",
    type: "Contract Awarded",
    status: "completed",
    amount: "$1.8M",
    date: "5 hours ago",
    icon: CheckCircle,
  },
  {
    id: 3,
    title: "Fleet Management Services",
    type: "Under Review",
    status: "pending",
    amount: "$950K",
    date: "1 day ago",
    icon: Clock,
  },
  {
    id: 4,
    title: "Security Services Contract",
    type: "Bid Closed",
    status: "closed",
    amount: "$1.2M",
    date: "2 days ago",
    icon: XCircle,
  },
  {
    id: 5,
    title: "Cloud Migration Project",
    type: "Bid Posted",
    status: "active",
    amount: "$3.2M",
    date: "3 days ago",
    icon: FileText,
  },
]

const statusColors: Record<string, string> = {
  active: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-accent/20 text-accent border-accent/30",
  pending: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  closed: "bg-muted text-muted-foreground border-border",
}

export function RecentActivities() {
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
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground hidden sm:block">
                  {activity.amount}
                </span>
                <Badge
                  variant="outline"
                  className={`text-xs ${statusColors[activity.status]}`}
                >
                  {activity.type}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
