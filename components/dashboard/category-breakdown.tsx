"use client"

import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const categories = [
  { name: "IT Services", value: 32, amount: "$15.2M", change: 12 },
  { name: "Construction", value: 24, amount: "$11.4M", change: 8 },
  { name: "Professional Services", value: 18, amount: "$8.5M", change: -3 },
  { name: "Equipment", value: 14, amount: "$6.6M", change: 15 },
  { name: "Supplies", value: 12, amount: "$5.7M", change: 5 },
]

export function CategoryBreakdown() {
  const maxValue = Math.max(...categories.map((c) => c.value))

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Procurement by Category</h3>
          <p className="text-sm text-muted-foreground mt-1">Contract distribution by category</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground font-medium">{category.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{category.amount}</span>
                <span
                  className={`text-xs font-medium ${
                    category.change > 0 ? "text-accent" : "text-destructive"
                  }`}
                >
                  {category.change > 0 ? "+" : ""}{category.change}%
                </span>
              </div>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(category.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
