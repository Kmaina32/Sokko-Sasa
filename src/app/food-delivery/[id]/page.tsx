
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Utensils, PlusCircle, ArrowLeft, MinusCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { getRestaurantById, addToCart, removeFromCart, getListingById, updateCartItemQuantity } from "@/lib/firestore";
import { Separator } from '@/components/ui/separator';
import type { Restaurant as RestaurantType, MenuItem, Listing } from '@/lib/types';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';


const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
}

interface CartItem extends Listing {
    quantity: number;
}


export default function RestaurantMenuPage({ params }: { params: { id: string } }) {
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = params;
  const { user } = useAuth();
  const { toast } = useToast();
  const { cartItems } = useCart();
  
  useEffect(() => {
    const fetchRestaurant = async () => {
        const data = await getRestaurantById(id);
        setRestaurant(data);
        setLoading(false);
    }
    fetchRestaurant();
  }, [id]);


  const handleQuantityChange = async (item: MenuItem, change: number) => {
    if (!user) {
        toast({ variant: 'destructive', title: "Please log in to add items."});
        return;
    }
    // We treat each menu item as a unique "listing" for cart purposes
    const listingId = `${id}-${item.name.replace(/\s+/g, '-')}`; 
    const quantity = (cartItems.find(ci => ci.id === listingId)?.quantity || 0) + change;

    await updateCartItemQuantity(user.uid, listingId, quantity, {
        title: item.name,
        price: item.price,
        category: 'Product', // Representing food as a product
        imageUrl: restaurant?.imageUrl || '',
        location: restaurant?.location || '',
    });
  }

  const getCartItemQuantity = (itemName: string) => {
    const listingId = `${id}-${itemName.replace(/\s+/g, '-')}`;
    return cartItems.find(item => item.id === listingId)?.quantity || 0;
  }

  const subtotal = cartItems
    .filter(item => item.id.startsWith(id)) // Only include items from this restaurant
    .reduce((acc, item) => acc + item.price * item.quantity, 0);


  if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
  }

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

        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Menu</h2>
                <div className="divide-y divide-border rounded-lg border">
                    {restaurant.menu.map((item: any, index: number) => {
                        const quantityInCart = getCartItemQuantity(item.name);
                        const listingId = `${id}-${item.name.replace(/\s+/g, '-')}`;
                        return (
                            <div key={listingId} className="grid grid-cols-[1fr_auto] items-center p-4 gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                    <p className="font-bold text-primary mt-1">{formatCurrency(item.price)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {quantityInCart > 0 && (
                                        <>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item, -1)}>
                                                <MinusCircle className="h-4 w-4" />
                                            </Button>
                                            <span className="font-bold text-lg w-4 text-center">{quantityInCart}</span>
                                        </>
                                    )}
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item, 1)}>
                                        <PlusCircle className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="lg:col-span-1">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Your Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {subtotal > 0 ? (
                           <div className="space-y-4">
                               {cartItems.filter(item => item.id.startsWith(id)).map(item => (
                                   <div key={item.id} className="flex justify-between items-center">
                                       <div>
                                           <p className="font-semibold">{item.quantity} x {item.title}</p>
                                       </div>
                                       <p>{formatCurrency(item.price * item.quantity)}</p>
                                   </div>
                               ))}
                               <Separator/>
                               <div className="flex justify-between font-bold text-lg">
                                   <p>Subtotal</p>
                                   <p>{formatCurrency(subtotal)}</p>
                               </div>
                           </div>
                       ) : (
                           <p className="text-muted-foreground text-center">Your cart is empty. Add items from the menu to get started.</p>
                       )}
                    </CardContent>
                    {subtotal > 0 && (
                        <CardFooter>
                            <Button className="w-full" size="lg" asChild>
                                <Link href="/cart">Go to Cart</Link>
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
    </div>
  );
}
