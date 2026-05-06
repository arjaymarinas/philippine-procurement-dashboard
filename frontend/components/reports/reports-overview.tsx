import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Percent, Clock, Target } from "lucide-react"

const metrics = [
  {
    label: "Total Spend YTD",
    value: "$53.3M",
    change: "+14.5%",
    trend: "up",
    icon: DollarSign,
    description: "vs $46.5M last year",
  },
  {
    label: "Cost Savings",
    value: "$4.8M",
    change: "+22.3%",
    trend: "up",
    icon: Percent,
    description: "9.0% savings rate",
  },
  {
    label: "Avg. Processing Time",
    value: "18.5 days",
    change: "-12.4%",
    trend: "up",
    icon: Clock,
    description: "vs 21.1 days last year",
  },
  {
    label: "Compliance Rate",
    value: "97.2%",
    change: "+2.1%",
    trend: "up",
    icon: Target,
    description: "Meets target of 95%",
  },
]

export function ReportsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <Card key={metric.label} className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-primary/10">
                <metric.icon className="h-5 w-5 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend === "up" ? "text-accent" : "text-destructive"
              }`}>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
              <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
