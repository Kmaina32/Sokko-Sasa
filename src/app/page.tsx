import Link from "next/link";
import {
  Search,
  MapPin,
  Tag,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ListingCard } from "@/components/listing-card";
import type { Listing } from "@/lib/types";

const mockListings: Omit<Listing, 'seller' | 'postedAt'>[] = [
  {
    id: "1",
    title: "Hand-carved Wooden Elephant",
    description: "A beautiful, intricately carved wooden elephant statue, perfect for home decor.",
    price: 3500,
    category: "Product",
    location: "Nairobi",
    imageUrl: "https://picsum.photos/seed/1/600/400",
    imageHint: "wooden elephant",
  },
  {
    id: "2",
    title: "Graphic Design Services",
    description: "Professional graphic design for logos, flyers, and more. Quick turnaround.",
    price: 5000,
    category: "Service",
    location: "Mombasa",
    imageUrl: "https://picsum.photos/seed/2/600/400",
    imageHint: "design portfolio",
  },
  {
    id: "3",
    title: "Spacious 2-Bedroom Apartment",
    description: "Modern and spacious 2-bedroom apartment for rent in a prime location.",
    price: 45000,
    category: "Property",
    location: "Kisumu",
    imageUrl: "https://picsum.photos/seed/3/600/400",
    imageHint: "modern apartment",
  },
  {
    id: "4",
    title: "Sales Executive Position",
    description: "We are hiring an experienced Sales Executive to join our dynamic team.",
    price: 0, // Assuming price is not applicable for jobs
    category: "Job",
    location: "Nakuru",
    imageUrl: "https://picsum.photos/seed/4/600/400",
    imageHint: "office handshake",
  },
  {
    id: "5",
    title: "Handwoven Kiondo Basket",
    description: "Authentic sisal Kiondo basket, durable and stylish. Available in multiple colors.",
    price: 1200,
    category: "Product",
    location: "Nairobi",
    imageUrl: "https://picsum.photos/seed/5/600/400",
    imageHint: "sisal basket",
  },
  {
    id: "6",
    title: "Plumbing & Repair",
    description: "Reliable plumbing services for residential and commercial properties.",
    price: 2000,
    category: "Service",
    location: "Eldoret",
    imageUrl: "https://picsum.photos/seed/6/600/400",
    imageHint: "plumbing tools",
  },
  {
    id: "7",
    title: "Vintage Leather Jacket",
    description: "Classic brown leather jacket in excellent condition. A timeless piece.",
    price: 8000,
    category: "Product",
    location: "Mombasa",
    imageUrl: "https://picsum.photos/seed/7/600/400",
    imageHint: "leather jacket",
  },
  {
    id: "8",
    title: "Beachfront Land for Sale",
    description: "Prime 1-acre beachfront plot with stunning ocean views. Perfect for development.",
    price: 12000000,
    category: "Property",
    location: "Malindi",
    imageUrl: "https://picsum.photos/seed/8/600/400",
    imageHint: "beachfront property",
  },
];


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight">
          Find Anything in Kenya
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          From the latest electronics to jobs and services, your local
          marketplace is just a click away.
        </p>
      </header>

      <div className="mb-8 p-4 md:p-6 bg-card rounded-lg shadow-md border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="What are you looking for?"
              className="pl-10 text-base"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full text-base">
              <Tag className="h-5 w-5 text-muted-foreground mr-2" />
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="product">Products</SelectItem>
              <SelectItem value="service">Services</SelectItem>
              <SelectItem value="job">Jobs</SelectItem>
              <SelectItem value="property">Property</SelectItem>
            </SelectContent>
          </Select>
          <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

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
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
