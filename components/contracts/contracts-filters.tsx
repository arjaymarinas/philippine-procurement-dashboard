"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Plus, LayoutGrid, List } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function ContractsFilters() {
  const [view, setView] = useState<"grid" | "list">("grid")

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contracts by vendor, ID, or title..."
          className="pl-9 bg-secondary border-border"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] bg-secondary border-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expiring">Expiring Soon</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="terminated">Terminated</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] bg-secondary border-border">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="fixed">Fixed Price</SelectItem>
            <SelectItem value="time">Time & Materials</SelectItem>
            <SelectItem value="retainer">Retainer</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex rounded-lg border border-border overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-none h-9 w-9",
              view === "grid" && "bg-secondary"
            )}
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-none h-9 w-9 border-l border-border",
              view === "list" && "bg-secondary"
            )}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Contract
        </Button>
      </div>
    </div>
  )
}
