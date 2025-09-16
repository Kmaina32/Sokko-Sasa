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
import { Star, Search } from "lucide-react";

const mockRestaurants = [
  { id: "1", name: "Java House", cuisine: "Cafe, Kenyan", rating: 4.5, imageUrl: "https://picsum.photos/seed/resto1/600/400", imageHint: "modern cafe interior" },
  { id: "2", name: "Artcaffe", cuisine: "Bakery, Continental", rating: 4.6, imageUrl: "https://picsum.photos/seed/resto2/600/400", imageHint: "artisan bakery display" },
  { id: "3", name: "Mama Oliech's", cuisine: "Fish, African", rating: 4.8, imageUrl: "https://picsum.photos/seed/resto3/600/400", imageHint: "grilled fish dish" },
  { id: "4", name: "The Talisman", cuisine: "Fusion, Fine Dining", rating: 4.7, imageUrl: "https://picsum.photos/seed/resto4/600/400", imageHint: "elegant restaurant garden" },
  { id: "5", name: "Nyama Mama", cuisine: "Kenyan, Grill", rating: 4.4, imageUrl: "https://picsum.photos/seed/resto5/600/400", imageHint: "modern african restaurant" },
  { id: "6", name: "About Thyme", cuisine: "International", rating: 4.6, imageUrl: "https://picsum.photos/seed/resto6/600/400", imageHint: "cozy restaurant patio" },
];

export default function FoodDeliveryPage() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRestaurants.map((resto) => (
            <Card key={resto.id} className="group overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
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
          ))}
        </div>
      </div>
    </div>
  );
}
