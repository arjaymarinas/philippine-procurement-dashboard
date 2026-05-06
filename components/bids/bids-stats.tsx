import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react"

const stats = [
  {
    label: "Total Bids",
    value: "927",
    change: "+10.2%",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Open Bids",
    value: "124",
    change: "+5.3%",
    icon: Clock,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    label: "Awarded",
    value: "685",
    change: "+12.1%",
    icon: CheckCircle,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Cancelled",
    value: "118",
    change: "-3.2%",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
]

export function BidsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-accent' : 'text-destructive'}`}>
                  {stat.change} vs last year
                </p>
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
