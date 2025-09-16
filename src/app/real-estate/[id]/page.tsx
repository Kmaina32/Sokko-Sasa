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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Bed, Bath, Car, Phone, MessageSquare, Building } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import Link from "next/link";


// Mock data
const mockPropertyData: any = {
    're1': {
        id: 're1',
        title: 'Spacious 2BR Apartment in Kilimani',
        description: `Experience modern living in this stunning 2-bedroom apartment located in the heart of Kilimani. This property boasts ample natural light, a spacious living area, and a contemporary kitchen with high-end finishes. Both bedrooms are en-suite, providing comfort and privacy.

Key Features:
- 2 Bedrooms, 2 Bathrooms
- Open-plan living and dining area
- Fully-fitted kitchen with granite countertops
- Balcony with city views
- 24/7 security and CCTV surveillance
- High-speed lifts
- Backup generator
- Borehole water supply
- Ample parking space

Enjoy convenient access to Yaya Centre, Prestige Plaza, and numerous restaurants and international schools. Perfect for young professionals or small families.`,
        price: 80000,
        type: 'Rent',
        location: 'Kilimani, Nairobi',
        images: [
            placeholderImages.property1.imageUrl,
            "https://picsum.photos/seed/re1-2/800/600",
            "https://picsum.photos/seed/re1-3/800/600",
        ],
        agent: {
            id: 'agent1',
            name: 'Property Masters',
            avatar: 'https://picsum.photos/seed/agent1/100/100',
        },
        amenities: { beds: 2, baths: 2, parking: 1 }
    }
};


export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = mockPropertyData[params.id];

  if (!property) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="text-center p-12">
                <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                <CardTitle className="text-2xl mt-4">Property Not Found</CardTitle>
                <CardContent>
                    <p className="mt-4 text-muted-foreground">Sorry, we couldn't find the property you're looking for.</p>
                    <Button asChild className="mt-6">
                        <Link href="/real-estate">Back to Listings</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
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
                  {property.images.map((src: string, index: number) => (
                    <CarouselItem key={index}>
                      <Image
                        src={src}
                        alt={`${property.title} image ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full aspect-video object-cover"
                        data-ai-hint="property image"
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
                <CardTitle>About this Property</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/80 whitespace-pre-wrap">{property.description}</p>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <h1 className="font-headline text-3xl font-bold tracking-tight">{property.title}</h1>
                    <div className="flex items-center gap-1.5 text-muted-foreground pt-2">
                        <MapPin className="w-4 h-4"/>
                        <span>{property.location}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="font-headline text-4xl font-extrabold text-primary">
                        {formatPrice(property.price)}
                        {property.type === 'Rent' && <span className="text-2xl font-semibold text-muted-foreground"> /month</span>}
                    </p>
                    <div className="flex items-center gap-6 text-muted-foreground mt-4 border-t pt-4">
                        <div className="flex items-center gap-2">
                            <Bed className="w-5 h-5" /><span className="font-medium">{property.amenities.beds}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bath className="w-5 h-5" /><span className="font-medium">{property.amenities.baths}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Car className="w-5 h-5" /><span className="font-medium">{property.amenities.parking}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={property.agent.avatar} alt={property.agent.name}/>
                            <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{property.agent.name}</p>
                             <Button variant="link" asChild className="p-0 h-auto">
                               <Link href={`/profile/${property.agent.id}`}>View Profile</Link>
                            </Button>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Button size="lg" className="w-full">
                           <Phone className="mr-2 h-5 w-5"/> Call Agent
                        </Button>
                        <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90">
                           <Link href="/messages">
                               <MessageSquare className="mr-2 h-5 w-5"/> Message Agent
                           </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
