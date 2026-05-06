"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MoreHorizontal,
  Star,
  MapPin,
  Phone,
  Mail,
  Building2,
  FileSignature,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const vendors = [
  {
    id: "VND-001",
    name: "TechCore Solutions",
    category: "IT Services",
    location: "San Francisco, CA",
    phone: "(415) 555-0123",
    email: "contact@techcore.com",
    rating: 4.8,
    contracts: 12,
    totalValue: "$4.2M",
    status: "preferred",
  },
  {
    id: "VND-002",
    name: "BuildRight Construction",
    category: "Construction",
    location: "Los Angeles, CA",
    phone: "(213) 555-0456",
    email: "info@buildright.com",
    rating: 4.6,
    contracts: 8,
    totalValue: "$12.5M",
    status: "preferred",
  },
  {
    id: "VND-003",
    name: "Digital Systems Inc",
    category: "IT Services",
    location: "Seattle, WA",
    phone: "(206) 555-0789",
    email: "sales@digitalsystems.com",
    rating: 4.5,
    contracts: 15,
    totalValue: "$2.8M",
    status: "approved",
  },
  {
    id: "VND-004",
    name: "Creative Agency Pro",
    category: "Marketing",
    location: "New York, NY",
    phone: "(212) 555-0321",
    email: "hello@creativeagency.com",
    rating: 4.3,
    contracts: 6,
    totalValue: "$1.1M",
    status: "approved",
  },
  {
    id: "VND-005",
    name: "Smith & Partners LLP",
    category: "Consulting",
    location: "Chicago, IL",
    phone: "(312) 555-0654",
    email: "legal@smithpartners.com",
    rating: 4.9,
    contracts: 4,
    totalValue: "$720K",
    status: "preferred",
  },
  {
    id: "VND-006",
    name: "SecureNet Systems",
    category: "IT Services",
    location: "Austin, TX",
    phone: "(512) 555-0987",
    email: "security@securenet.com",
    rating: 4.7,
    contracts: 3,
    totalValue: "$825K",
    status: "approved",
  },
  {
    id: "VND-007",
    name: "Office Plus Supplies",
    category: "Office Supplies",
    location: "Denver, CO",
    phone: "(303) 555-0147",
    email: "orders@officeplus.com",
    rating: 4.1,
    contracts: 2,
    totalValue: "$450K",
    status: "approved",
  },
  {
    id: "VND-008",
    name: "DataViz Corp",
    category: "IT Services",
    location: "Boston, MA",
    phone: "(617) 555-0258",
    email: "info@dataviz.com",
    rating: 4.4,
    contracts: 5,
    totalValue: "$1.6M",
    status: "approved",
  },
]

const statusColors: Record<string, string> = {
  preferred: "bg-accent/20 text-accent border-accent/30",
  approved: "bg-primary/20 text-primary border-primary/30",
  pending: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  inactive: "bg-muted text-muted-foreground border-border",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= rating ? "text-chart-3 fill-chart-3" : "text-muted-foreground"
          }`}
        />
      ))}
      <span className="text-sm text-foreground ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

export function VendorsDirectory() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {vendors.map((vendor) => (
        <Card key={vendor.id} className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 bg-secondary">
                  <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">
                    {getInitials(vendor.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-foreground">{vendor.name}</h3>
                  <p className="text-sm text-muted-foreground">{vendor.category}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover border-border">
                  <DropdownMenuItem className="cursor-pointer">View Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">View Contracts</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Edit Vendor</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-destructive">
                    Deactivate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{vendor.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{vendor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{vendor.email}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <StarRating rating={vendor.rating} />
              <Badge variant="outline" className={statusColors[vendor.status]}>
                {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-1 text-sm">
                <FileSignature className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{vendor.contracts} contracts</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-medium">{vendor.totalValue}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
