import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Tag, MessageSquare } from "lucide-react";

// Mock data - in a real app, this would be fetched from a database
const mockListings: any[] = [];
const listing = mockListings[0]; // This will be undefined, but we'll handle it

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the listing based on `params.id`
  // const listing = await fetchListing(params.id);

  if (!listing) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="text-center p-12">
                <CardTitle className="text-2xl">Listing Not Found</CardTitle>
                <CardContent>
                    <p className="mt-4 text-muted-foreground">Sorry, we couldn't find the listing you're looking for.</p>
                    <Button asChild className="mt-6">
                        <a href="/shop">Back to Marketplace</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  const formatPrice = (price: number) => {
    if (price === 0) return "Not specified";
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(price);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {listing.images.map((src: string, index: number) => (
                    <CarouselItem key={index}>
                      <Image
                        src={src}
                        alt={`${listing.title} image ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full aspect-video object-cover"
                        data-ai-hint="product image"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4"/>
                <CarouselNext className="right-4"/>
              </Carousel>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
                <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/80 whitespace-pre-wrap">{listing.description}</p>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <h1 className="font-headline text-3xl font-bold tracking-tight">{listing.title}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground pt-2">
                        <div className="flex items-center gap-1.5">
                            <Tag className="w-4 h-4"/>
                            <Badge variant="secondary">{listing.category}</Badge>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4"/>
                            <span>{listing.location}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="font-headline text-4xl font-extrabold text-primary">{formatPrice(listing.price)}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Seller Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={listing.seller.avatar} alt={listing.seller.name}/>
                            <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{listing.seller.name}</p>
                            <Button variant="link" className="p-0 h-auto">View Profile</Button>
                        </div>
                    </div>
                    <Separator />
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90">
                        <MessageSquare className="mr-2 h-5 w-5"/>
                        Contact Seller
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
