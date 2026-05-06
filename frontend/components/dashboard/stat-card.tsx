"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  prefix?: string
  suffix?: string
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = "vs last year",
  icon,
  prefix = "",
  suffix = "",
}: StatCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0
  const isNeutral = change === 0 || change === undefined

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            {icon}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1 text-sm font-medium ${isPositive
                    ? "text-accent"
                    : isNegative
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : isNegative ? (
                  <TrendingDown className="h-4 w-4" />
                ) : (
                  <Minus className="h-4 w-4" />
                )}
                {isPositive && "+"}
                {change}%
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
