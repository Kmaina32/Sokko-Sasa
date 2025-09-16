import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Utensils } from "lucide-react";
import Link from "next/link";
import { getRestaurants } from "@/lib/firestore";


export default async function FoodDeliveryPage() {
  const restaurants = await getRestaurants();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold">Sokko Food</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your favorite meals, delivered fast.
        </p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search restaurants or cuisine..." className="pl-12 text-base h-12 rounded-full shadow-sm" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Popular Restaurants</h2>
        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((resto) => (
              <Link href={`/food-delivery/${resto.id}`} key={resto.id}>
                <Card className="group overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-full">
                    <CardHeader className="p-0">
                        <Image
                            src={resto.imageUrl}
                            alt={resto.name}
                            width={600}
                            height={400}
                            className="aspect-video w-full object-cover"
                            data-ai-hint={resto.imageHint}
                        />
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-xl group-hover:text-primary">{resto.name}</CardTitle>
                        <CardDescription>{resto.cuisine}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <Badge variant="default" className="flex items-center gap-1 bg-accent hover:bg-accent/90">
                            <Star className="w-4 h-4 text-white fill-white"/>
                            <span className="text-white font-bold">{resto.rating}</span>
                        </Badge>
                    </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="text-center p-12">
            <Utensils className="mx-auto h-12 w-12 text-muted-foreground"/>
            <h3 className="mt-4 text-xl font-semibold">No Restaurants Found</h3>
            <p className="mt-2 text-muted-foreground">We couldn't find any restaurants. Please try a different search or check back later.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
