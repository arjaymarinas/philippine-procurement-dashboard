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
import { Search, Plus, Filter } from "lucide-react"

export function BidsFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search bids by title, ID, or vendor..."
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
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="awarded">Awarded</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] bg-secondary border-border">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="it">IT Services</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="office">Office Supplies</SelectItem>
            <SelectItem value="professional">Professional Services</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="border-border bg-secondary">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Bid
        </Button>
      </div>
    </div>
  )
}
