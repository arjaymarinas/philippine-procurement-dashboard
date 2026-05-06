"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Calendar, Building2, DollarSign } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const contracts = [
  {
    id: "CTR-2025-0089",
    title: "Cloud Infrastructure Management",
    vendor: "TechCore Solutions",
    value: "$1,250,000",
    type: "Time & Materials",
    startDate: "2024-06-01",
    endDate: "2026-05-31",
    status: "active",
    progress: 40,
    spent: "$500,000",
  },
  {
    id: "CTR-2025-0088",
    title: "Office Building Renovation Phase 1",
    vendor: "BuildRight Construction",
    value: "$3,500,000",
    type: "Fixed Price",
    startDate: "2024-09-01",
    endDate: "2025-08-31",
    status: "active",
    progress: 65,
    spent: "$2,275,000",
  },
  {
    id: "CTR-2025-0087",
    title: "Annual IT Support Services",
    vendor: "Digital Systems Inc",
    value: "$480,000",
    type: "Retainer",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    progress: 8,
    spent: "$40,000",
  },
  {
    id: "CTR-2025-0086",
    title: "Marketing Campaign Services",
    vendor: "Creative Agency Pro",
    value: "$320,000",
    type: "Fixed Price",
    startDate: "2024-11-01",
    endDate: "2025-02-28",
    status: "expiring",
    progress: 85,
    spent: "$272,000",
  },
  {
    id: "CTR-2025-0085",
    title: "Legal Advisory Services",
    vendor: "Smith & Partners LLP",
    value: "$180,000",
    type: "Retainer",
    startDate: "2024-07-01",
    endDate: "2025-06-30",
    status: "active",
    progress: 58,
    spent: "$104,400",
  },
  {
    id: "CTR-2025-0084",
    title: "Cybersecurity Assessment",
    vendor: "SecureNet Systems",
    value: "$275,000",
    type: "Fixed Price",
    startDate: "2024-12-01",
    endDate: "2025-03-31",
    status: "active",
    progress: 35,
    spent: "$96,250",
  },
  {
    id: "CTR-2025-0083",
    title: "Employee Training Program",
    vendor: "Learning Solutions Co",
    value: "$145,000",
    type: "Fixed Price",
    startDate: "2024-10-01",
    endDate: "2025-01-31",
    status: "expiring",
    progress: 92,
    spent: "$133,400",
  },
  {
    id: "CTR-2025-0082",
    title: "Data Analytics Platform",
    vendor: "DataViz Corp",
    value: "$520,000",
    type: "Time & Materials",
    startDate: "2024-08-01",
    endDate: "2025-07-31",
    status: "active",
    progress: 50,
    spent: "$260,000",
  },
]

const statusColors: Record<string, string> = {
  active: "bg-accent/20 text-accent border-accent/30",
  expiring: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  expired: "bg-muted text-muted-foreground border-border",
  terminated: "bg-destructive/20 text-destructive border-destructive/30",
}

export function ContractsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {contracts.map((contract) => (
        <Card key={contract.id} className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="font-mono text-xs text-primary">{contract.id}</p>
                <h3 className="font-medium text-foreground leading-tight line-clamp-2">
                  {contract.title}
                </h3>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover border-border">
                  <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Edit Contract</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Download PDF</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-destructive">
                    Terminate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="truncate">{contract.vendor}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">{contract.value}</span>
              </div>
              <Badge variant="outline" className={statusColors[contract.status]}>
                {contract.status === "expiring" ? "Expiring Soon" : contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground">{contract.progress}%</span>
              </div>
              <Progress value={contract.progress} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Spent: {contract.spent}</span>
                <span>{contract.type}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
              <Calendar className="h-3 w-3" />
              <span>{contract.startDate} - {contract.endDate}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
