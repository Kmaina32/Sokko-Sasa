import Image from "next/image";
import Link from "next/link";
import { MapPin, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Listing } from "@/lib/types";
import { Button } from "./ui/button";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 group">
      <Link href={`/listings/${listing.id}`} className="group/link block">
        <CardHeader className="p-0 relative">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover"
            data-ai-hint={listing.imageHint}
          />
           <Badge variant={listing.category === 'Job' || listing.category === 'Service' ? 'secondary' : 'default'} className="absolute top-2 right-2">{listing.category}</Badge>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <CardTitle className="mb-2 text-lg font-bold leading-tight tracking-tight group-hover/link:text-primary">
            {listing.title}
          </CardTitle>
          <CardDescription className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1.5 h-4 w-4" />
            {listing.location}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-headline font-extrabold text-primary">
          {formatPrice(listing.price)}
        </p>
        {listing.category === 'Product' && (
            <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5"/>
                <span className="sr-only">Add to Cart</span>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
