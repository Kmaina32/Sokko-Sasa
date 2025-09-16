import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Phone, MessageSquare, Wrench } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockProviderData: any = {
    'srv1': {
        id: 'srv1',
        name: 'Quick Plumbers',
        service: 'Plumbing',
        rating: 4.8,
        reviews: 125,
        location: 'Nairobi & Environs',
        imageUrl: placeholderImages.service1.imageUrl,
        imageHint: placeholderImages.service1.imageHint,
        bio: "With over 10 years of experience, Quick Plumbers offers reliable and professional plumbing services across Nairobi. We handle everything from leaky faucets to complete system installations. Our team is available 24/7 for emergency services.",
        services: [
            "Emergency Leak Repairs",
            "Drain Unclogging",
            "Water Heater Installation",
            "Bathroom & Kitchen Plumbing",
            "New Installations"
        ]
    }
};

export default function ServiceProviderProfilePage({ params }: { params: { id: string } }) {
  const provider = mockProviderData[params.id];

  if (!provider) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="text-center p-12">
                <Wrench className="mx-auto h-12 w-12 text-muted-foreground" />
                <CardTitle className="text-2xl mt-4">Provider Not Found</CardTitle>
                <CardContent>
                    <p className="mt-4 text-muted-foreground">Sorry, we couldn't find the service provider you're looking for.</p>
                    <Button asChild className="mt-6">
                        <Link href="/services">Back to Services</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="bg-muted/20">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card className="sticky top-24 text-center">
                        <CardContent className="p-6">
                            <Image
                                src={provider.imageUrl}
                                alt={provider.name}
                                width={128}
                                height={128}
                                data-ai-hint={provider.imageHint}
                                className="rounded-full mx-auto mb-4 border-4 border-primary"
                            />
                            <h1 className="font-headline text-3xl font-bold">{provider.name}</h1>
                            <p className="text-muted-foreground text-lg">{provider.service}</p>
                            <div className="flex justify-center items-center gap-2 mt-2">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
                                <span className="font-bold text-lg">{provider.rating}</span>
                                <span className="text-muted-foreground">({provider.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{provider.location}</span>
                            </div>
                        </CardContent>
                        <Separator />
                        <CardContent className="p-6 space-y-2">
                             <Button size="lg" className="w-full">
                               <Phone className="mr-2 h-5 w-5"/> Call Now
                            </Button>
                            <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90">
                               <Link href="/messages">
                                   <MessageSquare className="mr-2 h-5 w-5"/> Send Message
                               </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                     <Card>
                        <CardHeader>
                            <CardTitle>About {provider.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/80">{provider.bio}</p>
                        </CardContent>
                    </Card>
                     <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Services Offered</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {provider.services.map((service: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-base py-1 px-3">{service}</Badge>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}
