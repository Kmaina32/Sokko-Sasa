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
import { Filter, ListFilter, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images";

const mockListings: Omit<Listing, 'seller' | 'postedAt' | 'description'>[] = [
    { 
        id: 'prod1', 
        title: 'Hand-carved Wooden Elephant', 
        price: 2500, 
        category: 'Product', 
        location: 'Nairobi', 
        imageUrl: placeholderImages.product1.imageUrl,
        imageHint: placeholderImages.product1.imageHint,
    },
    { 
        id: 'prod2', 
        title: 'Sisal Kiondo Basket', 
        price: 1200, 
        category: 'Product', 
        location: 'Mombasa',
        imageUrl: placeholderImages.product2.imageUrl,
        imageHint: placeholderImages.product2.imageHint,
    },
    { 
        id: 'prod3', 
        title: 'Maasai Shuka Blanket', 
        price: 800, 
        category: 'Product', 
        location: 'Nakuru',
        imageUrl: placeholderImages.product3.imageUrl,
        imageHint: placeholderImages.product3.imageHint,
    },
    { 
        id: 'prod4', 
        title: 'Beaded Leather Sandals', 
        price: 1800, 
        category: 'Product', 
        location: 'Diani',
        imageUrl: placeholderImages.product4.imageUrl,
        imageHint: placeholderImages.product4.imageHint,
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

      {mockListings.length > 0 ? (
        <>
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
        </>
      ) : (
        <Card className="text-center p-12 col-span-full">
          <Package className="mx-auto h-12 w-12 text-muted-foreground"/>
          <h3 className="mt-4 text-xl font-semibold">No Listings Found</h3>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
        </Card>
      )}
    </div>
  );
}
