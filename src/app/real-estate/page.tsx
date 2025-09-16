import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Bed, Bath, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockProperties = [
  { id: "1", title: "Modern Apartment in Kilimani", price: "85,000", type: "Rent", beds: 2, baths: 2, parking: 1, imageUrl: "https://picsum.photos/seed/prop1/600/400", imageHint: "modern apartment living room" },
  { id: "2", title: "Spacious Villa in Karen", price: "45,000,000", type: "Sale", beds: 5, baths: 5, parking: 4, imageUrl: "https://picsum.photos/seed/prop2/600/400", imageHint: "luxury villa exterior" },
  { id: "3", title: "Cozy Bungalow in Lavington", price: "25,000,000", type: "Sale", beds: 3, baths: 2, parking: 2, imageUrl: "https://picsum.photos/seed/prop3/600/400", imageHint: "cozy bungalow garden" },
  { id: "4", title: "Studio Apartment, Westlands", price: "50,000", type: "Rent", beds: 1, baths: 1, parking: 1, imageUrl: "https://picsum.photos/seed/prop4/600/400", imageHint: "studio apartment interior" },
];

export default function RealEstatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Find Your Next Home</h1>
        <p className="text-muted-foreground">
          Browse properties for sale and rent across Kenya.
        </p>
      </div>

      <Card className="mb-8 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <Label htmlFor="search-location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="search-location" placeholder="e.g., Nairobi, Kilimani, etc." className="pl-10"/>
            </div>
          </div>
          <div>
            <Label htmlFor="property-type">Type</Label>
            <Select defaultValue="all">
              <SelectTrigger id="property-type">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="lg" className="h-10">
            <Search className="mr-2 h-4 w-4"/> Search
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {mockProperties.map((prop) => (
            <Card key={prop.id} className="flex flex-col md:flex-row overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl">
                <div className="md:w-2/5 relative">
                     <Image
                        src={prop.imageUrl}
                        alt={prop.title}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover"
                        data-ai-hint={prop.imageHint}
                    />
                    <Badge className="absolute top-2 right-2" variant={prop.type === 'Sale' ? 'destructive' : 'default'}>{prop.type}</Badge>
                </div>
                <div className="md:w-3/5 flex flex-col">
                    <CardHeader>
                        <CardTitle className="group-hover:text-primary">{prop.title}</CardTitle>
                        <CardDescription>
                            <p className="text-xl font-bold text-primary mt-1">KSh {prop.price} {prop.type === 'Rent' && '/ mo'}</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="flex items-center gap-6 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Bed className="w-5 h-5"/>
                                <span className="font-medium">{prop.beds}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bath className="w-5 h-5"/>
                                <span className="font-medium">{prop.baths}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5"/>
                                <span className="font-medium">{prop.parking}</span>
                            </div>
                        </div>
                    </CardContent>
                     <CardFooter>
                        <Button className="w-full">View Details</Button>
                    </CardFooter>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
}
