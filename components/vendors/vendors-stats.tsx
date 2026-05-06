import { Card, CardContent } from "@/components/ui/card"
import { Users, Star, Award, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Total Vendors",
    value: "248",
    change: "+8.3%",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Preferred Vendors",
    value: "42",
    change: "+12.0%",
    icon: Star,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    label: "Top Performers",
    value: "67",
    change: "+5.7%",
    icon: Award,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Avg. Performance",
    value: "4.2",
    subtext: "/ 5.0",
    change: "+3.2%",
    icon: TrendingUp,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function VendorsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  {"subtext" in stat && (
                    <span className="text-sm text-muted-foreground">{stat.subtext}</span>
                  )}
                </div>
                <p className="text-sm text-accent mt-1">{stat.change} vs last year</p>
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
