import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Utensils, PlusCircle, ArrowLeft } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const mockRestaurantsData: any = {
    resto1: { 
        id: 'resto1', 
        name: "Mama's Kitchen", 
        cuisine: 'Kenyan', 
        rating: 4.5, 
        imageUrl: placeholderImages.food1.imageUrl,
        imageHint: placeholderImages.food1.imageHint,
        menu: [
            { id: 'm1-1', name: 'Nyama Choma (1/2 Kg)', description: 'Grilled goat meat served with kachumbari.', price: 800 },
            { id: 'm1-2', name: 'Ugali and Sukuma Wiki', description: 'A staple Kenyan meal.', price: 350 },
            { id: 'm1-3', name: 'Chapati (2 pcs)', description: 'Soft, layered flatbread.', price: 100 },
            { id: 'm1-4', name: 'Mukimo', description: 'Mashed potatoes, maize, beans, and greens.', price: 400 },
        ]
    },
    resto2: {
        id: 'resto2', 
        name: "Pizza Inn", 
        cuisine: 'Pizza', 
        rating: 4.2,
        imageUrl: placeholderImages.food2.imageUrl,
        imageHint: placeholderImages.food2.imageHint,
        menu: [
            { id: 'm2-1', name: 'Medium BBQ Steak Pizza', description: 'Classic BBQ steak pizza with all the toppings.', price: 1200 },
            { id: 'm2-2', name: 'Large Chicken Tikka Pizza', description: 'Spicy chicken tikka on a delicious crust.', price: 1500 },
            { id: 'm2-3', name: 'Garlic Bread', description: 'Toasted bread with garlic butter.', price: 300 },
            { id: 'm2-4', name: '2L Soda', description: 'Your choice of Coca-cola, Fanta, or Sprite.', price: 250 },
        ]
    },
    resto3: { 
        id: 'resto3', 
        name: "Shanghai Kitchen", 
        cuisine: 'Chinese', 
        rating: 4.8,
        imageUrl: placeholderImages.food3.imageUrl,
        imageHint: placeholderImages.food3.imageHint,
        menu: [
            { id: 'm3-1', name: 'Sweet & Sour Pork', description: 'Crispy pork in a sweet and sour sauce.', price: 950 },
            { id: 'm3-2', name: 'Egg Fried Rice', description: 'A classic side dish.', price: 500 },
            { id: 'm3-3', name: 'Chicken Cashew Nuts', description: 'Stir-fried chicken with crunchy cashews.', price: 1100 },
            { id: 'm3-4', name: 'Vegetable Spring Rolls (3 pcs)', description: 'Crispy rolls filled with fresh vegetables.', price: 450 },
        ]
    },
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
}

export default function RestaurantMenuPage({ params }: { params: { id: string } }) {
  const restaurant = mockRestaurantsData[params.id];

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