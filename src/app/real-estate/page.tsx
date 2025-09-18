
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Bed, Bath, Car, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getProperties } from "@/lib/firestore";

const formatPrice = (price: number, type: string) => {
    return `${new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)} ${type === 'Rent' ? '/ mo' : ''}`;
}

export default async function RealEstatePage() {
  const properties = await getProperties();

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
              <Input
                id="search-location"
                placeholder="e.g., Nairobi, Kilimani, etc."
                className="pl-10"
              />
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
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </Card>
      
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((prop) => (
            <Card
              key={prop.id}
              className="flex flex-col md:flex-row overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl"
            >
              <div className="md:w-2/5 relative">
                <Image
                  src={prop.images?.[0]}
                  alt={prop.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                  data-ai-hint={prop.imageHint || "property image"}
                />
                <Badge
                  className="absolute top-2 right-2"
                  variant={prop.type === "Sale" ? "destructive" : "default"}
                >
                  {prop.type}
                </Badge>
              </div>
              <div className="md:w-3/5 flex flex-col">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary">
                    <Link href={`/real-estate/${prop.id}`}>{prop.title}</Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                     <MapPin className="w-4 h-4"/> {prop.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <p className="text-xl font-bold text-primary mb-4">
                      {formatPrice(prop.price, prop.type)}
                    </p>
                  <div className="flex items-center gap-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5" />
                      <span className="font-medium">{prop.amenities.beds}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5" />
                      <span className="font-medium">{prop.amenities.baths}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-5 h-5" />
                      <span className="font-medium">{prop.amenities.parking}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={`/real-estate/${prop.id}`}>View Details</Link>
                    </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-12">
            <Building className="mx-auto h-12 w-12 text-muted-foreground"/>
            <h3 className="mt-4 text-xl font-semibold">No Properties Found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your search filters to find your perfect home.</p>
        </Card>
      )}
    </div>
  );
}
