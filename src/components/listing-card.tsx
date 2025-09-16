import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
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

interface ListingCardProps {
  listing: Omit<Listing, 'seller' | 'postedAt'>;
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
    <Link href={`/listings/${listing.id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
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
          <CardTitle className="mb-2 text-lg font-bold leading-tight tracking-tight group-hover:text-primary">
            {listing.title}
          </CardTitle>
          <CardDescription className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1.5 h-4 w-4" />
            {listing.location}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-xl font-headline font-extrabold text-primary">
            {formatPrice(listing.price)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
