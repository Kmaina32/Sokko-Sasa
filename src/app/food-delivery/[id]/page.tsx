import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Utensils, PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getRestaurantById } from "@/lib/firestore";

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
}

export default async function RestaurantMenuPage({ params }: { params: { id: string } }) {
  const restaurant = await getRestaurantById(params.id);

  if (!restaurant) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="text-center p-12">
                <Utensils className="mx-auto h-12 w-12 text-muted-foreground"/>
                <CardTitle className="text-2xl mt-4">Restaurant Not Found</CardTitle>
                <CardContent>
                    <p className="mt-2 text-muted-foreground">Sorry, we couldn't find the restaurant you're looking for.</p>
                    <Button asChild className="mt-6">
                        <Link href="/food-delivery">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                            Back to Restaurants
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div>
        <div className="relative h-64 w-full">
            <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="object-cover"
                data-ai-hint={restaurant.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"/>
            <div className="absolute bottom-0 left-0 p-8 text-white">
                <h1 className="font-headline text-5xl font-bold">{restaurant.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">{restaurant.cuisine}</Badge>
                    <div className="flex items-center gap-1 text-white">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
                        <span className="font-bold">{restaurant.rating}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Menu</h2>
             <div className="divide-y divide-border rounded-lg border">
                {restaurant.menu.map((item: any, index: number) => (
                    <div key={item.id} className="grid grid-cols-[1fr_auto] items-center p-4 gap-4">
                        <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                            <p className="font-bold text-primary mt-1">{formatCurrency(item.price)}</p>
                        </div>
                        <div>
                            <Button variant="outline">
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
