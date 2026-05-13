"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, FileSignature, Users, BarChart3 } from "lucide-react"

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/bids", label: "Bids", icon: FileText },
  { href: "/contracts", label: "Contracts", icon: FileSignature },
  { href: "/vendors", label: "Vendors", icon: Users },
  { href: "/reports", label: "Reports", icon: BarChart3 },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-[1px] whitespace-nowrap",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
