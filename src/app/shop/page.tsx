import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListingCard } from "@/components/listing-card";
import type { Listing } from "@/lib/types";
import { Filter, ListFilter } from "lucide-react";

const mockListings: Omit<Listing, "seller" | "postedAt">[] = [
  {
    id: "1",
    title: "Hand-carved Wooden Elephant",
    price: 3500,
    category: "Product",
    location: "Nairobi",
    imageUrl: "https://picsum.photos/seed/1/600/400",
    imageHint: "wooden elephant",
    description: "A beautiful, intricately carved wooden elephant statue, perfect for home decor. Made from sustainably sourced jacaranda wood by local artisans. It stands 12 inches tall and adds a touch of Kenyan craftsmanship to any room."
  },
  {
    id: "5",
    title: "Authentic Sisal Kiondo Basket",
    price: 1200,
    category: "Product",
    location: "Mombasa",
    imageUrl: "https://picsum.photos/seed/5/600/400",
    imageHint: "sisal basket",
    description: "Authentic sisal Kiondo basket, durable and stylish. Available in multiple colors."
  },
  {
    id: "7",
    title: "Classic Brown Leather Jacket",
    price: 4500,
    category: "Product",
    location: "Nakuru",
    imageUrl: "https://picsum.photos/seed/7/600/400",
    imageHint: "leather jacket",
    description: "Classic brown leather jacket in excellent condition. A timeless piece."
  },
    {
    id: "2",
    title: "Graphic Design Services",
    price: 5000,
    category: "Service",
    location: "Mombasa",
    imageUrl: "https://picsum.photos/seed/2/600/400",
    imageHint: "design portfolio",
    description: "Professional graphic design for logos, flyers, and more. Quick turnaround."
  },
  {
    id: "3",
    title: "2-Bedroom Apartment in Kilimani",
    price: 85000,
    category: "Property",
    location: "Nairobi",
    imageUrl: "https://picsum.photos/seed/3/600/400",
    imageHint: "modern apartment",
    description: "Modern and spacious 2-bedroom apartment for rent in a prime location."
  },
  {
    id: "4",
    title: "Sales Executive Position",
    price: 0,
    category: "Job",
    location: "Nairobi",
    imageUrl: "https://picsum.photos/seed/4/600/400",
    imageHint: "office handshake",
    description: "We are hiring an experienced Sales Executive to join our dynamic team."
  },
  {
    id: "6",
    title: "Reliable Plumbing Services",
    price: 2500,
    category: "Service",
    location: "Kisumu",
    imageUrl: "https://picsum.photos/seed/6/600/400",
    imageHint: "plumbing tools",
    description: "Reliable plumbing services for residential and commercial properties."
  },
  {
    id: "8",
    title: "Prime 1-Acre Beachfront Plot",
    price: 12000000,
    category: "Property",
    location: "Diani",
    imageUrl: "https://picsum.photos/seed/8/600/400",
    imageHint: "beachfront property",
    description: "Prime 1-acre beachfront plot with stunning ocean views. Perfect for development."
  },
];


export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Browse Marketplace</h1>
        <p className="text-muted-foreground">
          Find exactly what you're looking for.
        </p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
            <Input placeholder="Search by keyword..." className="pr-10" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto flex-1">
                <Filter className="mr-2 h-4 w-4" /> Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Product</DropdownMenuItem>
              <DropdownMenuItem>Service</DropdownMenuItem>
              <DropdownMenuItem>Property</DropdownMenuItem>
              <DropdownMenuItem>Job</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto flex-1">
                <ListFilter className="mr-2 h-4 w-4" /> Location
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Location</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Nairobi</DropdownMenuItem>
              <DropdownMenuItem>Mombasa</DropdownMenuItem>
              <DropdownMenuItem>Kisumu</DropdownMenuItem>
              <DropdownMenuItem>Nakuru</DropdownMenuItem>
              <DropdownMenuItem>Diani</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden md:block">
          <Select defaultValue="latest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      <Pagination className="mt-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
