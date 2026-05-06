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
import { Search, Plus, Download } from "lucide-react"

export function VendorsFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search vendors by name, category, or location..."
          className="pl-9 bg-secondary border-border"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] bg-secondary border-border">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="it">IT Services</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="consulting">Consulting</SelectItem>
            <SelectItem value="supplies">Office Supplies</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] bg-secondary border-border">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] bg-secondary border-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="preferred">Preferred</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="border-border bg-secondary">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>
    </div>
  )
}
