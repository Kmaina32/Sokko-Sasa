
"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ShoppingCart, Loader2, Bookmark, BookmarkCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Listing } from "@/lib/types";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";
import { addToCart, addToWishlist, removeFromWishlist, getWishlistItems } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      const unsubscribe = getWishlistItems(user.uid, (itemIds) => {
        setIsSaved(itemIds.has(listing.id));
      });
      return () => unsubscribe();
    } else {
      setIsSaved(false);
    }
  }, [user, listing.id]);

  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const handleAddToCart = async () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Please log in",
            description: "You need to be logged in to add items to your cart.",
        });
        return;
    }
    
    setIsAddingToCart(true);
    try {
        await addToCart(user.uid, listing.id);
        toast({
            title: "Added to Cart!",
            description: `${listing.title} has been added to your cart.`,
        });
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not add item to cart. Please try again.",
        });
        console.error("Error adding to cart: ", error);
    } finally {
        setIsAddingToCart(false);
    }
  }

  const handleSaveToggle = async () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Please log in",
            description: "You need to be logged in to save items.",
        });
        return;
    }
    
    setIsSaving(true);
    try {
        if (isSaved) {
            await removeFromWishlist(user.uid, listing.id);
            toast({
                title: "Removed from Wishlist",
                description: `${listing.title} has been removed from your wishlist.`,
            });
        } else {
            await addToWishlist(user.uid, listing.id);
            toast({
                title: "Added to Wishlist!",
                description: `${listing.title} has been added to your wishlist.`,
            });
        }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not update wishlist. Please try again.",
        });
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 group">
      <div className="relative">
        <Link href={`/listings/${listing.id}`} className="group/link block">
          <CardHeader className="p-0 relative">
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              width={600}
              height={400}
              className="aspect-[3/2] w-full object-cover"
              data-ai-hint={listing.imageHint}
            />
            <Badge variant={listing.category === 'Job' || listing.category === 'Service' ? 'secondary' : 'default'} className="absolute top-2 left-2">{listing.category}</Badge>
          </CardHeader>
        </Link>
        <Button variant="ghost" size="icon" className="absolute top-1 right-1 bg-background/70 hover:bg-background/90 h-8 w-8 rounded-full" onClick={handleSaveToggle} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : isSaved ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <Bookmark className="h-5 w-5" />}
            <span className="sr-only">Save to wishlist</span>
        </Button>
      </div>

      <Link href={`/listings/${listing.id}`} className="group/link flex flex-col flex-1">
        <CardContent className="flex-1 p-4">
          <CardTitle className="mb-2 text-lg font-bold leading-tight tracking-tight group-hover/link:text-primary">
            {listing.title}
          </CardTitle>
          <CardDescription className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1.5 h-4 w-4" />
            {listing.location}
          </CardDescription>
        </CardContent>
      
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-xl font-headline font-extrabold text-primary">
            {formatPrice(listing.price)}
          </p>
          {listing.category === 'Product' && (
              <Button variant="outline" size="icon" onClick={handleAddToCart} disabled={isAddingToCart}>
                  {isAddingToCart ? (
                      <Loader2 className="h-5 w-5 animate-spin"/>
                  ) : (
                      <ShoppingCart className="h-5 w-5"/>
                  )}
                  <span className="sr-only">Add to Cart</span>
              </Button>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
}
