"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const bids = [
  {
    id: "BID-2025-0127",
    title: "Cloud Infrastructure Upgrade",
    category: "IT Services",
    estimatedValue: "$1,250,000",
    submissions: 8,
    deadline: "2025-02-15",
    status: "open",
    postedDate: "2025-01-10",
  },
  {
    id: "BID-2025-0126",
    title: "Office Building Renovation",
    category: "Construction",
    estimatedValue: "$3,500,000",
    submissions: 12,
    deadline: "2025-02-20",
    status: "open",
    postedDate: "2025-01-08",
  },
  {
    id: "BID-2025-0125",
    title: "Annual Office Supplies Contract",
    category: "Office Supplies",
    estimatedValue: "$450,000",
    submissions: 15,
    deadline: "2025-01-30",
    status: "closed",
    postedDate: "2025-01-05",
  },
  {
    id: "BID-2025-0124",
    title: "Cybersecurity Assessment",
    category: "IT Services",
    estimatedValue: "$275,000",
    submissions: 6,
    deadline: "2025-01-25",
    status: "awarded",
    postedDate: "2025-01-02",
  },
  {
    id: "BID-2025-0123",
    title: "Legal Consulting Services",
    category: "Professional Services",
    estimatedValue: "$180,000",
    submissions: 4,
    deadline: "2025-01-20",
    status: "awarded",
    postedDate: "2024-12-28",
  },
  {
    id: "BID-2025-0122",
    title: "HVAC System Maintenance",
    category: "Maintenance",
    estimatedValue: "$95,000",
    submissions: 7,
    deadline: "2025-01-18",
    status: "cancelled",
    postedDate: "2024-12-25",
  },
  {
    id: "BID-2025-0121",
    title: "Software Development Services",
    category: "IT Services",
    estimatedValue: "$890,000",
    submissions: 11,
    deadline: "2025-01-15",
    status: "awarded",
    postedDate: "2024-12-20",
  },
  {
    id: "BID-2025-0120",
    title: "Marketing Campaign Services",
    category: "Professional Services",
    estimatedValue: "$320,000",
    submissions: 9,
    deadline: "2025-01-12",
    status: "awarded",
    postedDate: "2024-12-18",
  },
]

const statusColors: Record<string, string> = {
  open: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  closed: "bg-muted text-muted-foreground border-border",
  awarded: "bg-accent/20 text-accent border-accent/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
}

export function BidsTable() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-foreground">All Bids</CardTitle>
          <p className="text-sm text-muted-foreground">Showing 8 of 927 bids</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Bid ID</TableHead>
                <TableHead className="text-muted-foreground">Title</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Est. Value</TableHead>
                <TableHead className="text-muted-foreground text-center">Submissions</TableHead>
                <TableHead className="text-muted-foreground">Deadline</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((bid) => (
                <TableRow key={bid.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-mono text-sm text-primary">{bid.id}</TableCell>
                  <TableCell className="font-medium text-foreground max-w-[200px] truncate">
                    {bid.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{bid.category}</TableCell>
                  <TableCell className="font-medium text-foreground">{bid.estimatedValue}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{bid.submissions}</TableCell>
                  <TableCell className="text-muted-foreground">{bid.deadline}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[bid.status]}>
                      {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border-border">
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Bid
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Page 1 of 116</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-border bg-secondary" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-border bg-secondary">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
