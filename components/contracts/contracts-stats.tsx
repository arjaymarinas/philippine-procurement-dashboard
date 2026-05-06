import { Card, CardContent } from "@/components/ui/card"
import { FileSignature, DollarSign, Clock, AlertTriangle } from "lucide-react"

const stats = [
  {
    label: "Total Contracts",
    value: "685",
    subtext: "$53.3M total value",
    change: "+14.5%",
    icon: FileSignature,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Active Contracts",
    value: "412",
    subtext: "$31.2M active value",
    change: "+8.7%",
    icon: DollarSign,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Expiring Soon",
    value: "28",
    subtext: "Within 30 days",
    change: "-5.1%",
    icon: Clock,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    label: "Requires Attention",
    value: "12",
    subtext: "Action needed",
    change: "+2.3%",
    icon: AlertTriangle,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function ContractsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.subtext}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
